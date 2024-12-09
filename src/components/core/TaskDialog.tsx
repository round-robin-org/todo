'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"
import { Plus } from 'lucide-react'
import { TaskForm } from '@src/components/core/TaskForm'
import { toast } from 'sonner'
import { Task } from '@src/lib/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@src/components/ui/dropdown-menu"

type TaskDialogProps = {
  labels: string[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  updateTask: (task: Task & { updateType?: 'single' | 'future' | 'global' }) => void;
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

  const [formData, setFormData] = useState<Omit<Task, 'id'> & { updateType?: 'global' | 'local' }>({});
  const [isRepeatChanged, setIsRepeatChanged] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingUpdateType, setPendingUpdateType] = useState<'single' | 'global' | null>(null);
  const [initialRoutine, setInitialRoutine] = useState<Routine | null>(taskToEdit?.routine || null);

  const handleSubmit = (data: Omit<Task, 'id'> & { updateType?: 'global' | 'local' }) => {
    const isRepeatRemoved = taskToEdit?.routine && !data.routine;
    
    setFormData(data);
    setIsRepeatChanged(isRepeatRemoved);

    if (isEdit && taskToEdit) {
      const { updateType, ...taskData } = data;
      
      if (taskData.label === 'new' && data.newLabel) {
        taskData.label = data.newLabel;
      }
      
      const updatedTaskData = {
        ...taskToEdit,
        ...taskData,
        newLabel: data.newLabel,
        parentTaskId: taskToEdit.parentTaskId || taskToEdit.id,
      };

      if (taskToEdit.isRecurring) {
        const hasChanges =
          taskData.title !== taskToEdit.title ||
          taskData.label !== taskToEdit.label ||
          taskData.memo !== taskToEdit.memo ||
          JSON.stringify(taskData.routine) !== JSON.stringify(taskToEdit.routine);

        if (hasChanges) {
          updateTask({
            ...updatedTaskData,
            updateType: 'single'
          });
          toast.success('Task updated.');
          if (onClose) onClose();
          return;
        }
      }
      
      updateTask(updatedTaskData);
      toast.success('Task updated successfully.');
    } else {
      addTask({ ...data, newLabel: data.newLabel });
      toast.success('Task added successfully.');
    }
    
    if (onClose) {
      onClose();
    }
  };

  const handleUpdateType = (updateType: 'single' | 'future' | 'global') => {
    if (isRepeatChanged && updateType === 'single') {
      return;
    }

    if (updateType === 'global' && isRepeatChanged) {
      setPendingUpdateType('global');
      setShowConfirm(true);
    } else {
      updateTask({
        ...formData,
        updateType
      } as Task & { updateType?: 'single' | 'future' | 'global' })
      toast.success('Task updated successfully.');
      if (onClose) onClose();
    }
  }

  const confirmUpdateAll = () => {
    if (pendingUpdateType === 'global') {
      updateTask({
        ...formData,
        updateType: 'global'
      } as Task & { updateType?: 'single' | 'future' | 'global' })
      toast.success('All recurring tasks updated successfully.');
      setShowConfirm(false);
      setPendingUpdateType(null);
      if (onClose) onClose();
    }
  }

  const cancelUpdateAll = () => {
    setShowConfirm(false);
    setPendingUpdateType(null);
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
          <DialogDescription>
            {isEdit ? 'Edit your task details below.' : 'Add a new task using the form below.'}
          </DialogDescription>
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
          isEdit={isEdit}
          onRepeatChange={(changed) => {
            if (taskToEdit?.isRecurring) {
              const currentRoutine = formData.routine;
              const isChanged = JSON.stringify(initialRoutine) !== JSON.stringify(currentRoutine);
              setIsRepeatChanged(isChanged);
            } else {
              setIsRepeatChanged(changed);
            }
          }}
        />
        {isEdit && taskToEdit?.isRecurring && (
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full">Update Method</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  onClick={() => handleUpdateType('single')}
                  disabled={isRepeatChanged}
                >
                  Update This Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateType('global')}>
                  Update All Recurring Tasks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </DialogContent>
      
      {showConfirm && (
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogDescription>
                Are you sure you want to update all recurring tasks? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="ghost" onClick={cancelUpdateAll}>Cancel</Button>
              <Button onClick={confirmUpdateAll}>Apply</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}