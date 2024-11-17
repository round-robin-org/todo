'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { TaskForm } from './TaskForm'
import { toast } from 'sonner'

type AddTaskDialogProps = {
  labels: string[];
  addTask: (task: Omit<Task, 'id'>) => void;
  isToday: boolean;
  addLabel: (newLabel: string) => void;
}

export function AddTaskDialog({ labels, addTask, isToday, addLabel }: AddTaskDialogProps) {
  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    addTask(taskData)
    toast.success('タスクを追加しました')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" />タスクを追加</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新しいタスクを追加</DialogTitle>
        </DialogHeader>
        <TaskForm 
          labels={labels} 
          onSubmit={handleAddTask} 
          isToday={isToday} 
        />
      </DialogContent>
    </Dialog>
  )
} 