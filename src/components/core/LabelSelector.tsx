'use client'

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select"
import { Task } from '@src/lib/types'

type LabelSelectorProps = {
  task: Task;
  labels: string[];
  updateTaskLabel: (taskId: string, newLabel: string) => void;
  close: () => void;
}

export function LabelSelector({ task, labels, updateTaskLabel, close }: LabelSelectorProps) {
  const handleLabelChange = (newLabel: string) => {
    updateTaskLabel(task.id, newLabel)
    close()
  }

  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
      <Select value={task.label || 'none'} onValueChange={handleLabelChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Label" />
        </SelectTrigger>
        <SelectContent>
          {labels.map(label => (
            <SelectItem key={label} value={label}>{label}</SelectItem>
          ))}
          <SelectItem value="none">None</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 