'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@src/components/ui/card"
import { TaskDialog } from '@src/components/core/TaskDialog'
import { Task } from '@src/lib/types'
import { Button } from "@src/components/ui/button"
import { Eye, EyeOff } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@src/components/ui/dialog"
import { Input } from "@src/components/ui/input"
import { Trash2 } from 'lucide-react'

type TabContentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  labels: string[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  addLabel: (newLabel: string) => void;
  deleteLabel: (label: string) => void;
  showToggleButton?: boolean;
  showExecutedTasks?: boolean;
  toggleExecutedTasks?: () => void;
  selectedDate?: Date;
  showUnplannedTasks?: boolean;
  allowSelectDate?: boolean;
  isToday: boolean;
}

export function TabContent({ 
  title, 
  description, 
  children, 
  labels, 
  addTask, 
  addLabel,
  deleteLabel,
  showToggleButton = false,
  showExecutedTasks = false,
  toggleExecutedTasks = () => {},
  selectedDate,
  showUnplannedTasks = false,
  allowSelectDate = false,
  isToday,
}: TabContentProps) {
  const [isManageLabelsOpen, setIsManageLabelsOpen] = useState(false)
  const [newLabel, setNewLabel] = useState('')

  const handleAddLabel = () => {
    if (newLabel.trim() !== '') {
      addLabel(newLabel.trim())
      setNewLabel('')
    }
  }

  const handleDeleteLabel = (label: string) => {
    if (window.confirm(`Are you sure you want to delete the label "${label}"?`)) {
      deleteLabel(label)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="mb-4 md:mb-0">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-500">{description}</CardDescription>
        </div>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          {showToggleButton && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleExecutedTasks} 
              className="flex items-center"
            >
              {showExecutedTasks ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showExecutedTasks ? "Hide Executed Tasks" : "Show Executed Tasks"}
            </Button>
          )}
          <TaskDialog 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            isToday={isToday}
            selectedDate={selectedDate}
            showUnplannedTasks={showUnplannedTasks}
            allowSelectDate={allowSelectDate}
          />
          <Dialog open={isManageLabelsOpen} onOpenChange={setIsManageLabelsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm">
                Manage Labels
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Labels</DialogTitle>
                <DialogDescription>
                  Add or remove labels.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="flex space-x-2">
                  <Input 
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="New label name"
                  />
                  <Button onClick={handleAddLabel}>Add</Button>
                </div>
                <ul className="space-y-2">
                  {labels.map(label => (
                    <li key={label} className="flex items-center justify-between">
                      <span>{label}</span>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteLabel(label)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                  {labels.length === 0 && <li>No labels.</li>}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
} 

