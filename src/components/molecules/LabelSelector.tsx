'use client'

import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/atoms/select"
import { Task } from '@src/lib/types'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { toast } from 'sonner'

type LabelSelectorProps = {
  task: Task;
  labels: string[];
  updateTaskLabel: (taskId: string, newLabel: string) => void;
  close: () => void;
  addLabel: (newLabel: string, taskId?: string) => Promise<void>;
}

const RESERVED_LABELS = ['new', 'none'];

export function LabelSelector({ task, labels, updateTaskLabel, close, addLabel }: LabelSelectorProps) {
  const [isAddingNewLabel, setIsAddingNewLabel] = useState(false)
  const [newLabelValue, setNewLabelValue] = useState('')

  const handleLabelChange = async (newLabel: string) => {
    if (newLabel === 'addNew') {
      setIsAddingNewLabel(true)
    } else {
      updateTaskLabel(task.id, newLabel)
      close()
    }
  }

  const handleAddNewLabel = async () => {
    const trimmedLabel = newLabelValue.trim().toLowerCase()
    if (trimmedLabel === '' || RESERVED_LABELS.includes(trimmedLabel)) {
      toast.error('"new" or "none" is reserved label name.')
      return
    }

    try {
      await addLabel(trimmedLabel, task.id)
      setNewLabelValue('')
      setIsAddingNewLabel(false)
      close()
    } catch (error) {
        throw error
    }
  }

  const handleCancelAddLabel = () => {
    setIsAddingNewLabel(false)
    setNewLabelValue('')
    close()
  }

  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
      {task && !isAddingNewLabel ? (
        <Select 
          value={task.label || 'none'} 
          onValueChange={handleLabelChange}
          onOpenChange={(open) => {
            if (!open) {
              close();
            }
          }}
        >
          <SelectTrigger className="pl-2">
            <SelectValue placeholder="Select Label" />
          </SelectTrigger>
          <SelectContent className="p-1">
            {labels.filter(label => !RESERVED_LABELS.includes(label)).map(label => (
              <SelectItem key={label} value={label} className="px-2">
                <span>{label}</span>
              </SelectItem>
            ))}
            <SelectItem value="none" className="px-2">None</SelectItem>
            <SelectItem value="addNew" className="px-2">+ Add New Label</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <div className="p-1">
          <Input
            value={newLabelValue}
            onChange={(e) => setNewLabelValue(e.target.value)}
            placeholder="Enter new label name"
            className="mb-1"
          />
          <div className="flex space-x-2">
            <Button onClick={handleAddNewLabel}>Save</Button>
            <Button variant="ghost" onClick={handleCancelAddLabel}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  )
} 