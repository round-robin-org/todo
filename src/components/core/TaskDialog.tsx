'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"
import { Plus } from 'lucide-react'
import { TaskForm } from '@src/components/core/TaskForm'
import { toast } from 'sonner'
import { Task } from '@src/lib/types'

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
  showUnplannedTasks: boolean;
  allowSelectDate?: boolean;
  selectedDate?: Date | null;
  deleteLabel: (label: string) => void;
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
  onClose,
  showUnplannedTasks,
  allowSelectDate = false,
  selectedDate = null,
  deleteLabel,
}: TaskDialogProps) {

  const handleSubmit = (taskData: Omit<Task, 'id'>) => {
    console.log('TaskDialog received data:', taskData); // Debug log
    
    if (isEdit && taskToEdit) {
      updateTask({ ...taskToEdit, ...taskData })
      toast.success('Task updated successfully.')
    } else {
      // Ensure correct field names before sending to addTask
      const formattedData = {
        ...taskData,
        parent_task_id: taskData.parentTaskId || null  // Convert to database column name
      };
      addTask(formattedData)
      toast.success('Task added successfully.')
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
          deleteLabel={deleteLabel}
          selectedDate={selectedDate}
          showUnplannedTasks={showUnplannedTasks}
          allowSelectDate={allowSelectDate}
        />
      </DialogContent>
    </Dialog>
  )
}