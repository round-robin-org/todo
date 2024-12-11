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
  updateTaskLabel: (taskId: string, newLabel: string) => Promise<void>;
  labels: string[];
  addLabel: (label: string) => Promise<void>;
  updateTaskTitle: (id: string, newTitle: string, updateType?: 'global' | 'single') => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteLabel: (label: string) => Promise<void>;
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ExecutedTasks({ 
  tasks, 
  toggleStatus, 
  toggleStar, 
  onEdit, 
  deleteTask, 
  updateTaskLabel,
  labels,
  addLabel,
  updateTaskTitle,
  addTask,
  updateTask,
  deleteLabel,
  setLabels
}: ExecutedTasksProps) {
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
          updateTaskLabel={updateTaskLabel}
          labels={labels}
          addLabel={addLabel}
          updateTaskTitle={updateTaskTitle}
          addTask={addTask}
          updateTask={updateTask}
          deleteLabel={deleteLabel}
          setLabels={setLabels}
          isToday={true}
          selectedDate={new Date()}
          showUnplannedTasks={false}
          allowSelectDate={false}
          disableScheduling={true}
        />
      ))}
    </ul>
  )
} 