'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { AddTaskForm } from './AddTaskForm'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

type AddTaskDialogProps = {
  labels: string[];
  addTask: (memo: string, scheduledDate: string, label: string) => void;
  isToday: boolean;
}

export function AddTaskDialog({ labels, addTask, isToday }: AddTaskDialogProps) {
  const handleAddTask = async (memo: string, scheduledDate: string, label: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            memo,
            scheduled_date: scheduledDate,
            label,
            status: 'pending'
          }
        ])
        .select()

      if (error) throw error

      addTask(memo, scheduledDate, label)
      toast.success('タスクを追加しました')
    } catch (error) {
      toast.error('タスクの追加に失敗しました')
    }
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
        <AddTaskForm 
          labels={labels} 
          addTask={handleAddTask} 
          isToday={isToday} 
          onClose={() => {
            document.activeElement?.blur()
          }} 
        />
      </DialogContent>
    </Dialog>
  )
} 