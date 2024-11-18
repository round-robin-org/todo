import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TaskDialog } from './TaskDialog'
import { Task } from '../../lib/types'

type TabContentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  labels: string[];
  addTask: (taskData: Omit<Task, 'id'>) => void;
  addLabel: (newLabel: string) => void;
}

export function TabContent({ title, description, children, labels, addTask, addLabel }: TabContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title}
          <TaskDialog 
            labels={labels}
            addTask={addTask} 
            isToday={false} 
            addLabel={addLabel} 
          />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
} 