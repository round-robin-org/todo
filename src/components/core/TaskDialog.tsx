'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"
import { Plus } from 'lucide-react'
import { TaskForm } from '@src/components/core/TaskForm'
import { toast } from 'sonner'
import { Task, Routine } from '@src/lib/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@src/components/ui/dropdown-menu"
import { LabelSelector } from '@src/components/core/LabelSelector'

type TaskDialogProps = {
  labels: string[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  updateTask: (task: Task & { updateType?: 'single' | 'future' | 'global' }) => void;
  addLabel: (newLabel: string) => Promise<void>;
  deleteLabel: (label: string) => Promise<void>;
  updateTaskLabel: (taskId: string, newLabel: string) => void;
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
  updateTaskLabel,
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
          toast.success('タスクが更新されました。');
          if (onClose) onClose();
          return;
        }
      }
      
      updateTask(updatedTaskData);
      toast.success('タスクが正常に更新されました。');
    } else {
      addTask({ ...data, newLabel: data.newLabel });
      toast.success('タスクが正常に追加されました。');
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
            <Plus className="mr-2 h-4 w-4" />タスクを追加
          </Button>
        </DialogTrigger>
      )}
     
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'タスクを編集' : '新しいタスクを追加'}</DialogTitle>
          <DialogDescription>
            {isEdit ? '以下のフォームでタスクの詳細を編集してください。' : '以下のフォームを使用して新しいタスクを追加してください。'}
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
                <Button className="w-full">更新方法を選択</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  onClick={() => handleRecurrenceChange('single')}
                  disabled={isRepeatChanged}
                >
                  このタスクのみ更新
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRecurrenceChange('global')}>
                  全ての繰り返しタスクを更新
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {showConfirm && (
          <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>確認</DialogTitle>
                <DialogDescription>
                  繰り返しルールを変更すると全てのタスクに適用され���過去の例外はクリアされます。続行しますか？
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="ghost" onClick={cancelRecurrenceChange}>キャンセル</Button>
                <Button onClick={applyRecurrenceChange}>適用</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <LabelSelector 
          task={taskToEdit}
          labels={labels}
          updateTaskLabel={updateTaskLabel}
          close={() => {}}
          addLabel={addLabel}
          deleteLabel={deleteLabel}
        />
      </DialogContent>
    </Dialog>
  )
}