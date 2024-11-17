'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { AddTaskForm } from './AddTaskForm'

type AddTaskDialogProps = {
  labels: string[];
  addTask: (memo: string, scheduledDate: string, label: string) => void;
  isToday: boolean;
}

export function AddTaskDialog({ labels, addTask, isToday }: AddTaskDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" />タスクを追加</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新しいタスクを追加</DialogTitle>
        </DialogHeader>
        <AddTaskForm 
          labels={labels} 
          addTask={addTask} 
          isToday={isToday} 
          onClose={() => {
            // ダイアログを閉じる
            document.activeElement?.blur()
          }} 
        />
      </DialogContent>
    </Dialog>
  )
} 