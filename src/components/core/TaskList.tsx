'use client'

import React from 'react'
import { TaskItem } from '@src/components/core/TaskItem'
import { Task } from '@src/lib/types'

type TaskListProps = {
  tasks: Task[];
  toggleStatus: (id: string) => void;
  toggleStar: (id: string) => void;
  onEdit: (task: Task) => void;
  deleteTask: (id: string, type?: 'single' | 'all' | 'future') => void;
  assignTaskToDate?: (id: string) => void;
  unassignFromDate?: (id: string) => void;
  setTaskToSchedule?: (task: Task | null) => void;
  showExecutedTasks?: boolean;
  executedTasks?: Task[];
  labels: string[];
  updateTaskLabel: (taskId: string, newLabel: string) => void;
}

export function TaskList({ tasks, toggleStatus, toggleStar, onEdit, deleteTask, assignTaskToDate, unassignFromDate, setTaskToSchedule, showExecutedTasks, executedTasks, labels, updateTaskLabel }: TaskListProps) {
  const plannedTasks = tasks.filter(task => task.status === "planned")

  return (
    <>
      <ul>
        {plannedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleStatus={toggleStatus}
            toggleStar={toggleStar}
            onEdit={onEdit}
            deleteTask={deleteTask}
            assignToDate={assignTaskToDate}
            unassignFromDate={unassignFromDate}
            setTaskToSchedule={setTaskToSchedule}
            labels={labels}
            updateTaskLabel={updateTaskLabel}
          />
        ))}
      </ul>
      {showExecutedTasks && executedTasks && (
        <ul>
          {executedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleStatus={toggleStatus}
              toggleStar={toggleStar}
              onEdit={onEdit}
              deleteTask={deleteTask}
              isExecuted={true}
              assignToDate={assignTaskToDate}
              unassignFromDate={unassignFromDate}
              setTaskToSchedule={setTaskToSchedule}
              labels={labels}
              updateTaskLabel={updateTaskLabel}
            />
          ))}
        </ul>
      )}
    </>
  )
} 