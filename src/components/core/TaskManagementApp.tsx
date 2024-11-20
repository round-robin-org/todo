'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { format } from 'date-fns'
import { Header } from '@src/components/core/Header'
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { MapView } from './MapView'

export function TaskManagementApp() {
  const [activeTab, setActiveTab] = useState("today")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [labels, setLabels] = useState(["Health", "Work", "Housework"])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [userLocation, setUserLocation] = useState<{ longitude: number, latitude: number } | null>(null)

  const { tasks, setTasks, error } = useTasks(selectedDate, activeTab)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
        },
        (error) => {
          console.error('ユーザーの位置情報取得に失敗しました:', error)
          toast.error('ユーザーの位置情報を取得できませんでした。デフォルトの位置を使用します。')
        }
      )
    } else {
      console.error('このブラウザはジオロケーションをサポートしていません。')
      toast.error('ジオロケーションがサポートされていません。デフォルトの位置を使用します。')
    }
  }, [])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  // Add Task
  const addTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          scheduled_date: taskData.scheduledDate ? taskData.scheduledDate : null,
          longitude: userLocation ? userLocation.longitude : null,
          latitude: userLocation ? userLocation.latitude : null,
          scheduledDate: undefined
        })
        .select()

      if (error) {
        throw error
      }

      // Add new task to state
      setTasks(prevTasks => [data[0], ...prevTasks])
      toast.success('タスクが正常に追加されました')
    } catch (error) {
      console.error('タスクの追加に失敗しました:', error)
      toast.error('タスクの追加に失敗しました。')
    }
  }

  // Update Task
  const updateTask = async (updatedTask: Task) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updatedTask.title,
          memo: updatedTask.memo,
          status: updatedTask.status,
          starred: updatedTask.starred,
          scheduled_date: updatedTask.scheduledDate ? updatedTask.scheduledDate : null,
          label: updatedTask.label,
          longitude: userLocation ? userLocation.longitude : null,
          latitude: userLocation ? userLocation.latitude : null
        })
        .eq('id', updatedTask.id)

      if (error) throw error

      // Update state
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      )
      toast.success('タスクが正常に更新されました')
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error)
      toast.error('タスクの更新に失敗しました。')
    }
  }

  // Toggle Task Status
  const toggleTaskStatus = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) throw new Error('タスクが見つかりません')

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
      toast.success('タスクのステータスが更新されました')
    } catch (error) {
      console.error('ステータスの更新に失敗しました:', error)
      toast.error('ステータスの更新に失敗しました。')
    }
  }

  // Toggle Task Star
  const toggleTaskStar = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) throw new Error('タスクが見つかりません')

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
      toast.success('タスクのスターが更新されました')
    } catch (error) {
      console.error('スターの更新に失敗しました:', error)
      toast.error('スターの更新に失敗しました。')
    }
  }

  // Add Label
  const addLabel = (newLabel: string) => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels(prevLabels => [...prevLabels, newLabel])
    }
  }

  // Delete Task
  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (error) throw error

      // Remove task from state
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId))
      toast.success('タスクが正常に削除されました')
    } catch (error) {
      console.error('タスクの削除に失敗しました:', error)
      toast.error('タスクの削除に失敗しました。')
    }
  }

  // Toggle Executed Tasks Visibility
  const toggleExecutedTasks = () => {
    setShowExecutedTasks(prev => !prev)
  }

  return (
    <div>
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="backlog">Backlog</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>

        {/* Today Tab */}
        <TabsContent value="today">
          <TabContent 
            title="Today's Tasks" 
            description="Focus on your tasks for today." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            showToggleButton={true}
            showExecutedTasks={showExecutedTasks}
            toggleExecutedTasks={toggleExecutedTasks}
          >
            <TaskList 
              tasks={tasks.filter(task => task.scheduledDate === format(new Date(), 'yyyy-MM-dd'))}
              toggleStatus={toggleTaskStatus}
              toggleStar={toggleTaskStar}
              onEdit={setEditingTask}
              isDraggable={false}
              deleteTask={deleteTask}
              onDragEnd={handleDragEnd}
            />
            {showExecutedTasks && (
              <ExecutedTasks 
                tasks={tasks.filter(task => task.scheduledDate === format(new Date(), 'yyyy-MM-dd'))}
                toggleStatus={toggleTaskStatus}
                toggleStar={toggleTaskStar}
                onEdit={setEditingTask}
              />
            )}
          </TabContent>
        </TabsContent>

        {/* Calendar View Tab */}
        <TabsContent value="calendar">
          <TabContent 
            title="Calendar View" 
            description="View tasks by date." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            showToggleButton={true}
            showExecutedTasks={showExecutedTasks}
            toggleExecutedTasks={toggleExecutedTasks}
          >
            <CalendarView 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              tasks={tasks} 
              addTask={addTask}
              addLabel={addLabel}
              labels={labels}
            />
            {selectedDate && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{format(selectedDate, 'MMMM d, yyyy')} Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList 
                    tasks={tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd') && task.status === "planned")}
                    toggleStatus={toggleTaskStatus}
                    toggleStar={toggleTaskStar}
                    onEdit={setEditingTask}
                    isDraggable={false}
                    deleteTask={deleteTask}
                    onDragEnd={handleDragEnd}
                  />
                  {showExecutedTasks && (
                    <ExecutedTasks 
                      tasks={tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd'))}
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

        {/* Backlog Tab */}
        <TabsContent value="backlog">
          <TabContent 
            title="Backlog" 
            description="List of tasks without a set date." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            showToggleButton={true}
            showExecutedTasks={showExecutedTasks}
            toggleExecutedTasks={toggleExecutedTasks}
          >
            <TaskList 
              tasks={tasks.filter(task => !task.scheduledDate)}
              toggleStatus={toggleTaskStatus}
              toggleStar={toggleTaskStar}
              onEdit={setEditingTask}
              isDraggable={false}
              deleteTask={deleteTask}
              onDragEnd={handleDragEnd}
            />
            {showExecutedTasks && (
              <ExecutedTasks 
                tasks={tasks.filter(task => !task.scheduledDate)}
                toggleStatus={toggleTaskStatus}
                toggleStar={toggleTaskStar}
                onEdit={setEditingTask}
              />
            )}
          </TabContent>
        </TabsContent>

        {/* Chart Tab */}
        <TabsContent value="chart">
          <TabContent 
            title="Chart View" 
            description="Trends in task execution rates and goal-based task counts." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            showToggleButton={false}
          >
            <ChartView tasks={tasks} />
          </TabContent>
        </TabsContent>

        {/* Map Tab */}
        <TabsContent value="map">
          <TabContent 
            title="Map View" 
            description="View tasks on a map." 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            showToggleButton={false}
          >
            <MapView tasks={tasks} userLocation={userLocation} />
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
          isToday={false}
          addLabel={addLabel}
          open={true}
          onClose={() => setEditingTask(null)}
          userLocation={userLocation}
        />
      )}
    </div>
  )
} 