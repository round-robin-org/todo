'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@src/components/ui/card"
import { TaskDialog } from '@src/components/core/TaskDialog'
import { Task } from '@src/lib/types'
import { Button } from "@src/components/ui/button"
import { Eye, EyeOff } from 'lucide-react'

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
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
} 

