'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Repeat } from 'lucide-react'
import { format } from 'date-fns'
import { Task } from './TaskItem'

type TaskFormProps = {
  initialTask?: Task;
  labels: string[];
  onSubmit: (title: string, memo: string, scheduledDate: string, label: string, routine?: Task['routine']) => void;
  isToday: boolean;
}

export function TaskForm({ initialTask, labels, onSubmit, isToday }: TaskFormProps) {
  const [selectedLabel, setSelectedLabel] = useState(initialTask?.label || '')
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
        // 新しいラベルを追加するロジックは親コンポーネントで行う
      }
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
      memo,
      scheduledDate,
      label,
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
          required 
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
            required 
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
            required 
          />
        </div>
      )}
      <Button type="button" variant="outline" onClick={() => setShowRoutine(!showRoutine)}>
        <Repeat className="mr-2 h-4 w-4" />
        {showRoutine ? 'ルーティンを解除' : 'ルーティンを設定'}
      </Button>

      {showRoutine && (
        <div className="space-y-4 p-4 border rounded-md">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="intervalNumber">毎回の繰り返し</Label>
              <Input
                id="intervalNumber"
                name="intervalNumber"
                type="number"
                min="1"
                value={intervalNumber}
                onChange={(e) => setIntervalNumber(parseInt(e.target.value, 10))}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="intervalUnit">単位</Label>
              <Select
                name="intervalUnit"
                value={intervalUnit}
                onValueChange={(value) => setIntervalUnit(value as 'day' | 'week' | 'month' | 'year')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="単位を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">日</SelectItem>
                  <SelectItem value="week">週</SelectItem>
                  <SelectItem value="month">月</SelectItem>
                  <SelectItem value="year">年</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="starts">開始日</Label>
            <Input
              id="starts"
              name="starts"
              type="date"
              value={format(new Date(), 'yyyy-MM-dd')}
              disabled
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="endsType">終了条件</Label>
            <Select name="endsType" value={endsType} onValueChange={setEndsType}>
              <SelectTrigger>
                <SelectValue placeholder="終了条件を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">終了しない</SelectItem>
                <SelectItem value="on">特定の日に終了</SelectItem>
                <SelectItem value="after">回数後に終了</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {endsType === 'on' && (
            <div className="grid w-full gap-1.5">
              <Label htmlFor="endsOn">終了日</Label>
              <Input
                id="endsOn"
                name="endsOn"
                type="date"
                required={endsType === 'on'}
              />
            </div>
          )}
          {endsType === 'after' && (
            <div className="grid w-full gap-1.5">
              <Label htmlFor="endsAfter">発生回数</Label>
              <Input
                id="endsAfter"
                name="endsAfter"
                type="number"
                min="1"
                required={endsType === 'after'}
                value={endsType === 'after' ? intervalNumber : ''}
                onChange={(e) => setIntervalNumber(parseInt(e.target.value, 10))}
              />
            </div>
          )}
          {intervalUnit === 'week' && (
            <div className="grid w-full gap-1.5">
              <Label>曜日を選択</Label>
              <div className="flex space-x-2 mt-2">
                {daysOfWeek.map(day => (
                  <Button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    variant={selectedDays.includes(day) ? "default" : "outline"}
                    className="w-8 h-8 p-0"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {intervalUnit === 'month' && (
            <div className="grid w-full gap-4">
              <Label>月単位の設定</Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="monthlyOptionDate"
                    name="monthlyOption"
                    value="date"
                    checked={monthlyOption === 'date'}
                    onChange={() => setMonthlyOption('date')}
                    className="form-radio"
                  />
                  <Label htmlFor="monthlyOptionDate">日付で指定</Label>
                </div>
                {monthlyOption === 'date' && (
                  <div className="ml-6">
                    <Select
                      name="selectedDate"
                      value={selectedDateOption}
                      onValueChange={setSelectedDateOption}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="日付を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {dates.map(date => (
                          <SelectItem key={date} value={date}>
                            {date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="monthlyOptionWeek"
                    name="monthlyOption"
                    value="week"
                    checked={monthlyOption === 'week'}
                    onChange={() => setMonthlyOption('week')}
                    className="form-radio"
                  />
                  <Label htmlFor="monthlyOptionWeek">第何週の何曜日で設定</Label>
                </div>
                {monthlyOption === 'week' && (
                  <div className="ml-6 flex space-x-4">
                    <Select
                      name="selectedWeek"
                      value={selectedWeek}
                      onValueChange={setSelectedWeek}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="週を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {weeks.map(week => (
                          <SelectItem key={week} value={week}>
                            {week}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      name="selectedWeekday"
                      value={selectedWeekday}
                      onValueChange={setSelectedWeekday}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="曜日を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {weekdays.map(weekday => (
                          <SelectItem key={weekday} value={weekday}>
                            {weekday}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <Button type="submit">タスクを追加</Button>
    </form>
  )
}