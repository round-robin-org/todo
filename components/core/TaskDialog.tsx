'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { TaskForm } from './TaskForm'
import { toast } from 'sonner'
import { Task } from '../../lib/types'

type TaskDialogProps = {
  labels: string[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  addLabel: (newLabel: string) => void;
  isEdit?: boolean;
  taskToEdit?: Task;
  isToday: boolean;
  open?: boolean;
  onClose?: () => void;
}

export function TaskDialog({ 
  labels, 
  addTask, 
  updateTask, 
  addLabel, 
  isEdit = false, 
  taskToEdit, 
  isToday, 
  open,
  onClose
}: TaskDialogProps) {

  const handleSubmit = (taskData: Omit<Task, 'id'>) => {
    if (isEdit && taskToEdit) {
      const updatedTask: Task = {
        ...taskToEdit,
        ...taskData
      }
      updateTask(updatedTask)
      toast.success('Task updated')
    } else {
      addTask(taskData)
      toast.success('Task added')
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {!isEdit && (
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />Add Task
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <TaskForm 
          initialTask={taskToEdit}
          labels={labels} 
          onSubmit={handleSubmit} 
          isToday={isToday} 
          addLabel={addLabel} 
        />
      </DialogContent>
    </Dialog>
  )
} 