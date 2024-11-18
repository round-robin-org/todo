'use client'

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'
import { Task } from '../../lib/types' // `Task` 型をインポート

type TaskItemProps = {
  task: Task;
  toggleStatus: (id: string) => void; // IDをstringに統一
  toggleStar: (id: string) => void;   // IDをstringに統一
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, toggleStatus, toggleStar, onEdit }: TaskItemProps) {
  return (
    <li
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 bg-background rounded-lg shadow cursor-pointer"
      onClick={() => onEdit(task)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
        <Checkbox 
          checked={task.status === "executed"}
          onCheckedChange={() => toggleStatus(task.id)}
          onClick={(e) => e.stopPropagation()}
          aria-label={`タスク "${task.memo}" を${task.status === "executed" ? "予定" : "実行済み"}としてマーク`}
        />
        <div>
          <span className="font-semibold">{task.title}</span>
          <span className="text-gray-500 text-sm block">{task.memo}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-1 sm:mt-0">
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
  )
}