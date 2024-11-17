'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Repeat } from 'lucide-react'
import { format } from 'date-fns'
import { Task } from './TaskItem'

type EditTaskFormProps = {
  task: Task;
  labels: string[];
  updateTask: (updatedTask: Task) => void;
  onClose: () => void;
}

export function EditTaskForm({ task, labels, updateTask, onClose }: EditTaskFormProps) {
  const [endsType, setEndsType] = useState(task.routine?.ends.type || 'never');
  const [showRoutine, setShowRoutine] = useState(!!task.routine);
  const [intervalUnit, setIntervalUnit] = useState(task.routine?.interval.unit || 'day');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [monthlyOption, setMonthlyOption] = useState<'date' | 'week'>('date');
  const [selectedDate, setSelectedDate] = useState<string>('Day1');
  const [selectedWeek, setSelectedWeek] = useState<string>('First');
  const [selectedWeekday, setSelectedWeekday] = useState<string>('Monday');

  const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];
  const weeks = ['First', 'Second', 'Third', 'Fourth', 'Last'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dates = Array.from({ length: 31 }, (_, i) => `Day${i + 1}`).concat('Last Day');

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedTask: Task = {
      ...task,
      memo: formData.get('memo') as string,
      label: formData.get('label') as string,
      scheduledDate: formData.get('scheduledDate') as string,
      routine: showRoutine
        ? {
            interval: {
              number: parseInt(formData.get('intervalNumber') as string, 10),
              unit: intervalUnit as 'day' | 'week' | 'month' | 'year',
            },
            starts: formData.get('starts') as string,
            ends: {
              type: formData.get('endsType') as 'never' | 'on' | 'after',
              value:
                formData.get('endsType') === 'on'
                  ? (formData.get('endsOn') as string)
                  : formData.get('endsType') === 'after'
                  ? parseInt(formData.get('endsAfter') as string, 10)
                  : undefined,
            },
            ...(intervalUnit === 'week' && {
              daysOfWeek: selectedDays,
            }),
            ...(intervalUnit === 'month' && {
              monthlyOption,
              selectedDate,
              selectedWeek,
              selectedWeekday,
            }),
          }
        : undefined,
    };

    updateTask(updatedTask);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="memo">タスク内容</Label>
        <Input id="memo" name="memo" defaultValue={task.memo} required />
      </div>
      <div>
        <Label htmlFor="label">ラベル</Label>
        <Select name="label" defaultValue={task.label}>
          <SelectTrigger>
            <SelectValue placeholder="ラベルを選択" />
          </SelectTrigger>
          <SelectContent>
            {labels.map((label) => (
              <SelectItem key={label} value={label}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="scheduledDate">予定日</Label>
        <Input
          id="scheduledDate"
          name="scheduledDate"
          type="date"
          defaultValue={task.scheduledDate}
          required
        />
      </div>

      {/* ルーティン設定ボタン */}
      <Button type="button" variant="outline" onClick={() => setShowRoutine(!showRoutine)}>
        <Repeat className="mr-2 h-4 w-4" />
        {showRoutine ? 'ルーティンを解除' : 'ルーティンを設定'}
      </Button>

      {/* ルーティン設定フォーム */}
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
                defaultValue={task.routine?.interval.number || 1}
                required
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="intervalUnit">単位</Label>
              <Select
                name="intervalUnit"
                defaultValue={task.routine?.interval.unit || 'day'}
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
          <div>
            <Label htmlFor="starts">開始日</Label>
            <Input
              id="starts"
              name="starts"
              type="date"
              defaultValue={task.routine?.starts || format(new Date(), 'yyyy-MM-dd')}
              required
            />
          </div>
          <div>
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
            <div>
              <Label htmlFor="endsOn">終了日</Label>
              <Input
                id="endsOn"
                name="endsOn"
                type="date"
                defaultValue={task.routine?.ends.type === 'on' ? task.routine.ends.value : ''}
                required={endsType === 'on'}
              />
            </div>
          )}
          {endsType === 'after' && (
            <div>
              <Label htmlFor="endsAfter">発生回数</Label>
              <Input
                id="endsAfter"
                name="endsAfter"
                type="number"
                min="1"
                defaultValue={task.routine?.ends.type === 'after' ? task.routine.ends.value : ''}
                required={endsType === 'after'}
              />
            </div>
          )}

          {/* 単位が週の場合の曜日選択 */}
          {intervalUnit === 'week' && (
            <div>
              <Label>曜日を選択</Label>
              <div className="flex space-x-2 mt-2">
                {daysOfWeek.map((day) => (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-white'
                    } flex items-center justify-center`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 単位が月の場合のオプション選択 */}
          {intervalUnit === 'month' && (
            <div>
              <Label>月単位の設定</Label>
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="monthlyOptionDate"
                    name="monthlyOption"
                    value="date"
                    checked={monthlyOption === 'date'}
                    onChange={() => setMonthlyOption('date')}
                  />
                  <Label htmlFor="monthlyOptionDate">日付で指定</Label>
                </div>
                {monthlyOption === 'date' && (
                  <div className="ml-4 mt-2">
                    <Select
                      name="selectedDate"
                      value={selectedDate}
                      onValueChange={setSelectedDate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="日付を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {dates.map((date) => (
                          <SelectItem key={date} value={date}>
                            {date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="monthlyOptionWeek"
                    name="monthlyOption"
                    value="week"
                    checked={monthlyOption === 'week'}
                    onChange={() => setMonthlyOption('week')}
                  />
                  <Label htmlFor="monthlyOptionWeek">第何週の何曜日で設定</Label>
                </div>
                {monthlyOption === 'week' && (
                  <div className="ml-4 mt-2 flex space-x-4">
                    <Select
                      name="selectedWeek"
                      value={selectedWeek}
                      onValueChange={setSelectedWeek}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="週を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {weeks.map((week) => (
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
                        {weekdays.map((weekday) => (
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

      <Button type="submit">タスクを更新</Button>
    </form>
  )
} 