'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select"
import { Checkbox } from "@src/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@src/components/ui/radio-group"
import { format } from 'date-fns'
import { Task } from '../../lib/types'

type TaskFormProps = {
  initialTask?: Task;
  labels: string[];
  onSubmit: (taskData: Omit<Task, 'id'>) => void;
  isToday: boolean;
  addLabel: (newLabel: string) => void;
  selectedDate?: Date;
  showUnplannedTasks: boolean;
}

export function TaskForm({ initialTask, labels, onSubmit, isToday, addLabel, selectedDate, showUnplannedTasks }: TaskFormProps) {
  const [selectedLabel, setSelectedLabel] = useState(initialTask?.label || 'none')
  const [newLabel, setNewLabel] = useState('')
  const [title, setTitle] = useState(initialTask?.title || '')
  const [memo, setMemo] = useState(initialTask?.memo || '')
  const [scheduledDate, setScheduledDate] = useState<string>(
    initialTask?.scheduledDate ||
    (isToday ? format(new Date(), 'yyyy-MM-dd') : 
    selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '')
  )
  const [showRoutine, setShowRoutine] = useState(!!initialTask?.routine)

  // 繰り返しタスクの状態
  const [intervalNumber, setIntervalNumber] = useState(initialTask?.routine?.interval.number || 1)
  const [intervalUnit, setIntervalUnit] = useState(initialTask?.routine?.interval.unit || 'day')
  const [routineStarts, setRoutineStarts] = useState(initialTask?.routine?.starts || format(new Date(), 'yyyy-MM-dd'))
  const [routineEndsType, setRoutineEndsType] = useState(initialTask?.routine?.ends.type || 'never')
  const [routineEndsValue, setRoutineEndsValue] = useState(initialTask?.routine?.ends.value || '')

  // 追加仕様の状態
  // Week Interval
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>(initialTask?.routine?.weekDays || [])

  // Month Interval
  const [monthOption, setMonthOption] = useState<'day' | 'weekday'>('day')
  const [selectedMonthDay, setSelectedMonthDay] = useState<string>(initialTask?.routine?.monthDay || '1')
  const [selectedMonthWeek, setSelectedMonthWeek] = useState<'First' | 'Second' | 'Third' | 'Fourth' | 'Last'>(initialTask?.routine?.monthWeek || 'First')
  const [selectedMonthWeekDay, setSelectedMonthWeekDay] = useState<'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'>(initialTask?.routine?.monthWeekDay || 'Mon')

  useEffect(() => {
    if (showUnplannedTasks) {
      setScheduledDate('')
    } else if (isToday && !initialTask) {
      setScheduledDate(format(new Date(), 'yyyy-MM-dd'))
    } else if (selectedDate && !initialTask) {
      setScheduledDate(format(selectedDate, 'yyyy-MM-dd'))
    }
  }, [isToday, initialTask, selectedDate, showUnplannedTasks])

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

    // 繰り返しタスクデータの構築
    let routine = undefined
    if (showRoutine) {
      routine = {
        interval: {
          number: Number(intervalNumber),
          unit: intervalUnit
        },
        starts: routineStarts,
        ends: {
          type: routineEndsType,
          value: routineEndsType === 'after' ? Number(routineEndsValue) : routineEndsValue
        }
      }

      // 追加仕様の処理
      if (intervalUnit === 'week') {
        routine.weekDays = selectedWeekDays
      } else if (intervalUnit === 'month') {
        routine.monthOption = monthOption
        if (monthOption === 'day') {
          routine.monthDay = selectedMonthDay
        } else if (monthOption === 'weekday') {
          routine.monthWeek = selectedMonthWeek
          routine.monthWeekDay = selectedMonthWeekDay
        }
      }
    }

    onSubmit({
      title,
      memo,
      status: 'planned',
      starred: false,
      scheduledDate: showUnplannedTasks ? null : scheduledDate,
      label: label || 'none',
      routine
    })
  }

  const handleWeekDayChange = (day: string) => {
    setSelectedWeekDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
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
        <textarea
          id="memo"
          name="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
      
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

      <div className="flex items-center space-x-2">
        <Checkbox 
          checked={showRoutine}
          onCheckedChange={() => setShowRoutine(prev => !prev)}
          id="showRoutine"
          aria-label="Toggle Routine"
        />
        <Label htmlFor="showRoutine">Repeat Task</Label>
      </div>

      {showRoutine && (
        <div className="border-t pt-4 space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="intervalNumber">Every</Label>
            <Input 
              id="intervalNumber" 
              name="intervalNumber" 
              type="number" 
              min="1"
              value={intervalNumber}
              onChange={(e) => setIntervalNumber(e.target.value)}
              required 
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="intervalUnit">Unit</Label>
            <Select name="intervalUnit" value={intervalUnit} onValueChange={setIntervalUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day(s)</SelectItem>
                <SelectItem value="week">Week(s)</SelectItem>
                <SelectItem value="month">Month(s)</SelectItem>
                <SelectItem value="year">Year(s)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {intervalUnit === 'week' && (
            <div className="grid w-full gap-1.5">
              <Label>Choose Days</Label>
              <div className="flex space-x-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <label key={day} className="flex items-center space-x-1">
                    <Checkbox 
                      checked={selectedWeekDays.includes(day)}
                      onCheckedChange={() => handleWeekDayChange(day)}
                      aria-label={day}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {intervalUnit === 'month' && (
            <div className="grid w-full gap-1.5">
              <Label>Month Options</Label>
              <RadioGroup value={monthOption} onValueChange={setMonthOption} className="flex space-x-4">
                <label className="flex items-center space-x-1">
                  <RadioGroupItem value="day" />
                  <span>Day</span>
                </label>
                <label className="flex items-center space-x-1">
                  <RadioGroupItem value="weekday" />
                  <span>Weekday</span>
                </label>
              </RadioGroup>

              {monthOption === 'day' && (
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="monthDay">Day of Month</Label>
                  <Select name="monthDay" value={selectedMonthDay} onValueChange={setSelectedMonthDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(31)].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                      ))}
                      <SelectItem value="Last">Last Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {monthOption === 'weekday' && (
                <div className="grid w-full gap-1.5">
                  <Label>Week</Label>
                  <Select name="monthWeek" value={selectedMonthWeek} onValueChange={setSelectedMonthWeek}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First">First</SelectItem>
                      <SelectItem value="Second">Second</SelectItem>
                      <SelectItem value="Third">Third</SelectItem>
                      <SelectItem value="Fourth">Fourth</SelectItem>
                      <SelectItem value="Last">Last</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label>Weekday</Label>
                  <Select name="monthWeekDay" value={selectedMonthWeekDay} onValueChange={setSelectedMonthWeekDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weekday" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sun">Sun</SelectItem>
                      <SelectItem value="Mon">Mon</SelectItem>
                      <SelectItem value="Tue">Tue</SelectItem>
                      <SelectItem value="Wed">Wed</SelectItem>
                      <SelectItem value="Thu">Thu</SelectItem>
                      <SelectItem value="Fri">Fri</SelectItem>
                      <SelectItem value="Sat">Sat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <div className="grid w-full gap-1.5">
            <Label htmlFor="routineStarts">Start Date</Label>
            <Input 
              id="routineStarts" 
              name="routineStarts" 
              type="date" 
              value={routineStarts}
              onChange={(e) => setRoutineStarts(e.target.value)}
              required 
            />
          </div>
          
          <div className="grid w-full gap-1.5">
            <Label htmlFor="routineEnds">Ends</Label>
            <Select name="routineEndsType" value={routineEndsType} onValueChange={setRoutineEndsType}>
              <SelectTrigger>
                <SelectValue placeholder="Select end type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="on">On Date</SelectItem>
                <SelectItem value="after">After Occurrences</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {routineEndsType === 'on' && (
            <div className="grid w-full gap-1.5">
              <Label htmlFor="routineEndsValue">End Date</Label>
              <Input 
                id="routineEndsValue" 
                name="routineEndsValue" 
                type="date" 
                value={routineEndsValue}
                onChange={(e) => setRoutineEndsValue(e.target.value)}
                required 
              />
            </div>
          )}
          {routineEndsType === 'after' && (
            <div className="grid w-full gap-1.5">
              <Label htmlFor="routineEndsValue">Number of Occurrences</Label>
              <Input 
                id="routineEndsValue" 
                name="routineEndsValue" 
                type="number" 
                min="1"
                value={routineEndsValue}
                onChange={(e) => setRoutineEndsValue(e.target.value)}
                required 
              />
            </div>
          )}
        </div>
      )}

      <Button type="submit">{initialTask ? 'Update Task' : 'Add Task'}</Button>
    </form>
  )
}