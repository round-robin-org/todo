'use client'

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import { Task } from './TaskItem'

type ExecutedTasksProps = {
  tasks: Task[];
  toggleStatus: (id: number) => void;
  toggleStar: (id: number) => void;
  onEdit: (task: Task) => void;
}

export function ExecutedTasks({ tasks, toggleStatus, toggleStar, onEdit }: ExecutedTasksProps) {
  const executedTasks = tasks.filter(task => task.status === "executed")
  
  if (executedTasks.length === 0) return null;

  return (
    <ul className="space-y-2 mt-4">
      {executedTasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between p-2 bg-background rounded-lg shadow cursor-pointer opacity-50"
          onClick={() => onEdit(task)}
        >
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={true}
              onCheckedChange={() => toggleStatus(task.id)}
              onClick={(e) => e.stopPropagation()}
              aria-label={`タスク "${task.memo}" を予定としてマーク`}
            />
            <span className="line-through">{task.memo}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge>{task.label}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toggleStar(task.id);
              }}
              aria-label={`${task.starred ? "スターを外す" : "スターを付ける"} タスク "${task.memo}"`}
            >
              <Star className={task.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
} 