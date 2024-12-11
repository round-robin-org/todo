'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@src/components/ui/card"
import { LabelManagement } from '@src/components/core/LabelManagement'
import { Task } from '@src/lib/types'
import { Button } from "@src/components/ui/button"
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

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
  editLabel: (oldLabel: string, newLabel: string) => void;
}

export function TabContent({ 
  title, 
  description, 
  children, 
  labels,
  addLabel,
  deleteLabel,
  editLabel,
  showToggleButton = false,
  showExecutedTasks = false,
  toggleExecutedTasks = () => {},
}: TabContentProps) {
  const handleAddLabel = async (newLabel: string) => {
    const trimmedLabel = newLabel.trim().toLowerCase();
    if (trimmedLabel === 'new' || trimmedLabel === 'none') {
      toast.error('"new" or "none" is reserved label name.');
      return;
    }
    addLabel(newLabel);
  };
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
          <LabelManagement 
            labels={labels}
            addLabel={handleAddLabel}
            deleteLabel={deleteLabel}
            editLabel={editLabel}
          />
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
} 

