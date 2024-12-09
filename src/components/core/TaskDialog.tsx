'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"
import { Plus } from 'lucide-react'
import { TaskForm } from '@src/components/core/TaskForm'
import { toast } from 'sonner'
import { Task, Routine } from '@src/lib/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@src/components/ui/dropdown-menu"

type TaskDialogProps = {
  labels: string[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  updateTask: (task: Task & { updateType?: 'single' | 'future' | 'global' }) => void;
  addLabel: (newLabel: string) => Promise<void>;
  deleteLabel: (label: string) => Promise<void>;
  isEdit?: boolean;
  taskToEdit?: Task;
  isToday: boolean;
  open?: boolean;
  onClose?: () => void;
  showUnplannedTasks: boolean;
  allowSelectDate?: boolean;
  selectedDate?: Date | null;
  disableScheduling?: boolean;
}

export function TaskDialog({ 
  labels, 
  addTask, 
  updateTask, 
  addLabel, 
  deleteLabel,
  isEdit = false, 
  taskToEdit, 
  isToday, 
  open,
  onClose,
  showUnplannedTasks,
  allowSelectDate = false,
  selectedDate = null,
  disableScheduling = false,
}: TaskDialogProps) {

  const [formData, setFormData] = useState<Omit<Task, 'id'> & { updateType?: 'global' | 'local' }>({});
  const [isRepeatChanged, setIsRepeatChanged] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingUpdateType, setPendingUpdateType] = useState<'single' | 'global' | null>(null);
  const [initialRoutine, setInitialRoutine] = useState<Routine | null>(taskToEdit?.routine || null);

  const [showRecurrenceConfig, setShowRecurrenceConfig] = useState(false);
  const [showRecurrenceForm, setShowRecurrenceForm] = useState(false);

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
          toast.success('Task updated successfully');
          if (onClose) onClose();
          return;
        }
      }
      
      updateTask(updatedTaskData);
      toast.success('Task updated successfully');
    } else {
      addTask({ ...data, newLabel: data.newLabel });
      toast.success('Task added successfully');
    }
    
    if (onClose) {
      onClose();
    }
  };

  // 繰り返しルール変更時のハンドラー
  const handleRecurrenceChange = (newRoutine: Routine) => {
    setFormData(prev => ({
      ...prev,
      routine: newRoutine
    }));
    setShowConfirm(true);
  }

  const applyRecurrenceChange = () => {
    // 例外をクリアし繰り返しルールを更新
    if (formData.routine) {
      formData.routine.ends = undefined // 必要に応じて調整
      // 他のフィールドのクリアやリセット処理
    }
    handleSubmit(formData);
    setShowConfirm(false);
  }

  const cancelRecurrenceChange = () => {
    setShowConfirm(false);
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
            {isEdit ? 'Edit the task details below.' : 'Use the form below to add a new task.'}
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
                <Button className="w-full">Select Update Method</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  onClick={() => handleRecurrenceChange('single')}
                  disabled={isRepeatChanged}
                >
                  Update this task only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRecurrenceChange('global')}>
                  Update all recurring tasks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {showConfirm && (
          <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm</DialogTitle>
                <DialogDescription>
                  Changing the recurrence rule will apply to all tasks and clear past exceptions. Continue?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="ghost" onClick={cancelRecurrenceChange}>Cancel</Button>
                <Button onClick={applyRecurrenceChange}>Apply</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}