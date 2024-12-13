'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfWeek, endOfWeek, addDays, addWeeks, addMonths, addYears } from 'date-fns'
import { Header } from '@src/components/auth/Header'
import { CalendarView } from '@src/components/core/CalendarView'
import { ChartView } from '@src/components/core/ChartView'
import { useTasks } from '@src/hooks/useTasks'
import { TaskList } from '@src/components/core/TaskList'
import { TabContent } from '@src/components/core/TabContent'
import { Task, Routine } from '@src/lib/types'
import { supabase } from '@src/lib/supabase'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useAuth } from '@src/hooks/useAuth'
import { RecurrenceRuleDialog } from './RecurrenceRuleDialog'

const calculateChartDateRangeForPeriod = (currentDate: Date, period: 'day' | 'week' | 'month' | 'year', offset: number) => {
  let start: Date
  let end: Date

  if (period === 'day') {
    const targetDate = addDays(currentDate, offset)
    start = new Date(targetDate.setHours(0, 0, 0, 0))
    end = new Date(targetDate.setHours(23, 59, 59, 999))
  } else if (period === 'week') {
    const currentWeekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
    const adjustedWeekStart = addWeeks(currentWeekStart, offset)
    start = adjustedWeekStart
    end = endOfWeek(adjustedWeekStart, { weekStartsOn: 0 })
  } else if (period === 'month') {
    const currentMonthStart = startOfMonth(currentDate)
    const adjustedMonthStart = addMonths(currentMonthStart, offset)
    start = startOfWeek(adjustedMonthStart, { weekStartsOn: 0 })
    end = endOfWeek(endOfMonth(adjustedMonthStart), { weekStartsOn: 0 })
  } else if (period === 'year') {
    const currentYearStart = startOfYear(currentDate)
    const adjustedYearStart = addYears(currentYearStart, offset)
    start = startOfMonth(adjustedYearStart)
    end = endOfYear(adjustedYearStart)
  } else {
    start = startOfWeek(currentDate, { weekStartsOn: 0 })
    end = endOfWeek(start, { weekStartsOn: 0 })
  }

  return { start, end }
}

export function TaskManagementApp() {
  const { user } = useAuth()
  const userId = user?.id

  const [activeTab, setActiveTab] = useState("calendar")
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [showUnplannedTasks, setShowUnplannedTasks] = useState(false)
  const [labels, setLabels] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [schedulingTask, setSchedulingTask] = useState<(Task & { mode?: 'schedule' | 'copy' }) | null>(null)
  const [aggregationPeriod, setAggregationPeriod] = useState< 'day' | 'week' | 'month' | 'year' >('week')
  const [navigationOffset, setNavigationOffset] = useState<number>(0)
  const [showRecurrenceDialog, setShowRecurrenceDialog] = useState(false);
  const [editingTaskRoutine, setEditingTaskRoutine] = useState<Task | null>(null);

  const [allowSelectDate, setAllowSelectDate] = useState<boolean>(false);

  let startDate: Date
  let endDate: Date

  const { tasks, setTasks, fetchTasks } = useTasks()

  let viewTasks: Task[] = []
  switch (activeTab) {
    case "calendar":
      startDate = startOfMonth(selectedDate)
      endDate = endOfMonth(selectedDate)
      viewTasks = tasks
      break
    case "chart":
      const { start: chartStart, end: chartEnd } = calculateChartDateRangeForPeriod(selectedDate, aggregationPeriod, navigationOffset);
      startDate = chartStart;
      endDate = chartEnd;
      viewTasks = tasks
      break
    default:
      startDate = startOfMonth(selectedDate)
      endDate = endOfMonth(selectedDate)
      viewTasks = tasks
  }

  useEffect(() => {
    if (activeTab === "calendar") {
      setAllowSelectDate(true);
    } else {
      setAllowSelectDate(false);
    }
  }, [activeTab]);

  const plannedTasks = showUnplannedTasks
    ? viewTasks.filter(task => !task.scheduledDate && task.status === "planned")
    : viewTasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd') && task.status === "planned");

  const executedPlannedTasks = showUnplannedTasks
    ? viewTasks.filter(task => !task.scheduledDate && task.status === "executed")
    : viewTasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd') && task.status === "executed");

  const unplannedTasks = viewTasks.filter(task => !task.scheduledDate && task.status === "planned")
  const executedUnplannedTasks = viewTasks.filter(task => !task.scheduledDate && task.status !== "planned")

  const setTaskToScheduleHandler = (task: Task & { mode?: 'schedule' | 'copy' } | null) => {
    if (!task) {
      setTasks(prevTasks =>
        prevTasks.map(t => ({
          ...t,
          mode: undefined
        }))
      );
      setSchedulingTask(null);
      return;
    }

    if (task.routine) {
      toast.error('Recurring tasks cannot be scheduled directly.');
      return;
    }

    const mode = task.status === 'executed' ? 'copy' : (task.mode || 'schedule');
    const taskWithMode = { ...task, mode };

    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id
          ? { ...t, mode }
          : { ...t, mode: undefined }
      )
    );

    setSchedulingTask(taskWithMode);
    
    const modeMessage = mode === 'copy' 
      ? `Copy mode activated for: "${task.title}"`
      : `Scheduling mode activated for: "${task.title}"`;
    toast.info(modeMessage);
  };

  const handleDateClick = (date: Date) => {
    if (schedulingTask) {
      if (schedulingTask.mode === 'copy') {
        const newTask: Task = {
          ...schedulingTask,
          id: '',
          scheduledDate: format(date, 'yyyy-MM-dd'),
          mode: undefined,
          status: 'planned'
        };
        console.log('Creating new task with status:', newTask.status);
        addTask(newTask);
      } else {
        assignTaskToDate(schedulingTask.id, date);
      }
      setSchedulingTask(null);
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === schedulingTask.id
            ? { ...t, mode: undefined }
            : t
        )
      );
    } else {
      setSelectedDate(date);
      setShowUnplannedTasks(false);
    }
  }

  const handleUnplannedClick = () => {
    setShowUnplannedTasks(true)
    setSelectedDate(new Date())
  }

  const addTask = async (taskData: {
    title: string;
    memo?: string;
    starred?: boolean;
    scheduledDate?: string | null;
    label?: string;
    routine?: Routine | null;
  }) => {
    if (!userId) {
      toast.error('User not authenticated.');
      return;
    }

    try {

      const dbTaskData = {
        title: taskData.title,
        memo: taskData.memo,
        status: 'planned',
        starred: taskData.starred,
        scheduled_date: taskData.scheduledDate,
        label: taskData.label === 'none' ? null : taskData.label,
        routine: taskData.routine,
        user_id: userId
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert(dbTaskData)
        .select('*')
        .single();

      if (error) throw error;

      const newTask: Task = {
        id: data.id.toString(),
        title: data.title,
        memo: data.memo || '',
        status: 'planned',
        starred: data.starred || false,
        scheduledDate: data.scheduled_date || null,
        label: data.label || null,
        routine: data.routine || null,
        originalId: undefined,
        exceptions: {}
      };

      setTasks(prevTasks => [newTask, ...prevTasks]);
      toast.success('Task added successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to add task: ${error.message}`);
      }
    }
  };

  const toggleTaskStatus = async (taskId: string, occurrenceDate?: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) throw new Error('Task not found');

      const updatedStatus = task.status === 'executed' ? 'planned' : 'executed';

      if (task.routine && task.originalId && occurrenceDate) {
        const newExceptions = {
          ...task.exceptions,
          [occurrenceDate]: {
            ...task.exceptions?.[occurrenceDate],
            status: updatedStatus as 'executed' | 'planned' | 'deleted'
          }
        };

        const { error } = await supabase
          .from('tasks')
          .update({ exceptions: newExceptions })
          .eq('id', task.originalId)
          .eq('user_id', userId)

        if (error) throw error;
        setTasks(prevTasks =>
          prevTasks.map(t => {
            if (t.originalId === task.originalId) {
              const updatedTask = { ...t };
              if (t.occurrenceDate === occurrenceDate) {
                updatedTask.status = updatedStatus;
              }
              updatedTask.exceptions = newExceptions;
              return updatedTask;
            }
            return t;
          })
        );
      } else {
        const { error } = await supabase
          .from('tasks')
          .update({ status: updatedStatus })
          .eq('id', taskId)
          .eq('user_id', userId)

        if (error) throw error;

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.id === taskId ? { ...t, status: updatedStatus } : t
          )
        );
      }
      
      toast.success('Task status updated');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status.');
    }
  };

  const toggleTaskStar = async (taskId: string, occurrenceDate?: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) throw new Error('Task not found');

      const updatedStar = !task.starred;

      if (task.routine && task.originalId && occurrenceDate) {
        const newExceptions = {
          ...task.exceptions,
          [occurrenceDate]: {
            ...task.exceptions?.[occurrenceDate],
            starred: updatedStar
          }
        };

        const { error } = await supabase
          .from('tasks')
          .update({ exceptions: newExceptions })
          .eq('id', task.originalId)
          .eq('user_id', userId)

        if (error) throw error;

        setTasks(prevTasks =>
          prevTasks.map(t => {
            if (t.originalId === task.originalId) {
              const updatedTask = { ...t };
              if (t.occurrenceDate === occurrenceDate) {
                updatedTask.starred = updatedStar;
              }
              updatedTask.exceptions = newExceptions;
              return updatedTask;
            }
            return t;
          })
        );
      } else {
        const { error } = await supabase
          .from('tasks')
          .update({ starred: updatedStar })
          .eq('id', taskId)
          .eq('user_id', userId)

        if (error) throw error;

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.id === taskId ? { ...t, starred: updatedStar } : t
          )
        );
      }
      
      toast.success('Task star updated');
    } catch (error) {
      console.error('Failed to update star:', error);
      toast.error('Failed to update star.');
    }
  };

  const addLabel = async (newLabel: string, taskId?: string) => {
    console.log("addLabel called with:", newLabel);
    if (!userId) {
      console.warn('User ID not found.');
      toast.error('User not authenticated.');
      return;
    }

    try {
      const { error } = await supabase
        .from('labels')
        .insert({ name: newLabel, user_id: userId })

      if (error) throw error;

      setLabels(prevLabels => [...prevLabels, newLabel]);

      if (taskId) {
        await updateTaskLabel(taskId, newLabel);
      }

      toast.success('Label added successfully');
    } catch (error) {
      console.error('Failed to add label:', error);
      toast.error('Failed to add label');
    }
  };

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const { data, error } = await supabase
          .from('labels')
          .select('name')
          .order('name', { ascending: true })
          .throwOnError();

        if (error) throw error;

        const uniqueLabels = [...new Set(data.map(label => label.name))];
        setLabels(uniqueLabels);
      } catch (error) {
        console.error('Failed to fetch labels:', error);
        toast.error('Failed to fetch labels');
      }
    };

    fetchLabels();
  }, []);

  const deleteTask = async (taskId: string, deleteType?: 'single' | 'all' | 'future') => {
    if (!userId) {
      toast.error('User not authenticated.');
      return;
    }

    try {
      const taskToDelete = tasks.find(t => t.id === taskId);
      if (!taskToDelete) throw new Error('Task not found');

      if (taskToDelete.routine) {
        const originalId = taskToDelete.originalId;
        const currentDate = taskToDelete.scheduledDate;
        let newExceptions = taskToDelete.exceptions || {};

        switch (deleteType) {
          case 'all':
            const { error: deleteError } = await supabase
              .from('tasks')
              .delete()
              .eq('id', originalId)
              .eq('user_id', userId);

            if (deleteError) throw deleteError;

            setTasks(prevTasks => 
              prevTasks.filter(t => t.originalId !== originalId && t.id !== originalId)
            );
            break;

          case 'future':
            if (!currentDate) throw new Error('Scheduled date is required');
            const { error: updateError } = await supabase
              .from('tasks')
              .update({
                routine: {
                  ...taskToDelete.routine,
                  ends: {
                    type: 'on',
                    value: currentDate
                  }
                }
              })
              .eq('id', originalId)
              .eq('user_id', userId);

            if (updateError) throw updateError;

            newExceptions = Object.keys(taskToDelete.exceptions || {})
              .filter(date => date >= currentDate)
              .reduce((acc, date) => ({
                ...acc,
                [date]: {
                  ...taskToDelete.exceptions![date],
                  status: 'deleted'
                }
              }), taskToDelete.exceptions || {});

            fetchTasks(startDate, endDate);
            break;

          case 'single':
            if (!currentDate) throw new Error('Scheduled date is required');
            newExceptions = {
              ...taskToDelete.exceptions || {},
              [currentDate]: {
                ...taskToDelete.exceptions?.[currentDate],
                status: 'deleted'
              }
            };

            const { error } = await supabase
              .from('tasks')
              .update({ exceptions: newExceptions })
              .eq('id', originalId)
              .eq('user_id', userId);

            if (error) throw error;

            setTasks(prevTasks =>
              prevTasks.map(t =>
                t.originalId === originalId
                  ? { ...t, exceptions: newExceptions }
                  : t
              ).filter(t => t.id !== taskId)
            );
            break;
        }
      } else {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', taskId)
          .eq('user_id', userId);

        if (error) throw error;

        setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      }

      toast.success('Task deleted successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to delete task:', error);
        toast.error(`Failed to delete task: ${error.message}`);
      }
    }
  };

  const toggleExecutedTasks = () => {
    setShowExecutedTasks(prev => !prev)
  }

  const assignTaskToDate = async (taskId: string, date: Date) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ scheduled_date: format(date, 'yyyy-MM-dd') })
        .eq('id', taskId)
        .eq('user_id', userId)

      if (error) throw error

      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? { ...t, scheduledDate: format(date, 'yyyy-MM-dd') } : t)
      )
      toast.success('Task scheduled successfully')
    } catch (error) {
      console.error('Failed to schedule task:', error)
      toast.error('Failed to schedule task.')
    }
  }

  const unassignTaskFromDate = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ scheduled_date: null })
        .eq('id', taskId)
        .eq('user_id', userId)

      if (error) {
        console.error('Failed to unassign task from date:', error)
        toast.error('Failed to unassign task from date.')
        return
      }

      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? { ...t, scheduledDate: null } : t)
      )
      toast.success('Task scheduled date removed.')
    } catch (error) {
      console.error('Failed to unassign task from date:', error)
      toast.error('Failed to unassign task from date.')
    }
  }

  const deleteLabel = async (labelToDelete: string) => {
    try {
      const { error } = await supabase
        .from('labels')
        .delete()
        .eq('name', labelToDelete)
        .eq('user_id', userId)

      if (error) throw error;

      setLabels(prevLabels => prevLabels.filter(label => label !== labelToDelete));
      toast.success('Label deleted successfully');
    } catch (error) {
      console.error('Failed to delete label:', error);
      toast.error('Failed to delete label');
    }
  };

  const updateTaskLabel = async (taskId: string, newLabel: string) => {
    if (!userId) {
      toast.error('Authentication is required.')
      return
    }

    try {
      const targetTask = tasks.find(t => t.id === taskId)
      if (!targetTask) throw new Error('Task not found')

      const updateId = targetTask.originalId || taskId

      const { error } = await supabase
        .from('tasks')
        .update({ label: newLabel === 'none' ? null : newLabel })
        .eq('id', updateId)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error

      if (targetTask.routine) {
        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.originalId === targetTask.originalId
              ? { ...t, label: newLabel === 'none' ? null : newLabel } as Task
              : t
          )
        )
      } else {
        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.id === taskId
              ? { ...t, label: newLabel === 'none' ? null : newLabel } as Task
              : t
          )
        )
      }
      
      toast.success('Label updated successfully')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to update label:', error)
        toast.error(`Failed to update label: ${error.message}`)
      }
    }
  }

  const updateTaskTitleHandler = async (taskId: string, newTitle: string, updateType?: 'global' | 'single') => {
    if (!userId) {
      toast.error('Authentication is required.')
      return
    }

    try {
      const targetTask = tasks.find(t => t.id === taskId)
      if (!targetTask) throw new Error('Task not found')

      const updateId = targetTask.originalId || taskId

      const finalUpdateType = updateType || 'single';
      
      if (finalUpdateType === 'global') {
        const { error: updateError } = await supabase
          .from('tasks')
          .update({ title: newTitle })
          .eq('id', updateId)
          .eq('user_id', userId)
        
        if (updateError) {
          throw updateError
        }

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.originalId === targetTask.originalId
              ? { ...t, title: newTitle }
              : t
          )
        )
      } else {
        const { error: updateError } = await supabase
          .from('tasks')
          .update({ title: newTitle })
          .eq('id', taskId)
          .eq('user_id', userId)
        
        if (updateError) {
          throw updateError
        }

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.id === taskId ? { ...t, title: newTitle } : t
          )
        )
      }

      toast.success('Task title updated successfully')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to update task title:', error)
        toast.error(`Failed to update task title: ${error.message}`)
      }
    }
  }

  useEffect(() => {
    let startDate: Date
    let endDate: Date

    switch (activeTab) {
      case "calendar":
        startDate = startOfMonth(selectedDate)
        endDate = endOfMonth(selectedDate)
        break
      case "chart":
        const { start, end } = calculateChartDateRangeForPeriod(
          new Date(),
          aggregationPeriod,
          navigationOffset
        )
        startDate = start
        endDate = end
        break
      default:
        startDate = startOfMonth(selectedDate)
        endDate = endOfMonth(selectedDate)
    }

    fetchTasks(startDate, endDate)
  }, [activeTab, selectedDate, aggregationPeriod, navigationOffset, fetchTasks])

  const handleRecurrenceSubmit = async (routine: Routine) => {
    if (!editingTaskRoutine || !userId) {
      toast.error('Failed to update recurring task.');
      return;
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          routine: routine,
          exceptions: {}
        })
        .eq('id', editingTaskRoutine.originalId || editingTaskRoutine.id)
        .eq('user_id', userId)
        .select();

      if (error) throw error;

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.originalId === editingTaskRoutine.originalId
            ? { ...t, routine: routine, exceptions: {} }
            : t
        )
      );

      toast.success('Recurring task updated successfully');

      fetchTasks(startOfMonth(selectedDate), endOfMonth(selectedDate));
    } catch (error) {
      console.error('Failed to update recurring task:', error);
      toast.error('Failed to update recurring task');
    }

    setShowRecurrenceDialog(false);
    setEditingTaskRoutine(null);
  };

  const handleRecurrenceEdit = (task: Task) => {
    setEditingTaskRoutine(task);
    setShowRecurrenceDialog(true);
  };

  const editLabel = async (oldLabel: string, newLabel: string) => {
    if (!userId) {
      toast.error('Authentication is required.');
      return;
    }

    try {
      const { error } = await supabase
        .from('labels')
        .update({ name: newLabel })
        .eq('name', oldLabel)
        .eq('user_id', userId);

      if (error) throw error;

      const { error: updateTasksError } = await supabase
        .from('tasks')
        .update({ label: newLabel })
        .eq('label', oldLabel)
        .eq('user_id', userId);

      if (updateTasksError) throw updateTasksError;

      setLabels(prevLabels => prevLabels.map(label => label === oldLabel ? newLabel : label));

      setTasks(prevTasks => prevTasks.map(task => 
        task.label === oldLabel ? { ...task, label: newLabel } : task
      ));

      toast.success('Label updated successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to update label:', error);
        toast.error(`Failed to update label: ${error.message}`);
      }
    }
  };

  const updateTaskMemoHandler = async (taskId: string, newMemo: string, occurrenceDate?: string) => {
    if (!userId) {
      toast.error('Authentication is required.');
      return;
    }

    try {
      const targetTask = tasks.find(t => t.id === taskId);
      if (!targetTask) throw new Error('Task not found');

      if (targetTask.routine && targetTask.originalId && occurrenceDate) {
        const newExceptions = {
          ...targetTask.exceptions,
          [occurrenceDate]: {
            ...targetTask.exceptions?.[occurrenceDate],
            memo: newMemo
          }
        };

        const { error: updateError } = await supabase
          .from('tasks')
          .update({ exceptions: newExceptions })
          .eq('id', targetTask.originalId)
          .eq('user_id', userId);

        if (updateError) throw updateError;

        setTasks(prevTasks =>
          prevTasks.map(t => {
            if (t.originalId === targetTask.originalId) {
              const updatedTask = { ...t };
              if (t.occurrenceDate === occurrenceDate) {
                updatedTask.memo = newMemo;
              }
              updatedTask.exceptions = newExceptions;
              return updatedTask;
            }
            return t;
          })
        );
      } else if (targetTask.routine) {
        const { error: updateError } = await supabase
          .from('tasks')
          .update({ memo: newMemo, exceptions: {} })
          .eq('id', targetTask.originalId)
          .eq('user_id', userId);

        if (updateError) throw updateError;

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.originalId === targetTask.originalId
              ? { ...t, memo: newMemo, exceptions: {} }
              : t
          )
        );
      } else {
        const { error: updateError } = await supabase
          .from('tasks')
          .update({ memo: newMemo })
          .eq('id', taskId)
          .eq('user_id', userId);

        if (updateError) throw updateError;

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.id === taskId ? { ...t, memo: newMemo } : t
          )
        );
      }

      toast.success('Task memo updated successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to update task memo:', error);
        toast.error(`Failed to update task memo: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <TabContent 
            title="Calendar View" 
            description="Plan tasks by date." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            editLabel={editLabel}
            showToggleButton={true}
            showExecutedTasks={showExecutedTasks}
            toggleExecutedTasks={toggleExecutedTasks}
            selectedDate={selectedDate}
            showUnplannedTasks={showUnplannedTasks}
            allowSelectDate={allowSelectDate}
            isToday={!showUnplannedTasks}
          >
            <CalendarView 
              selectedDate={selectedDate} 
              setSelectedDate={handleDateClick} 
              tasks={viewTasks} 
              addTask={addTask}
              addLabel={addLabel}
              labels={labels}
              assignTaskToDate={assignTaskToDate}
              unassignTaskFromDate={unassignTaskFromDate}
              onUnplannedClick={handleUnplannedClick}
              showUnplannedTasks={showUnplannedTasks}
            />
            {selectedDate && !showUnplannedTasks && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Tasks for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList 
                    tasks={plannedTasks}
                    toggleStatus={toggleTaskStatus}
                    toggleStar={toggleTaskStar}
                    onRecurrenceEdit={handleRecurrenceEdit}
                    deleteTask={deleteTask}
                    assignTaskToDate={assignTaskToDate}
                    unassignFromDate={unassignTaskFromDate}
                    setTaskToSchedule={setTaskToScheduleHandler}
                    showExecutedTasks={showExecutedTasks}
                    executedTasks={executedPlannedTasks}
                    labels={labels}
                    setLabels={setLabels}
                    updateTaskLabel={updateTaskLabel}
                    updateTaskTitle={updateTaskTitleHandler}
                    addLabel={addLabel}
                    deleteLabel={deleteLabel}
                    addTask={addTask}
                    isToday={!showUnplannedTasks}
                    selectedDate={selectedDate}
                    allowSelectDate={allowSelectDate}
                    updateTaskMemo={updateTaskMemoHandler}
                    showUnplannedTasks={showUnplannedTasks}
                  />
                </CardContent>
              </Card>
            )}
            {showUnplannedTasks && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Unplanned Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList 
                    tasks={unplannedTasks}
                    toggleStatus={toggleTaskStatus}
                    toggleStar={toggleTaskStar}
                    onRecurrenceEdit={handleRecurrenceEdit}
                    deleteTask={deleteTask}
                    assignTaskToDate={assignTaskToDate}
                    unassignFromDate={unassignTaskFromDate}
                    setTaskToSchedule={setTaskToScheduleHandler}
                    showExecutedTasks={showExecutedTasks}
                    executedTasks={executedUnplannedTasks}
                    labels={labels}
                    setLabels={setLabels}
                    updateTaskLabel={updateTaskLabel}
                    updateTaskTitle={updateTaskTitleHandler}
                    addLabel={addLabel}
                    deleteLabel={deleteLabel}
                    addTask={addTask}
                    isToday={!showUnplannedTasks}
                    selectedDate={selectedDate}
                    allowSelectDate={allowSelectDate}
                    updateTaskMemo={updateTaskMemoHandler}
                    showUnplannedTasks={showUnplannedTasks}
                  />
                </CardContent>
              </Card>
            )}
          </TabContent>
        </TabsContent>

        <TabsContent value="chart">
          <TabContent 
            title="Chart View" 
            description="Check task execution rates and goal-based task counts." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            editLabel={editLabel}
            showToggleButton={false}
            showExecutedTasks={false}
            selectedDate={new Date()}
            showUnplannedTasks={false}
            allowSelectDate={allowSelectDate}
            isToday={true}
          >
            <ChartView 
              tasks={viewTasks} 
              aggregationPeriod={aggregationPeriod}
              navigationOffset={navigationOffset}
              setAggregationPeriod={setAggregationPeriod}
              setNavigationOffset={setNavigationOffset}
            />
          </TabContent>
        </TabsContent>
      </Tabs>

      {showRecurrenceDialog && editingTaskRoutine && (
        <RecurrenceRuleDialog
          initialRoutine={editingTaskRoutine.routine}
          selectedDate={selectedDate}
          open={showRecurrenceDialog}
          onClose={() => {
            setShowRecurrenceDialog(false);
            setEditingTaskRoutine(null);
          }}
          onSubmit={handleRecurrenceSubmit}
        />
      )}
    </div>
  )
}