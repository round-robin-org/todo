'use client'

import React, { useState } from 'react'
import { TaskItem } from '@src/components/core/TaskItem'
import { Task } from '@src/lib/types'
import { Input } from "@src/components/ui/input"
import { Button } from "@src/components/ui/button"
import { toast } from "sonner"
import { format } from 'date-fns'

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
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      toast.error('Please enter a task title');
      return;
    }

    const newTask: Task = {
      id: '',
      title: newTaskTitle,
      memo: '',
      status: 'planned',
      starred: false,
      scheduledDate: isToday ? format(selectedDate, 'yyyy-MM-dd') : null,
      label: null,
      routine: null,
      parentTaskId: null,
      exceptions: {}
    }

    addTask(newTask);
    setNewTaskTitle('');
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }

  const plannedTasks = tasks.filter(task => task.status === "planned")

  return (
    <>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Add a task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleAddTask} className="mt-2">
          Add
        </Button>
      </div>
      <ul>
        {plannedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleStatus={toggleStatus}
            toggleStar={toggleStar}
            onEdit={onEdit}
            deleteTask={deleteTask}
            assignTaskToDate={assignTaskToDate}
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