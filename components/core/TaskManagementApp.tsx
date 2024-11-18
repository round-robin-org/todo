'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from 'date-fns'
import { Header } from './Header'
import { TaskDialog } from './TaskDialog'
import { CalendarView } from './CalendarView'
import { ChartView } from './ChartView'
import { useTasks } from '@/hooks/useTasks'
import { TaskList } from './TaskList'
import { ExecutedTasks } from './ExecutedTasks'
import { TabContent } from './TabContent'
import { Task } from '../../lib/types'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export function TaskManagementApp() {
  const [activeTab, setActiveTab] = useState("today")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [labels, setLabels] = useState(["Health", "Work", "Housework"])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { tasks, setTasks, error } = useTasks(selectedDate, activeTab)

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
          label: updatedTask.label
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
      toast.success('Task status updated successfully')
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
      toast.success('Task star updated successfully')
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

  return (
    <div>
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="pastfuture">Past & Future</TabsTrigger>
          <TabsTrigger value="backlog">Backlog</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        {/* Today Tab */}
        <TabsContent value="today">
          <TabContent 
            title="Today's Tasks" 
            description="Manage your tasks for today." 
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

        {/* Past & Future Tab */}
        <TabsContent value="pastfuture">
          <TabContent 
            title="Past & Future Tasks" 
            description="Tasks before today and after tomorrow." 
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

        {/* Review Tab */}
        <TabsContent value="review">
          <TabContent 
            title="Review" 
            description="Trends in task completion rates and goal-based task counts." 
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
        />
      )}
    </div>
  )
} 