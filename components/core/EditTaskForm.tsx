'use client'

import React from 'react'
import { TaskForm } from './TaskForm'
import { Task } from './TaskItem'

type EditTaskFormProps = {
  task: Task;
  labels: string[];
  updateTask: (updatedTask: Task) => void;
  onClose: () => void;
}

export function EditTaskForm({ task, labels, updateTask, onClose }: EditTaskFormProps) {
  const handleUpdateTask = (updatedTaskData: Omit<Task, 'id'>) => {
    const updatedTask: Task = { ...task, ...updatedTaskData }
    updateTask(updatedTask)
    onClose()
  }

  return (
    <TaskForm 
      initialTask={task}
      labels={labels} 
      onSubmit={handleUpdateTask} 
      isToday={false} 
    />
  )
} 