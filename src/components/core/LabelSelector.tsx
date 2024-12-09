'use client'

import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select"
import { Task } from '@src/lib/types'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type LabelSelectorProps = {
  task: Task;
  labels: string[];
  updateTaskLabel: (taskId: string, newLabel: string) => void;
  close: () => void;
  addLabel: (newLabel: string) => Promise<void>;
  deleteLabel: (label: string) => Promise<void>;
}

export function LabelSelector({ task, labels, updateTaskLabel, close, addLabel, deleteLabel }: LabelSelectorProps) {
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
    const trimmedLabel = newLabelValue.trim()
    if (trimmedLabel !== '') {
      try {
        await addLabel(trimmedLabel)
        updateTaskLabel(task.id, trimmedLabel)
        setNewLabelValue('')
        setIsAddingNewLabel(false)
        close()
      } catch (error) {
        console.error('ラベルの追加に失敗しました:', error)
        // 必要に応じてエラーメッセージを表示
      }
    }
  }

  const handleCancelAddLabel = () => {
    setIsAddingNewLabel(false)
    setNewLabelValue('')
    close()
  }

  return (
    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
      {!isAddingNewLabel ? (
        <Select 
          value={task.label || 'none'} 
          onValueChange={handleLabelChange}
          onOpenChange={(open) => {
            if (!open) {
              close();
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Label" />
          </SelectTrigger>
          <SelectContent>
            {labels.map(label => (
              <SelectItem key={label} value={label}>{label}</SelectItem>
            ))}
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="addNew">+ Add New Label</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <div className="p-2">
          <Input
            value={newLabelValue}
            onChange={(e) => setNewLabelValue(e.target.value)}
            placeholder="新しいラベル名を入力"
            className="mb-2"
          />
          <div className="flex space-x-2">
            <Button onClick={handleAddNewLabel}>保存</Button>
            <Button variant="ghost" onClick={handleCancelAddLabel}>キャンセル</Button>
          </div>
        </div>
      )}
    </div>
  )
} 