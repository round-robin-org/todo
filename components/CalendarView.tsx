'use client'

import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Task } from './TaskItem'

type CalendarViewProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  tasks: Task[];
}

export function CalendarView({ selectedDate, setSelectedDate, tasks }: CalendarViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedDate(date => new Date(date.getFullYear(), date.getMonth() - 1, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedDate(date => new Date(date.getFullYear(), date.getMonth() + 1, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-medium text-sm py-1">
            {day}
          </div>
        ))}
        {monthDays.map(day => {
          const formattedDay = format(day, 'yyyy-MM-dd')
          const dayTasks = tasks.filter(task => task.scheduledDate === formattedDay)
          const plannedTasks = dayTasks.filter(task => task.status === "planned")
          const executedTasks = dayTasks.filter(task => task.status === "executed")
          const isCurrentMonth = isSameMonth(day, selectedDate)

          return (
            <Button
              key={day.toString()}
              variant="outline"
              className={`h-14 p-1 flex flex-col items-center justify-start ${
                !isCurrentMonth ? 'opacity-30' : ''
              } ${isToday(day) ? 'border-primary' : ''}`}
              onClick={() => setSelectedDate(day)}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              <div className="flex gap-1 mt-1">
                {plannedTasks.length > 0 && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {plannedTasks.length}
                  </Badge>
                )}
                {executedTasks.length > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {executedTasks.length}
                  </Badge>
                )}
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
} 