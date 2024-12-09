'use client'

import React from 'react'
import { Task } from '@src/lib/types'
import { TaskItem } from '@src/components/core/TaskItem'

type ExecutedTasksProps = {
  tasks: Task[];
  toggleStatus: (id: string) => void;
  toggleStar: (id: string) => void;
  onEdit: (task: Task) => void;
  deleteTask: (id: string, type?: 'single' | 'all' | 'future') => void;
}

export function ExecutedTasks({ tasks, toggleStatus, toggleStar, onEdit, deleteTask }: ExecutedTasksProps) {
  const executedTasks = tasks.filter(task => task.status === "executed")
  
  if (executedTasks.length === 0) return null;

  return (
    <ul className="space-y-2 mt-4">
      {executedTasks.map((task) => (
        <TaskItem 
          key={task.id}
          task={task}
          toggleStatus={toggleStatus}
          toggleStar={toggleStar}
          onEdit={onEdit}
          deleteTask={deleteTask}
          isExecuted={true}
        />
      ))}
    </ul>
  )
} 