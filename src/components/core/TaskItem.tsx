'use client'

import React, { useState, useRef } from 'react'
import { Checkbox } from "@src/components/ui/checkbox"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { Star, Trash, CalendarCheck, AlertCircle, Repeat, Calendar, Copy, X } from 'lucide-react'
import { Task } from '@src/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
import { LabelSelector } from '@src/components/core/LabelSelector'
import { useSwipeable } from 'react-swipeable'
import { toast } from 'sonner'

type TaskItemProps = {
  task: Task;
  toggleStatus: (id: string, occurrenceDate?: string) => void;
  toggleStar: (id: string, occurrenceDate?: string) => void;
  onRecurrenceEdit: (task: Task) => void;
  deleteTask: (id: string, type?: 'single' | 'all' | 'future') => void;
  isExecuted?: boolean;
  assignToDate?: (id: string) => void;
  unassignFromDate?: (id: string) => void;
  setTaskToSchedule?: (task: Task & { mode?: 'schedule' | 'copy' } | null) => void;
  labels: string[];
  updateTaskLabel: (taskId: string, newLabel: string) => void;
  updateTaskTitle: (id: string, newTitle: string, updateType?: 'global' | 'single') => void;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task & { updateType?: 'single' | 'future' | 'global' }) => Promise<void>;
  addLabel: (newLabel: string) => Promise<void>;
  deleteLabel: (label: string) => Promise<void>;
  isToday: boolean;
  selectedDate: Date;
  showUnplannedTasks: boolean;
  allowSelectDate: boolean;
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
  disableScheduling?: boolean;
  updateTaskMemo: (id: string, newMemo: string, updateType?: 'global' | 'single') => void;
}

export function TaskItem({ 
  task, 
  toggleStatus, 
  toggleStar, 
  onRecurrenceEdit, 
  deleteTask, 
  isExecuted, 
  assignToDate, 
  unassignFromDate, 
  setTaskToSchedule, 
  labels, 
  updateTaskLabel, 
  updateTaskTitle, 
  addTask, 
  updateTask, 
  addLabel, 
  deleteLabel, 
  isToday, 
  selectedDate, 
  showUnplannedTasks, 
  allowSelectDate, 
  setLabels, 
  disableScheduling = false, 
  updateTaskMemo 
}: TaskItemProps) {
  const [showDelete, setShowDelete] = useState(false)
  const interactionRef = useRef(false)
  const [isLabelSelectorOpen, setIsLabelSelectorOpen] = useState(false)
  const [isEditingMemo, setIsEditingMemo] = useState(false)
  const [editedMemo, setEditedMemo] = useState(task.memo)
  const memoTextareaRef = useRef<HTMLTextAreaElement>(null)

  const cancelSchedulingMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setTaskToSchedule) {
      setTaskToSchedule(null);
      // toast.info('Scheduling or copy mode canceled');
    }
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLabelSelectorOpen(true);
    cancelSchedulingMode(e);
  };
  
  const handleDelete = (e: React.MouseEvent, type?: 'single' | 'all' | 'future') => {
    e.stopPropagation();
    deleteTask(task.id, type);
    setShowDelete(false);
    cancelSchedulingMode(e);
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingTitle(true);
    cancelSchedulingMode(e);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value)
  }

  const handleTitleBlur = () => {
    if (editedTitle.trim() !== task.title) {
      const updateType = task.isRecurring ? 'global' : 'single'
      updateTaskTitle(task.id, editedTitle.trim(), updateType)
    }
    setIsEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.scheduledDate) {
      toggleStatus(task.id, task.occurrenceDate);
    }
    cancelSchedulingMode(e);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStar(task.id, task.occurrenceDate);
    cancelSchedulingMode(e);
  };

  const handleMemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingMemo(true);
    cancelSchedulingMode(e);
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMemo(e.target.value);
  };

  const handleMemoBlur = () => {
    if (editedMemo !== task.memo) {
      updateTaskMemo(task.id, editedMemo, task.occurrenceDate);
    }
    setIsEditingMemo(false);
  };

  const handleMemoKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowDelete(true)
      interactionRef.current = true
    },
    onSwipedRight: () => {
      setShowDelete(false)
      interactionRef.current = true
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  })

  if (task.originalId && task.status === 'deleted') {
    return null;
  }

  const isCopyMode = task.mode === 'copy';
  const isScheduleMode = task.mode === 'schedule';

  return (
    <>
      <li
        {...handlers}
        className={`relative p-2 bg-background rounded-lg shadow cursor-pointer transition-opacity ${isExecuted ? 'opacity-50' : ''} hover:bg-gray-50 flex items-center ${
          task.isScheduling 
            ? 'border-2 border-blue-500 bg-blue-100 text-blue-900 space-x-2'
            : 'border-transparent'
        }`}
      >
        <div className="flex items-center space-x-2 flex-1">
          {task.routine ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                if (!isExecuted && onRecurrenceEdit) {
                  onRecurrenceEdit(task);
                }
                cancelSchedulingMode(e);
              }}
              disabled={isExecuted}
            >
              <Repeat className={`h-4 w-4 ${isExecuted ? 'text-gray-300' : 'text-gray-500'}`} />
            </Button>
          ) : disableScheduling || isExecuted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (setTaskToSchedule) {
                      setTaskToSchedule({ ...task, mode: 'copy' });
                    }
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to date
                </DropdownMenuItem>
                {task.mode && (task.mode === 'copy' || task.mode === 'schedule') && (
                  <DropdownMenuItem onClick={cancelSchedulingMode}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel {task.mode === 'copy' ? 'Copy' : 'Schedule'} Mode
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (setTaskToSchedule) {
                      setTaskToSchedule({ ...task, mode: 'schedule' });
                    }
                  }}
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Schedule
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (setTaskToSchedule) {
                      setTaskToSchedule({ ...task, mode: 'copy' });
                    }
                  }}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to date
                </DropdownMenuItem>
                {task.mode && (task.mode === 'copy' || task.mode === 'schedule') && (
                  <DropdownMenuItem onClick={cancelSchedulingMode}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel {task.mode === 'copy' ? 'Copy' : 'Schedule'} Mode
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExecuted && onRecurrenceEdit) {
                      onRecurrenceEdit(task);
                    }
                  }}
                >
                  <Repeat className="mr-2 h-4 w-4" />
                  Repeat
                </DropdownMenuItem>
                {task.scheduledDate && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      if (unassignFromDate) {
                        unassignFromDate(task.id);
                      }
                    }}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Unschedule
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Checkbox 
            checked={isExecuted ? true : task.status === "executed"}
            onCheckedChange={() => {
              if (task.scheduledDate) {
                toggleStatus(task.id, task.occurrenceDate);
              }
            }}
            onClick={handleCheckboxClick}
            aria-label={`Mark task "${task.title}" as ${task.status === "executed" ? "planned" : "executed"}`}
            className="transition-transform duration-200 ease-in-out transform hover:scale-110 focus:scale-110 rounded-none"
            disabled={!task.scheduledDate}
          />
          <div className="flex flex-col flex-1">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={editedTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                autoFocus
                className="font-semibold bg-transparent border-b border-gray-300 focus:outline-none mb-1"
              />
            ) : (
              <span 
                className={`font-semibold ${isExecuted ? 'line-through' : ''} cursor-pointer mb-1`}
                onClick={handleTitleClick}
              >
                {task.title}
              </span>
            )}
            <div className="mt-1">
              {isEditingMemo ? (
                <textarea
                  ref={memoTextareaRef}
                  value={editedMemo}
                  onChange={handleMemoChange}
                  onBlur={handleMemoBlur}
                  onKeyDown={handleMemoKeyDown}
                  autoFocus
                  rows={2}
                  className="text-sm text-gray-500 bg-transparent border rounded p-1 focus:outline-none focus:border-gray-400 resize-none w-full"
                  placeholder="Add memo..."
                />
              ) : (
                <span 
                  className="text-gray-500 text-sm cursor-pointer"
                  onClick={handleMemoClick}
                >
                  {task.memo || "Add memo..."}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 min-w-fit">
          {task.label ? (
            <Badge onClick={handleLabelClick} className="cursor-pointer">{task.label}</Badge>
          ) : (
            <button onClick={handleLabelClick} className="bg-gray-300 h-4 w-4 rounded"></button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStarClick}
            aria-label={`${task.starred ? "Unstar" : "Star"} task "${task.title}"`}
          >
            <Star className={task.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
          </Button>
          {showDelete && (
            task.routine || task.originalId ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                  <DropdownMenuItem onClick={(e) => handleDelete(e, 'single')}>
                    Delete this task
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleDelete(e, 'future')}>
                    Delete future tasks
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleDelete(e, 'all')}>
                    Delete all recurring tasks
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => handleDelete(e)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )
          )}
        </div>
        {isLabelSelectorOpen && (
          <LabelSelector 
            task={task}
            labels={labels}
            setLabels={setLabels}
            updateTaskLabel={updateTaskLabel}
            close={() => setIsLabelSelectorOpen(false)}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
          />
        )}
      </li>
    </>
  )
}