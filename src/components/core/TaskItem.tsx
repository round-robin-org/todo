'use client'

import React, { useState, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Checkbox } from "@src/components/ui/checkbox"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { Star, Trash, CalendarCheck, AlertCircle, Repeat } from 'lucide-react'
import { Task } from '@src/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
import { LabelSelector } from '@src/components/core/LabelSelector'
import { TaskDialog } from '@src/components/core/TaskDialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@src/components/ui/alert-dialog"

type TaskItemProps = {
  task: Task;
  toggleStatus: (id: string) => void;
  toggleStar: (id: string) => void;
  onEdit: (task: Task) => void;
  deleteTask: (id: string, type?: 'single' | 'all' | 'future') => void;
  isExecuted?: boolean;
  assignToDate?: (id: string) => void;
  unassignFromDate?: (id: string) => void;
  setTaskToSchedule?: (task: Task) => void;
  labels: string[];
  updateTaskLabel: (taskId: string, newLabel: string) => void;
  updateTaskTitle: (id: string, newTitle: string, updateType?: 'global' | 'single') => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  addLabel: (newLabel: string) => Promise<void>;
  deleteLabel: (label: string) => Promise<void>;
  isToday: boolean;
  selectedDate: Date;
  showUnplannedTasks: boolean;
  allowSelectDate: boolean;
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
}

export function TaskItem({ task, toggleStatus, toggleStar, onEdit, deleteTask, isExecuted, assignToDate, unassignFromDate, setTaskToSchedule, labels, updateTaskLabel, updateTaskTitle, addTask, updateTask, addLabel, deleteLabel, isToday, selectedDate, showUnplannedTasks, allowSelectDate, setLabels }: TaskItemProps) {
  const [showDelete, setShowDelete] = useState(false)
  const interactionRef = useRef(false)
  const [isLabelSelectorOpen, setIsLabelSelectorOpen] = useState(false)
  const [isRecurrenceDialogOpen, setIsRecurrenceDialogOpen] = useState(false)
  const [showUnscheduleConfirm, setShowUnscheduleConfirm] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowDelete(true)
      interactionRef.current = true
    },
    onSwipedRight: () => {
      setShowDelete(false)
      interactionRef.current = true
    },
    onSwipedUp: () => {
      if (setTaskToSchedule && !task.isRecurring) {
        setTaskToSchedule(task)
      }
      interactionRef.current = true
    },
    onSwipedDown: () => {
      if (!task.isRecurring && unassignFromDate && task.scheduledDate) {
        setShowUnscheduleConfirm(true)
      }
      interactionRef.current = true
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  })

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLabelSelectorOpen(true)
  }

  const closeLabelSelector = () => {
    setIsLabelSelectorOpen(false)
  }

  const handleDelete = (e: React.MouseEvent, type?: 'single' | 'all' | 'future') => {
    e.stopPropagation();
    deleteTask(task.id, type);
    setShowDelete(false);
  };

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditingTitle(true)
  }

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

  const handleRepeatIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRecurrenceDialogOpen(true)
  }

  const handleUnschedule = () => {
    if (unassignFromDate) {
      unassignFromDate(task.id)
    }
    setShowUnscheduleConfirm(false)
  }

  if (task.parentTaskId && task.status === 'deleted') {
    return null;
  }

  return (
    <>
      <AlertDialog open={showUnscheduleConfirm} onOpenChange={setShowUnscheduleConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the scheduled date from this task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowUnscheduleConfirm(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleUnschedule}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <li
        {...handlers}
        className={`relative p-2 bg-background rounded-lg shadow cursor-pointer transition-opacity ${isExecuted ? 'opacity-50' : ''} hover:bg-gray-50 flex items-center ${
          task.isScheduling 
            ? 'border-2 border-blue-500 bg-blue-100 text-blue-900 space-x-2'
            : 'border-transparent'
        }`}
      >
        <div className="flex items-center space-x-2 flex-1">
          <Checkbox 
            checked={isExecuted ? true : task.status === "executed"}
            onCheckedChange={() => toggleStatus(task.id)}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Mark task "${task.title}" as ${task.status === "executed" ? "planned" : "executed"}`}
            className="transition-transform duration-200 ease-in-out transform hover:scale-110 focus:scale-110 rounded-none"
          />
          <div className="flex items-center">
            {task.isScheduling && (
              <CalendarCheck className="mr-2 h-5 w-5 text-blue-500" />
            )}
            {task.isRecurring && (
              <Button variant="ghost" size="icon" onClick={handleRepeatIconClick}>
                <Repeat className="h-4 w-4 text-gray-500" />
              </Button>
            )}
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={editedTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                autoFocus
                className="font-semibold bg-transparent border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <span 
                className={`font-semibold ${isExecuted ? 'line-through' : ''} cursor-pointer`}
                onClick={handleTitleClick}
              >
                {task.title}
              </span>
            )}
          </div>
          <span className="text-gray-500 text-sm block">{task.memo}</span>
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
            onClick={(e) => {
              e.stopPropagation()
              toggleStar(task.id)
            }}
            aria-label={`${task.starred ? "Unstar" : "Star"} task "${task.title}"`}
          >
            <Star className={task.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
          </Button>
          {showDelete && (
            task.routine || task.parentTaskId ? (
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
        <TaskDialog
          open={isRecurrenceDialogOpen}
          onClose={() => setIsRecurrenceDialogOpen(false)}
          isEdit={true}
          taskToEdit={task}
          labels={labels}
          addTask={addTask}
          updateTask={updateTask}
          addLabel={addLabel}
          deleteLabel={deleteLabel}
          isToday={isToday}
          selectedDate={selectedDate}
          showUnplannedTasks={showUnplannedTasks}
          allowSelectDate={allowSelectDate}
          updateTaskLabel={updateTaskLabel}
        />
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