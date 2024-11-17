'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type AddTaskFormProps = {
  labels: string[];
  addTask: (memo: string, scheduledDate: string, label: string) => void;
  isToday: boolean;
  onClose: () => void;
}

export function AddTaskForm({ labels, addTask, isToday, onClose }: AddTaskFormProps) {
  const [selectedLabel, setSelectedLabel] = useState('')
  const [newLabel, setNewLabel] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const memo = formData.get('memo') as string
    const scheduledDate = isToday ? new Date().toISOString().split('T')[0] : (formData.get('scheduledDate') as string)
    let label = formData.get('label') as string

    if (label === 'new') {
      label = formData.get('newLabel') as string
      if (label && !labels.includes(label)) {
        // 親コンポーネントでラベルの追加を処理する必要があります
        // 簡略化のため、外部でラベルが管理されていると仮定します
      }
    }

    addTask(memo, scheduledDate, label)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="memo">タスク内容</Label>
        <Input id="memo" name="memo" required />
      </div>
      {!isToday && (
        <div>
          <Label htmlFor="scheduledDate">予定日</Label>
          <Input id="scheduledDate" name="scheduledDate" type="date" required />
        </div>
      )}
      <div>
        <Label htmlFor="label">ラベル</Label>
        <Select name="label" value={selectedLabel} onValueChange={setSelectedLabel}>
          <SelectTrigger>
            <SelectValue placeholder="ラベルを選択" />
          </SelectTrigger>
          <SelectContent>
            {labels.map((label) => (
              <SelectItem key={label} value={label}>{label}</SelectItem>
            ))}
            <SelectItem value="new">+ 新しいラベルを追加</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedLabel === 'new' && (
        <div>
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
      <Button type="submit">タスクを追加</Button>
    </form>
  )
} 