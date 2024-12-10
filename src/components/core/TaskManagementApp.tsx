'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { format } from 'date-fns'
import { Header } from '@src/components/auth/Header'
import { TaskDialog } from '@src/components/core/TaskDialog'
import { CalendarView } from '@src/components/core/CalendarView'
import { ChartView } from '@src/components/core/ChartView'
import { useTasks } from '@src/hooks/useTasks'
import { TaskList } from '@src/components/core/TaskList'
import { ExecutedTasks } from '@src/components/core/ExecutedTasks'
import { TabContent } from '@src/components/core/TabContent'
import { Task } from '@src/lib/types'
import { supabase } from '@src/lib/supabase'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useAuth } from '@src/hooks/useAuth'
import { LabelSelector } from './LabelSelector'
import { Input } from '@src/components/ui/input'
import { Button } from '@src/components/ui/button'

export function TaskManagementApp() {
  const { user } = useAuth()
  const userId = user?.id

  const [activeTab, setActiveTab] = useState("calendar")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [showUnplannedTasks, setShowUnplannedTasks] = useState(false)
  const [labels, setLabels] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [schedulingTask, setSchedulingTask] = useState<Task | null>(null)
  const [showExecutedTasksList, setShowExecutedTasksList] = useState(false)
  const [newCalendarTaskTitle, setNewCalendarTaskTitle] = useState('')

  const { tasks, setTasks, error } = useTasks(selectedDate, activeTab)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const setTaskToScheduleHandler = (task: Task | null) => {
    if (task) {
      if (task.isRecurring) {
        toast.error('Recurring tasks cannot be set to scheduling mode.');
        return;
      }

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === task.id
            ? { ...t, isScheduling: !t.isScheduling }
            : { ...t, isScheduling: false }
        )
      );

      if (schedulingTask?.id === task.id) {
        setSchedulingTask(null);
        toast.info(`Scheduling mode canceled for: "${task.title}"`);
      } else {
        setSchedulingTask(task);
        toast.info(`Task "${task.title}" set to scheduling mode. Please select a date.`);
      }
    } else {
      setTasks(prevTasks =>
        prevTasks.map(t => ({
          ...t,
          isScheduling: false
        }))
      );
      setSchedulingTask(null);
      toast.info('Scheduling mode canceled.');
    }
  };

  const handleDateClick = (date: Date) => {
    if (schedulingTask) {
      assignTaskToDate(schedulingTask.id, date)
      setSchedulingTask(null)
    } else {
      setSelectedDate(date)
      setShowUnplannedTasks(false)
    }
  }

  const handleUnplannedClick = () => {
    setShowUnplannedTasks(true)
    setSelectedDate(new Date()) // Set selected date to today
  }

  // Add Task
  const addTask = async (taskData: any) => {
    if (!userId) {
      console.warn('User ID not found.');
      toast.error('User not authenticated.');
      return;
    }

    try {
      // 新しいラベルの処理を dbTaskData 作成前に移動
      let finalLabel = taskData.label;

      // 新しいラベルの場合は、まず labels テーブルに追加
      if (taskData.label === 'new' && taskData.newLabel) {
        const trimmedNewLabel = taskData.newLabel.trim().toLowerCase();
        if (trimmedNewLabel === 'new' || trimmedNewLabel === 'none') {
          toast.error('"new" or "none" is reserved label name.');
          return;
        }
        
        const { data: labelData, error: labelError } = await supabase
          .from('labels')
          .insert({ name: taskData.newLabel, user_id: userId })
          .select()
          .single();

        if (labelError) {
          console.error('Failed to add label:', labelError);
          toast.error(`Failed to add label: ${labelError.message}`);
          return;
        }

        // 新しいラベル名を使用
        finalLabel = taskData.newLabel;
        
        // ローカルのラベルリストを更新
        setLabels(prev => [...prev, taskData.newLabel]);
      }

      // dbTaskData の作成を新しいラベル処理の後に移動
      const dbTaskData = {
        title: taskData.title,
        memo: taskData.memo,
        status: taskData.status,
        starred: taskData.starred,
        scheduled_date: taskData.scheduledDate,
        label: finalLabel === 'none' ? null : finalLabel,
        routine: taskData.routine,
        user_id: userId
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert(dbTaskData)
        .select('*')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      const newTask: Task = {
        id: data.id.toString(),
        title: data.title,
        memo: data.memo || '',
        status: data.status === 'executed' ? 'executed' : 'planned',
        starred: data.starred || false,
        scheduledDate: data.scheduled_date || null,
        label: data.label || null,
        routine: data.routine || null,
        parentTaskId: null,
        exceptions: {}
      }

      console.log('New task added to state:', newTask);
      setTasks(prevTasks => [newTask, ...prevTasks])
      toast.success('Task added successfully')
    } catch (error: any) {
      console.error('Failed to add task:', error)
      toast.error(`Failed to add task: ${error.message}`)
    }
  }

  // Update Task
  const updateTask = async (updatedTask: Task & { updateType?: 'single' | 'future' | 'global' }) => {
    if (!userId) {
      toast.error('User not authenticated.')
      return
    }

    try {
      console.log('Updating task with data:', updatedTask);

      let finalLabel = updatedTask.label;

      // 新しいラベルの処理を先に行う
      if (updatedTask.label && !labels.includes(updatedTask.label)) {  // ラベルが存在しない場合
        const trimmedNewLabel = updatedTask.label.trim().toLowerCase();
        if (trimmedNewLabel === 'new' || trimmedNewLabel === 'none') {
          toast.error('"new" or "none" is reserved label name.');
          return;
        }

        const { data: existingLabel, error: checkError } = await supabase
          .from('labels')
          .select('name')
          .eq('name', updatedTask.label)
          .single();

        if (!existingLabel) {
          // ラベルが存在しない場合は追加
          const { data: labelData, error: labelError } = await supabase
            .from('labels')
            .insert({ name: updatedTask.label, user_id: userId })
            .select()
            .single();

          if (labelError) {
            console.error('Failed to add label:', labelError);
            toast.error(`Failed to add label: ${labelError.message}`);
            return;
          }

          // ローカルのラベルリストを更新
          setLabels(prev => [...prev, updatedTask.label]);
        }
      }

      // タスクの更新処理
      if (updatedTask.isRecurring && updatedTask.updateType === 'global') {
        // 全ての繰り返しタスクに適用し、例外をクリア
        const { data: updatedTasks, error: updateError } = await supabase
          .from('tasks')
          .update({
            routine: updatedTask.routine,
            exceptions: {}
          })
          .eq('original_task_id', updatedTask.originalId)
          .eq('user_id', userId)
          .select();

        if (updateError) throw updateError;

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.originalTaskId === updatedTask.originalId
              ? { ...t, routine: updatedTask.routine, exceptions: {} }
              : t
          )
        );
      } else if (updatedTask.isRecurring && updatedTask.updateType === 'single') {
        // 単一の繰り返しタスクを更新
        const { data: parentData, error: parentError } = await supabase
          .from('tasks')
          .update({
            title: updatedTask.title,
            label: updatedTask.label,
            routine: updatedTask.routine,
            memo: updatedTask.memo,
            exceptions: updatedTask.routine ? {} : updatedTask.exceptions, // ルール変更時はexceptionsをクリア
            user_id: userId
          })
          .eq('id', updatedTask.originalId)
          .eq('user_id', userId)
          .select();

        if (parentError) throw parentError;

        setTasks(prevTasks =>
          prevTasks.map(t =>
            t.originalId === updatedTask.originalId
              ? {
                  ...t,
                  title: updatedTask.title,
                  label: updatedTask.label,
                  routine: updatedTask.routine,
                  memo: updatedTask.memo,
                  exceptions: updatedTask.routine ? {} : t.exceptions
                }
              : t
          )
        );
      } else {
        // 繰り返しでないタスクの更新処理
        const { data, error } = await supabase
          .from('tasks')
          .update({
            title: updatedTask.title,
            memo: updatedTask.memo,
            status: updatedTask.status,
            starred: updatedTask.starred,
            scheduled_date: updatedTask.scheduledDate,
            label: finalLabel === 'none' ? null : finalLabel,
            routine: updatedTask.routine || null,
            user_id: userId
          })
          .eq('id', updatedTask.id)
          .eq('user_id', userId)
          .select();

        if (error) throw error;

        setTasks(prevTasks => (
          prevTasks.map(t => t.id === updatedTask.id ? { ...t, ...updatedTask, label: finalLabel } : t)
        ));
      }

      toast.success('Task updated successfully');
    } catch (error: any) {
      console.error('Failed to update task:', error);
      toast.error(`Failed to update task: ${error.message}`);
    }
  };

  // Toggle Task Status
  const toggleTaskStatus = async (taskId: string, occurrenceDate?: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) throw new Error('Task not found');

      const updatedStatus = task.status === 'executed' ? 'planned' : 'executed';

      if (task.isRecurring && occurrenceDate) {
        // 繰り返しタスクの場合は例外として処理
        const newExceptions = {
          ...task.exceptions,
          [occurrenceDate]: {
            ...task.exceptions?.[occurrenceDate],
            status: updatedStatus
          }
        };

        const { error } = await supabase
          .from('tasks')
          .update({ exceptions: newExceptions })
          .eq('id', task.originalId);

        if (error) throw error;
      } else {
        // 通常タスクの場合は直接更新
        const { error } = await supabase
          .from('tasks')
          .update({ status: updatedStatus })
          .eq('id', taskId);

        if (error) throw error;
      }

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, status: updatedStatus } : t
        )
      );
      
      toast.success('Task status updated');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status.');
    }
  };

  // Toggle Task Star
  const toggleTaskStar = async (taskId: string, occurrenceDate?: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) throw new Error('Task not found');

      const updatedStar = !task.starred;

      if (task.isRecurring && occurrenceDate) {
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
          .eq('id', task.originalId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tasks')
          .update({ starred: updatedStar })
          .eq('id', taskId);

        if (error) throw error;
      }

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, starred: updatedStar } : t
        )
      );
      
      toast.success('Task star updated');
    } catch (error) {
      console.error('Failed to update star:', error);
      toast.error('Failed to update star.');
    }
  };

  // Add Label
  const addLabel = async (newLabel: string, taskId?: string) => {
    console.log("addLabel called with:", newLabel);
    if (!userId) {
      console.warn('User ID not found.');
      toast.error('User not authenticated.');
      return;
    }

    try {
      // データベースに新しいラベルを追加
      const { error } = await supabase
        .from('labels')
        .insert({ name: newLabel, user_id: userId })

      if (error) throw error;

      // ローカルのラベルリストを更新
      setLabels(prevLabels => [...prevLabels, newLabel]);

      // taskId が提供されている場合は、タスクのラベルを更新
      if (taskId) {
        await updateTaskLabel(taskId, newLabel);
      }

      toast.success('Label added successfully');
    } catch (error) {
      console.error('Failed to add label:', error);
      toast.error('Failed to add label');
    }
  };

  // Fetch labels on component mount
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const { data, error } = await supabase
          .from('labels')
          .select('name')
          .order('name', { ascending: true })
          .throwOnError();

        if (error) throw error;

        // 重複を除去してラベルを設定
        const uniqueLabels = [...new Set(data.map(label => label.name))];
        setLabels(uniqueLabels);
      } catch (error) {
        console.error('Failed to fetch labels:', error);
        toast.error('Failed to fetch labels');
      }
    };

    fetchLabels();
  }, []);

  // Delete Task
  const deleteTask = async (taskId: string, deleteType?: 'single' | 'all' | 'future') => {
    if (!userId) {
      toast.error('User not authenticated.');
      return;
    }

    try {
      const taskToDelete = tasks.find(t => t.id === taskId);
      if (!taskToDelete) throw new Error('Task not found');

      // 繰り返しタスクの削除
      if (taskToDelete.isRecurring) {
        const parentId = taskToDelete.originalId;
        const currentDate = taskToDelete.scheduledDate;
        let newExceptions = taskToDelete.exceptions || {};

        switch (deleteType) {
          case 'all':
            // すべての繰り返しを削除
            const { error: deleteError } = await supabase
              .from('tasks')
              .delete()
              .eq('id', parentId)
              .eq('user_id', userId);

            if (deleteError) throw deleteError;

            setTasks(prevTasks => 
              prevTasks.filter(t => t.originalId !== parentId && t.id !== parentId)
            );
            break;

          case 'future':
            // このタスク以降を削除
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
              .eq('id', parentId)
              .eq('user_id', userId);

            if (updateError) throw updateError;

            // 過去の例外を保持しつつ、指定された日付以降の���外に `status: 'deleted'` 設定
            newExceptions = Object.keys(taskToDelete.exceptions || {})
              .filter(date => date >= currentDate)
              .reduce((acc, date) => ({
                ...acc,
                [date]: {
                  ...taskToDelete.exceptions![date],
                  status: 'deleted'
                }
              }), taskToDelete.exceptions || {});

            setTasks(prevTasks =>
              prevTasks.map(t =>
                t.id === parentId
                  ? { ...t, routine: { ...t.routine, ends: { type: 'on', value: currentDate } }, exceptions: newExceptions }
                  : t
              )
            );
            break;

          case 'single':
            // このタスクのみ削除
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
              .eq('id', parentId)
              .eq('user_id', userId);

            if (error) throw error;

            setTasks(prevTasks =>
              prevTasks.map(t =>
                t.id === parentId
                  ? { ...t, exceptions: newExceptions }
                  : t
              ).filter(t => t.id !== taskId)
            );
            break;
        }
      } else {
        // 通常タスクの削除
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', taskId)
          .eq('user_id', userId);

        if (error) throw error;

        setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      }

      toast.success('Task deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      toast.error(`Failed to delete task: ${error.message}`);
    }
  };

  // Toggle Executed Tasks Visibility
  const toggleExecutedTasks = () => {
    setShowExecutedTasks(prev => !prev)
  }

  // Add: Assign task to date
  const assignTaskToDate = async (taskId: string, date: Date) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ scheduled_date: format(date, 'yyyy-MM-dd') })
        .eq('id', taskId)

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

  // Add: Unassign task from date
  const unassignTaskFromDate = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ scheduled_date: null })
        .eq('id', taskId)

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

  // Add deleteLabel function
  const deleteLabel = async (labelToDelete: string) => {
    try {
      // データベースからラベルを削除
      const { error } = await supabase
        .from('labels')
        .delete()
        .eq('name', labelToDelete)

      if (error) throw error;

      // ローカルのラベルリストを更新
      setLabels(prevLabels => prevLabels.filter(label => label !== labelToDelete));
      toast.success('Label deleted successfully');
    } catch (error) {
      console.error('Failed to delete label:', error);
      toast.error('Failed to delete label');
    }
  };

  const plannedTasks = tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd') && task.status === "planned")
  const executedPlannedTasks = tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd'))
  const unplannedTasks = tasks.filter(task => !task.scheduledDate && task.status === "planned")
  const executedUnplannedTasks = tasks.filter(task => !task.scheduledDate)

  // Get today's date
  const today = format(new Date(), 'yyyy-MM-dd')

  // Filter today's scheduled tasks (reflecting the display settings for executed tasks)
  const todayTasks = tasks.filter(task => 
    task.scheduledDate === today && 
    (showExecutedTasksList || task.status !== 'executed')
  )

  // Filter today's executed tasks
  const executedTodayTasks = tasks.filter(task => 
    task.scheduledDate === today && task.status === 'executed'
  )

  // ラベルを更新する関数を追加
  const updateTaskLabel = async (taskId: string, newLabel: string) => {
    if (!userId) {
      toast.error('Authentication is required.')
      return
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ label: newLabel === 'none' ? null : newLabel })
        .eq('id', taskId)
        .select()
        .single()

      if (error) throw error

      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? { ...t, label: newLabel === 'none' ? null : newLabel } : t)
      )
      toast.success('Label updated successfully')
    } catch (error: any) {
      console.error('Failed to update label:', error)
      toast.error(`Failed to update label: ${error.message}`)
    }
  }

  // タイトル更新関数を追加
  const updateTaskTitleHandler = async (taskId: string, newTitle: string, updateType: 'global' | 'single') => {
    if (!userId) {
      toast.error('Authentication is required.')
      return
    }

    try {
      // 繰り返しタスクの場合、全ての関連タスクを更新
      if (updateType === 'global') {
        // オリジナルタスクを取得
        const { data: originalTask, error: fetchError } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', taskId)
          .single()

        if (fetchError) {
          throw fetchError
        }

        if (!originalTask.is_recurring) {
          // 繰り返しタスクでない場合は単一スクとして更新
          const { error: updateError } = await supabase
            .from('tasks')
            .update({ title: newTitle })
            .eq('id', taskId)
          
          if (updateError) {
            throw updateError
          }

          setTasks(prevTasks =>
            prevTasks.map(t =>
              t.id === taskId ? { ...t, title: newTitle } : t
            )
          )
        } else {
          // 繰り返しタスクの場合、originalIdを基に全ての関連タスクを更新
          const parentId = originalTask.original_task_id || originalTask.id

          const { data: updatedTasks, error: updateError } = await supabase
            .from('tasks')
            .update({ title: newTitle })
            .eq('original_task_id', parentId)
            .eq('user_id', userId)
          
          if (updateError) {
            throw updateError
          }

          setTasks(prevTasks =>
            prevTasks.map(t =>
              t.originalTaskId === parentId
                ? { ...t, title: newTitle }
                : t
            )
          )
        }
      } else {
        // 単一タスクの更新
        const { error: updateError } = await supabase
          .from('tasks')
          .update({ title: newTitle })
          .eq('id', taskId)
        
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
    } catch (error: any) {
      console.error('Failed to update task title:', error)
      toast.error(`Failed to update task title: ${error.message}`)
    }
  }

  const handleCalendarTaskKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCalendarTask();
    }
  }

  const handleAddCalendarTask = () => {
    if (newCalendarTaskTitle.trim() === '') {
      toast.error('Please enter a task title');
      return;
    }

    const newTask: Task = {
      id: '',
      title: newCalendarTaskTitle,
      memo: '',
      status: 'planned',
      starred: false,
      scheduledDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
      label: null,
      routine: null,
      parentTaskId: null,
      exceptions: {}
    }

    addTask(newTask);
    setNewCalendarTaskTitle('');
  }

  return (
    <div>
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='list'>List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
          {/* <TabsTrigger value="map">Map</TabsTrigger> */}
        </TabsList>

        {/* List Tab */}
        <TabsContent value="list">
          <TabContent 
            title="List View" 
            description="Focus on today's tasks." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            showToggleButton={true}
            showExecutedTasks={showExecutedTasksList}
            toggleExecutedTasks={() => setShowExecutedTasksList(prev => !prev)}
            selectedDate={new Date()}
            showUnplannedTasks={false}
            allowSelectDate={false}
            isToday={true}
          >
            <TaskList 
              tasks={todayTasks} 
              toggleStatus={toggleTaskStatus}
              toggleStar={toggleTaskStar}
              onEdit={setEditingTask}
              isDraggable={true}
              onDragEnd={handleDragEnd}
              deleteTask={deleteTask}
              showExecutedTasks={showExecutedTasksList}
              executedTasks={executedTodayTasks}
              labels={labels}
              setLabels={setLabels}
              updateTaskLabel={updateTaskLabel}
              updateTaskTitle={updateTaskTitleHandler}
              addLabel={addLabel}
              deleteLabel={deleteLabel}
              unassignFromDate={unassignTaskFromDate}
              addTask={addTask}
              isToday={true}
              selectedDate={new Date()}
            />
          </TabContent>
        </TabsContent>

        {/* Calendar View Tab */}
        <TabsContent value="calendar">
          <TabContent 
            title="Calendar View" 
            description="Plan tasks by date." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            showToggleButton={true}
            showExecutedTasks={showExecutedTasks}
            toggleExecutedTasks={toggleExecutedTasks}
            selectedDate={selectedDate}
            showUnplannedTasks={showUnplannedTasks}
            allowSelectDate={false}
            isToday={!showUnplannedTasks}
          >
            <CalendarView 
              selectedDate={selectedDate} 
              setSelectedDate={handleDateClick} 
              tasks={tasks} 
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
                    onEdit={setEditingTask}
                    isDraggable={false}
                    deleteTask={deleteTask}
                    onDragEnd={handleDragEnd}
                    assignTaskToDate={assignTaskToDate}
                    unassignFromDate={unassignTaskFromDate}
                    setTaskToSchedule={setTaskToScheduleHandler}
                    schedulingTaskId={schedulingTask?.id}
                    labels={labels}
                    setLabels={setLabels}
                    updateTaskLabel={updateTaskLabel}
                    updateTaskTitle={updateTaskTitleHandler}
                    addLabel={addLabel}
                    deleteLabel={deleteLabel}
                    addTask={addTask}
                    isToday={!showUnplannedTasks}
                    selectedDate={selectedDate}
                  />
                  {showExecutedTasks && (
                    <ExecutedTasks 
                      tasks={executedPlannedTasks}
                      toggleStatus={toggleTaskStatus}
                      toggleStar={toggleTaskStar}
                      onEdit={setEditingTask}
                      deleteTask={deleteTask}
                    />
                  )}
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
                    onEdit={setEditingTask}
                    isDraggable={false}
                    deleteTask={deleteTask}
                    onDragEnd={handleDragEnd}
                    assignTaskToDate={assignTaskToDate}
                    unassignFromDate={unassignTaskFromDate}
                    setTaskToSchedule={setTaskToScheduleHandler}
                    schedulingTaskId={schedulingTask?.id}
                    labels={labels}
                    setLabels={setLabels}
                    updateTaskLabel={updateTaskLabel}
                    updateTaskTitle={updateTaskTitleHandler}
                    addLabel={addLabel}
                    deleteLabel={deleteLabel}
                    addTask={addTask}
                    isToday={!showUnplannedTasks}
                    selectedDate={selectedDate}
                  />
                  {showExecutedTasks && (
                    <ExecutedTasks 
                      tasks={executedUnplannedTasks}
                      toggleStatus={toggleTaskStatus}
                      toggleStar={toggleTaskStar}
                      onEdit={setEditingTask}
                      deleteTask={deleteTask}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </TabContent>
        </TabsContent>

        {/* Chart Tab */}
        <TabsContent value="chart">
          <TabContent 
            title="Chart View" 
            description="Check task execution rates and goal-based task counts." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            showToggleButton={false}
            showExecutedTasks={false}
            selectedDate={new Date()}
            showUnplannedTasks={false}
            allowSelectDate={true}
            isToday={true}
          >
            <ChartView tasks={tasks} />
          </TabContent>
        </TabsContent>
      </Tabs>

      {/* Task Edit Dialog */}
      {editingTask && (
        <TaskDialog 
          labels={labels}
          setLabels={setLabels}
          addTask={addTask}
          updateTask={updateTask}
          addLabel={addLabel}
          deleteLabel={deleteLabel}
          updateTaskLabel={updateTaskLabel}
          isEdit={true}
          taskToEdit={editingTask}
          isToday={showUnplannedTasks || true}
          open={true}
          onClose={() => setEditingTask(null)}
          selectedDate={showUnplannedTasks ? new Date() : selectedDate || new Date()}
          showUnplannedTasks={false}
          allowSelectDate={false}
        />
      )}
    </div>
  )
}