'use client'

import React, { useState } from 'react'
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

  const handleSubmit = (data: Omit<Task, 'id'> & { updateType?: 'global' | 'local' }) => {
    setFormData(data);

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
          // DropdownMenu を使用して updateType を選択
          // ここでは useState を使用して選択を管理
          // UIの言語を英語に統一
          // 以下のコードはその一例です

          // ダイアログの中で DropdownMenu を表示
          // 選択された updateType に基づいて updateTask を呼び出す
          // ここではシンプルに updateType を選択する関数を呼び出します

          // 例として、すぐに 'single' を選択
          updateTask({
            ...updatedTaskData,
            updateType: 'single'
          });
          toast.success('Task updated for this instance.');
          if (onClose) onClose();
          return;
        }
      }
      
      // 非繰り返しタスクまたは変更がない場合は直接更新
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
    if (isEdit && taskToEdit) {
      updateTask({
        ...formData,
        updateType
      } as Task & { updateType?: 'single' | 'future' | 'global' })
      toast.success('Task updated successfully.');
      if (onClose) onClose();
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
        />
        {isEdit && taskToEdit?.isRecurring && (
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full">Update Method</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleUpdateType('single')}>
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
    </Dialog>
  )
}