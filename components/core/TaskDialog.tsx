'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, Edit } from 'lucide-react'
import { TaskForm } from './TaskForm'
import { toast } from 'sonner'
import { Task } from '../../lib/types'

type TaskDialogProps = {
  labels: string[];
  addTask?: (task: Omit<Task, 'id'>) => void;
  updateTask?: (updatedTask: Task) => void;
  isEdit?: boolean;
  taskToEdit?: Task;
  isToday: boolean;
  addLabel: (newLabel: string) => void;
  open?: boolean;
  onClose?: () => void;
}

export function TaskDialog({ 
  labels, 
  addTask, 
  updateTask, 
  isEdit = false, 
  taskToEdit, 
  isToday, 
  addLabel,
  open,
  onClose
}: TaskDialogProps) {

  const handleSubmit = (taskData: Omit<Task, 'id'>) => {
    if (isEdit && updateTask && taskToEdit) {
      const updatedTask: Task = { ...taskToEdit, ...taskData }
      updateTask(updatedTask)
      toast.success('タスクを更新しました')
    } else if (addTask) {
      addTask(taskData)
      toast.success('タスクを追加しました')
    }
    if (onClose) {
      onClose()
    }
  }

  if (isEdit) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タスクを編集</DialogTitle>
          </DialogHeader>
          <TaskForm 
            initialTask={taskToEdit}
            labels={labels} 
            onSubmit={handleSubmit} 
            isToday={false} 
            addLabel={addLabel} 
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />タスクを追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新しいタスクを追加</DialogTitle>
        </DialogHeader>
        <TaskForm 
          labels={labels} 
          onSubmit={handleSubmit} 
          isToday={isToday} 
          addLabel={addLabel} 
        />
      </DialogContent>
    </Dialog>
  )
} 