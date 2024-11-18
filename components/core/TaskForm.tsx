'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from 'date-fns'
import { Task } from '../../lib/types'

type TaskFormProps = {
  initialTask?: Task;
  labels: string[];
  onSubmit: (taskData: Omit<Task, 'id'>) => void;
  isToday: boolean;
  addLabel: (newLabel: string) => void;
}

export function TaskForm({ initialTask, labels, onSubmit, isToday, addLabel }: TaskFormProps) {
  const [selectedLabel, setSelectedLabel] = useState(initialTask?.label || 'none')
  const [newLabel, setNewLabel] = useState('')
  const [title, setTitle] = useState(initialTask?.title || '')
  const [memo, setMemo] = useState(initialTask?.memo || '')
  const [scheduledDate, setScheduledDate] = useState<string>(initialTask?.scheduledDate || (isToday ? format(new Date(), 'yyyy-MM-dd') : ''))
  const [showRoutine, setShowRoutine] = useState(!!initialTask?.routine)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let label = selectedLabel
    if (label === 'new') {
      label = newLabel
      if (label && !labels.includes(label)) {
        addLabel(label)
      }
    } else if (label === 'none') {
      label = undefined
    }

    const taskData: Omit<Task, 'id'> = {
      title,
      memo: memo || '',
      scheduledDate: scheduledDate || '',
      label: label || '',
      status: initialTask?.status || 'planned',
      starred: initialTask?.starred || false,
      routine: showRoutine ? {
        interval: initialTask?.routine?.interval || { number: 1, unit: 'day' },
        starts: initialTask?.routine?.starts || format(new Date(), 'yyyy-MM-dd'),
        ends: initialTask?.routine?.ends || { type: 'never' },
      } : undefined
    }

    onSubmit(taskData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title" 
          name="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="memo">Task Description</Label>
        <Input 
          id="memo" 
          name="memo" 
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      {!isToday && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="scheduledDate">Scheduled Date</Label>
          <Input 
            id="scheduledDate" 
            name="scheduledDate" 
            type="date" 
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </div>
      )}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="label">Label</Label>
        <Select name="label" value={selectedLabel} onValueChange={setSelectedLabel}>
          <SelectTrigger>
            <SelectValue placeholder="Select a label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            {labels.map(label => (
              <SelectItem key={label} value={label}>{label}</SelectItem>
            ))}
            <SelectItem value="new">+ Add New Label</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedLabel === 'new' && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="newLabel">New Label</Label>
          <Input 
            id="newLabel" 
            name="newLabel" 
            value={newLabel} 
            onChange={(e) => setNewLabel(e.target.value)} 
          />
        </div>
      )}
      <Button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</Button>
    </form>
  )
}