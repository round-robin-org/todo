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
  const [activeTab, setActiveTab] = useState("calendar")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [labels, setLabels] = useState(["Health", "Work", "Housework"])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [userLocation, setUserLocation] = useState<{ longitude: number, latitude: number } | null>(null)
  const [schedulingTask, setSchedulingTask] = useState<Task | null>(null)

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
          console.error('Failed to get user location:', error)
          toast.error('Could not get user location. Using default location.')
        }
      )
    } else {
      console.error('This browser does not support geolocation.')
      toast.error('Geolocation is not supported. Using default location.')
    }
  }, [])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const setTaskToSchedule = (task: Task) => {
    if (schedulingTask?.id === task.id) {
      setSchedulingTask(null)
      toast.info(`Scheduling mode cancelled for "${task.title}"`)
    } else {
      setSchedulingTask(task)
      toast.info(`Task "${task.title}" is now in scheduling mode. Please select a date.`)
    }
  }

  const handleDateClick = (date: Date) => {
    if (schedulingTask) {
      assignTaskToDate(schedulingTask.id, date)
      setSchedulingTask(null)
    } else {
      setSelectedDate(date)
    }
  }

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
      toast.success('Task added successfully')
    } catch (error) {
      console.error('Failed to add task:', error)
      toast.error('Failed to add task.')
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
      toast.success('Task updated successfully')
    } catch (error) {
      console.error('Failed to update task:', error)
      toast.error('Failed to update task.')
    }
  }

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
      toast.success('Task deleted successfully')
    } catch (error) {
      console.error('Failed to delete task:', error)
      toast.error('Failed to delete task.')
    }
  }

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

  const plannedTasks = tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd') && task.status === "planned")
  const executedPlannedTasks = tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd'))
  const unplannedTasks = tasks.filter(task => !task.scheduledDate && task.status === "planned")
  const executedUnplannedTasks = tasks.filter(task => !task.scheduledDate)

  return (
    <div>
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
        </TabsList>

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
              setSelectedDate={handleDateClick} 
              tasks={tasks} 
              addTask={addTask}
              addLabel={addLabel}
              labels={labels}
              assignTaskToDate={assignTaskToDate}
              unassignTaskFromDate={unassignTaskFromDate}
            />
            {selectedDate && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{format(selectedDate, 'MMMM d, yyyy')} Tasks</CardTitle>
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