'use client'

import React, { useState, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Checkbox } from "@src/components/ui/checkbox"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { Star, Trash } from 'lucide-react'
import { Task } from '@src/lib/types'

type TaskItemProps = {
  task: Task;
  toggleStatus: (id: string) => void;
  toggleStar: (id: string) => void;
  onEdit: (task: Task) => void;
  deleteTask: (id: string) => void;
  isExecuted?: boolean;
  isDragging?: boolean;
}

export function TaskItem({ task, toggleStatus, toggleStar, onEdit, deleteTask, isExecuted, isDragging }: TaskItemProps) {
  const [showDelete, setShowDelete] = useState(false)
  const interactionRef = useRef(false)

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
    trackMouse: true
  })

  const handleClick = () => {
    if (!interactionRef.current) {
      onEdit(task)
    }
    interactionRef.current = false
  }

  return (
    <li
      {...handlers}
      className={`relative flex items-center justify-between p-2 bg-background rounded-lg shadow cursor-pointer transition-transform duration-200 ${
        isDragging ? 'transform scale-50 shadow-2xl bg-gray-200 z-20' : ''
      } ${isExecuted ? 'opacity-50' : ''} hover:bg-gray-50`}
      onClick={handleClick}
      style={{
        zIndex: isDragging ? 20 : 'auto',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
    >
      <div className="flex items-center space-x-2">
        <Checkbox 
          checked={isExecuted ? true : task.status === "executed"}
          onCheckedChange={() => toggleStatus(task.id)}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Mark task "${task.title}" as ${task.status === "executed" ? "planned" : "executed"}`}
          className="transition-transform duration-200 ease-in-out transform hover:scale-110 focus:scale-110 rounded-none"
        />
        <div>
          <span className={`font-semibold ${isExecuted ? 'line-through' : ''}`}>{task.title}</span>
          <span className="text-gray-500 text-sm block">{task.memo}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge>{task.label}</Badge>
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
      </div>
      {showDelete && (
        <Button
          variant="destructive"
          size="sm"
          className="absolute right-2"
          onClick={(e) => {
            e.stopPropagation()
            deleteTask(task.id)
          }}
          aria-label={`Delete task "${task.title}"`}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </li>
  )
}