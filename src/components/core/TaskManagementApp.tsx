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

export function TaskManagementApp() {
  const { user } = useAuth()
  const userId = user?.id

  const [activeTab, setActiveTab] = useState("calendar")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [showUnplannedTasks, setShowUnplannedTasks] = useState(false)
  const [labels, setLabels] = useState(["Health", "Work", "Housework"])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [schedulingTask, setSchedulingTask] = useState<Task | null>(null)
  const [showExecutedTasksList, setShowExecutedTasksList] = useState(false)

  const { tasks, setTasks, error } = useTasks(selectedDate, activeTab)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const setTaskToSchedule = (task: Task | null) => {
    if (task) {
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
      console.warn('ユーザーIDが取得できませんでした。');
      toast.error('ユーザーが認証されていません。');
      return;
    }

    try {
      const dbTaskData = {
        title: taskData.title,
        memo: taskData.memo,
        status: taskData.status,
        starred: taskData.starred,
        scheduled_date: taskData.scheduledDate,
        label: taskData.label,
        routine: taskData.routine,
        user_id: userId
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert(dbTaskData)
        .select('*')
        .single();

      if (error) {
        console.error('Supabaseからのエラー:', error);
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
      }

      console.log('新しいタスクをステートに追加:', newTask);
      setTasks(prevTasks => [newTask, ...prevTasks])
      toast.success('Task added successfully')
    } catch (error: any) {
      console.error('タスクの追加に失敗しました:', error)
      toast.error(`Failed to add task: ${error.message}`)
    }
  }

  // Update Task
  const updateTask = async (updatedTask: Task) => {
    if (!userId) {
      toast.error('ユーザーが認証されていません。')
      return
    }
    try {
      console.log('Updating task with data:', updatedTask);

      // 繰り返しタスクの個別の変更かどうかを判定
      if (updatedTask.scheduledDate && updatedTask.id.includes("-")) {
        const parentTaskId = updatedTask.id.split("-")[0];
        const parentTask = tasks.find(t => t.id.split("-")[0] === parentTaskId && !t.id.includes("-"));

        if (!parentTask) throw new Error('Parent task not found');

        const exceptionDate = updatedTask.scheduledDate;
        const exceptionData = {
          status: updatedTask.status,
          scheduled_date: updatedTask.scheduledDate,
          starred: updatedTask.starred,
          memo: updatedTask.memo,
          label: updatedTask.label,
          title: updatedTask.title
        };

        // 既存の exceptions を取得
        const existingExceptions = parentTask.exceptions || {};

        // 新しい exception を追加
        existingExceptions[exceptionDate] = exceptionData;

        // exceptions を更新
        const { error: updateError } = await supabase
          .from('tasks')
          .update({
            exceptions: existingExceptions,
            user_id: userId
          })
          .eq('id', parentTask.id)
          .eq('user_id', userId)

        if (updateError) {
          console.error('Supabase error details:', updateError);
          throw updateError;
        }

        // フロントエンドのタスクを更新
        setTasks(prevTasks =>
          prevTasks.map(t => {
            if (t.id === updatedTask.id) {
              return { ...t, ...exceptionData };
            } else if (t.id === parentTask.id) {
              return { ...t, exceptions: existingExceptions };
            }
            return t;
          })
        );
      } else {
        // 通常のタスク更新処理
        const { data, error } = await supabase
          .from('tasks')
          .update({
            title: updatedTask.title,
            memo: updatedTask.memo,
            status: updatedTask.status,
            starred: updatedTask.starred,
            scheduled_date: updatedTask.scheduledDate,
            label: updatedTask.label || null,
            routine: updatedTask.routine || null,
            user_id: userId
          })
          .eq('id', updatedTask.id)
          .eq('user_id', userId)
          .select();

        if (error) {
          console.error('Supabase error details:', error);
          throw error;
        }

        const mappedUpdatedTask: Task = {
          id: data[0].id.toString(),
          title: data[0].title,
          memo: data[0].memo || '',
          status: data[0].status === 'executed' ? 'executed' : 'planned',
          starred: data[0].starred || false,
          scheduledDate: data[0].scheduled_date || null,
          label: data[0].label || '',
          routine: data[0].routine || null,
          exceptions: data[0].exceptions || {}
        };

        setTasks(prevTasks =>
          prevTasks.map(t => t.id === updatedTask.id ? mappedUpdatedTask : t)
        );
      }

      toast.success('Task updated successfully');
    } catch (error: any) {
      console.error('Failed to update task:', error);
      toast.error(`Failed to update task: ${error.message}`);
    }
  };

  // Toggle Task Status
  const toggleTaskStatus = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) throw new Error('Task not found')

      const updatedStatus = task.status === 'executed' ? 'planned' : 'executed'

      const { error } = await supabase
        .from('tasks')
        .update({ status: updatedStatus })
        .eq('id', taskId)

      if (error) throw error

      // Update state
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, status: updatedStatus } : t
        )
      )
      toast.success('Task status updated')
    } catch (error) {
      console.error('Failed to update status:', error)
      toast.error('Failed to update status.')
    }
  }

  // Toggle Task Star
  const toggleTaskStar = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) throw new Error('Task not found')

      const updatedStar = !task.starred

      const { error } = await supabase
        .from('tasks')
        .update({ starred: updatedStar })
        .eq('id', taskId)

      if (error) throw error

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, starred: updatedStar } : t
        )
      )
      toast.success('Task star updated')
    } catch (error) {
      console.error('Failed to update star:', error)
      toast.error('Failed to update star.')
    }
  }

  // Add Label
  const addLabel = async (newLabel: string) => {
    try {
      const { error } = await supabase
        .from('labels')
        .insert({ name: newLabel })

      if (error) throw error;

      setLabels(prevLabels => [...prevLabels, newLabel]);
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
          .order('name', { ascending: true });

        if (error) throw error;

        setLabels(data.map(label => label.name));
      } catch (error) {
        console.error('Failed to fetch labels:', error);
        toast.error('Failed to fetch labels');
      }
    };

    fetchLabels();
  }, []);

  // Delete Task
  const deleteTask = async (taskId: string) => {
    if (!userId) {
      toast.error('ユーザーが認証されていません。')
      return
    }
    try {
      const taskToDelete = tasks.find(t => t.id === taskId);
      if (!taskToDelete) throw new Error('Task not found');

      if (taskToDelete.scheduledDate && taskToDelete.id.includes("-")) {
        const parentTaskId = taskToDelete.id.split("-")[0];
        const parentTask = tasks.find(t => t.id.split("-")[0] === parentTaskId && !t.id.includes("-"));
        if (!parentTask) throw new Error('Parent task not found');

        const exceptionDate = taskToDelete.scheduledDate;
        const exceptionData = {
          status: 'deleted'
        };

        const existingExceptions = parentTask.exceptions || {};

        existingExceptions[exceptionDate] = exceptionData;

        const { error: updateError } = await supabase
          .from('tasks')
          .update({
            exceptions: existingExceptions,
            user_id: userId
          })
          .eq('id', parentTask.id)
          .eq('user_id', userId)

        if (updateError) {
          console.error('Supabase error details:', updateError);
          throw updateError;
        }

        setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      } else {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', taskId)
          .eq('user_id', userId)

        if (error) throw error;

        setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      }

      toast.success('Task deleted successfully');
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task.');
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

      if (error) throw error

      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? { ...t, scheduledDate: null } : t)
      )
      toast.success('Task unscheduled successfully')
    } catch (error) {
      console.error('Failed to unschedule task:', error)
      toast.error('Failed to unschedule task.')
    }
  }

  // Add deleteLabel function
  const deleteLabel = async (labelToDelete: string) => {
    try {
      const { error } = await supabase
        .from('labels')
        .delete()
        .eq('name', labelToDelete)

      if (error) throw error;

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
              isDraggable={false}
              deleteTask={deleteTask}
              showExecutedTasks={showExecutedTasksList}
              executedTasks={executedTodayTasks}
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
            isToday={showUnplannedTasks}
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
                    unassignTaskFromDate={unassignTaskFromDate}
                    setTaskToSchedule={setTaskToSchedule}
                    schedulingTaskId={schedulingTask?.id}
                  />
                  {showExecutedTasks && (
                    <ExecutedTasks 
                      tasks={executedPlannedTasks}
                      toggleStatus={toggleTaskStatus}
                      toggleStar={toggleTaskStar}
                      onEdit={setEditingTask}
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
                    unassignTaskFromDate={unassignTaskFromDate}
                    setTaskToSchedule={setTaskToSchedule}
                    schedulingTaskId={schedulingTask?.id}
                  />
                  {showExecutedTasks && (
                    <ExecutedTasks 
                      tasks={executedUnplannedTasks}
                      toggleStatus={toggleTaskStatus}
                      toggleStar={toggleTaskStar}
                      onEdit={setEditingTask}
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
          addTask={addTask}
          updateTask={updateTask}
          isEdit={true}
          taskToEdit={editingTask}
          isToday={showUnplannedTasks || true}
          addLabel={addLabel}
          deleteLabel={deleteLabel}
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