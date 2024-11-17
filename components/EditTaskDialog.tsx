'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EditTaskForm } from './EditTaskForm'
import { Task } from './TaskItem'

type EditTaskDialogProps = {
  task: Task;
  labels: string[];
  updateTask: (updatedTask: Task) => void;
  onClose: () => void;
}

export function EditTaskDialog({ task, labels, updateTask, onClose }: EditTaskDialogProps) {
  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タスクを編集</DialogTitle>
        </DialogHeader>
        <EditTaskForm 
          task={task} 
          labels={labels} 
          updateTask={updateTask} 
          onClose={onClose} 
        />
      </DialogContent>
    </Dialog>
  )
} 