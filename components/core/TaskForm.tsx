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
  
  const [endsType, setEndsType] = useState<'never' | 'on' | 'after'>(initialTask?.routine?.ends.type || 'never')
  const [intervalUnit, setIntervalUnit] = useState<'day' | 'week' | 'month' | 'year'>(initialTask?.routine?.interval.unit || 'day')
  const [intervalNumber, setIntervalNumber] = useState<number>(initialTask?.routine?.interval.number || 1)
  const [selectedDays, setSelectedDays] = useState<string[]>(initialTask?.routine?.daysOfWeek || [])
  const [monthlyOption, setMonthlyOption] = useState<'date' | 'week'>(initialTask?.routine?.monthlyOption || 'date')
  const [selectedDateOption, setSelectedDateOption] = useState<string>(initialTask?.routine?.selectedDate || 'Day1')
  const [selectedWeek, setSelectedWeek] = useState<string>(initialTask?.routine?.selectedWeek || 'First')
  const [selectedWeekday, setSelectedWeekday] = useState<string>(initialTask?.routine?.selectedWeekday || 'Monday')

  const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日']
  const weeks = ['First', 'Second', 'Third', 'Fourth', 'Last']
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const dates = Array.from({ length: 31 }, (_, i) => `Day${i + 1}`).concat('Last Day')

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

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

    const routine = showRoutine ? {
      interval: {
        number: intervalNumber,
        unit: intervalUnit,
      },
      starts: initialTask?.routine?.starts || format(new Date(), 'yyyy-MM-dd'),
      ends: {
        type: endsType,
        value: endsType === 'on' ? scheduledDate : endsType === 'after' ? intervalNumber : undefined,
      },
      ...(intervalUnit === 'week' && {
        daysOfWeek: selectedDays,
      }),
      ...(intervalUnit === 'month' && {
        monthlyOption,
        selectedDate: selectedDateOption,
        selectedWeek,
        selectedWeekday,
      }),
    } : undefined

    const taskData: Omit<Task, 'id'> = {
      title,
      memo: memo || '',
      scheduledDate: scheduledDate || '',
      label: label || '',
      status: initialTask?.status || 'planned',
      starred: initialTask?.starred || false,
      routine
    }

    onSubmit(taskData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="title">タイトル</Label>
        <Input 
          id="title" 
          name="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="memo">タスク内容</Label>
        <Input 
          id="memo" 
          name="memo" 
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      {!isToday && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="scheduledDate">予定日</Label>
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
        <Label htmlFor="label">ラベル</Label>
        <Select name="label" value={selectedLabel} onValueChange={setSelectedLabel}>
          <SelectTrigger>
            <SelectValue placeholder="ラベルを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">選択なし</SelectItem>
            {labels.map(label => (
              <SelectItem key={label} value={label}>{label}</SelectItem>
            ))}
            <SelectItem value="new">+ 新しいラベルを追加</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedLabel === 'new' && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="newLabel">新しいラベル</Label>
          <Input 
            id="newLabel" 
            name="newLabel" 
            value={newLabel} 
            onChange={(e) => setNewLabel(e.target.value)} 
          />
        </div>
      )}
      <Button type="submit">タスクを{initialTask ? '更新' : '追加'}</Button>
    </form>
  )
}