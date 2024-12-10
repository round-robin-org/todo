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
  updateTaskTitle: (taskId: string, newTitle: string, updateType?: 'global' | 'single') => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  addLabel: (label: string) => void;
  deleteLabel: (label: string) => void;
  isToday: boolean;
  selectedDate: Date;
  showUnplannedTasks: boolean;
  allowSelectDate: boolean;
  setLabels: (labels: string[]) => void;
}

export function TaskList({ tasks, toggleStatus, toggleStar, onEdit, deleteTask, assignTaskToDate, unassignFromDate, setTaskToSchedule, showExecutedTasks, executedTasks, labels, updateTaskLabel, updateTaskTitle, addTask, updateTask, addLabel, deleteLabel, isToday, selectedDate, showUnplannedTasks, allowSelectDate, setLabels }: TaskListProps) {
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
            updateTaskTitle={updateTaskTitle}
            addTask={addTask}
            updateTask={updateTask}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            isToday={isToday}
            selectedDate={selectedDate}
            showUnplannedTasks={showUnplannedTasks}
            allowSelectDate={allowSelectDate}
            setLabels={setLabels}
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
              updateTaskTitle={updateTaskTitle}
              addTask={addTask}
              updateTask={updateTask}
              addLabel={addLabel}
              deleteLabel={deleteLabel}
              isToday={isToday}
              selectedDate={selectedDate}
              showUnplannedTasks={showUnplannedTasks}
              allowSelectDate={allowSelectDate}
              setLabels={setLabels}
            />
          ))}
        </ul>
      )}
    </>
  )
} 