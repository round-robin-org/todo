'use client'

import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { Button } from "@src/components/atoms/button"
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Badge } from "@src/components/atoms/badge"
import { Task } from '@src/lib/types'

type CalendarViewProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  addLabel: (newLabel: string) => void;
  labels: string[];
  assignTaskToDate: (taskId: string, date: Date) => void;
  unassignTaskFromDate: (taskId: string) => void;
  onUnplannedClick: () => void;
  showUnplannedTasks: boolean;
}

export function CalendarView({ selectedDate, setSelectedDate, tasks, onUnplannedClick, showUnplannedTasks }: CalendarViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startWeekDay = monthStart.getDay();
  
  const blankDays = Array.from({ length: startWeekDay }, (_, i) => i);

  const handleToday = () => {
    setSelectedDate(new Date())
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <Button
          onClick={() => {
            const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
            setSelectedDate(newDate)
          }}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold mx-4">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <Button
          onClick={() => {
            const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
            setSelectedDate(newDate)
          }}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-end items-center mb-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleToday}
          className="flex items-center mr-2"
        >
          <Calendar className="h-4 w-4 mr-1" />
          Today
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onUnplannedClick}
          className={`px-2 py-1 rounded hover:bg-gray-300 flex items-center ${showUnplannedTasks ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          Unplanned
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
        {blankDays.map((_, index) => (
          <div key={`blank-${index}`} className="h-20"></div>
        ))}
        {monthDays.map(day => {
          const formattedDay = format(day, 'yyyy-MM-dd')
          const dayTasks = tasks.filter(task => task.scheduledDate === formattedDay)
          const plannedTasks = dayTasks.filter(task => task.status === "planned")
          const executedTasks = dayTasks.filter(task => task.status === "executed")
          const isCurrentMonth = isSameMonth(day, selectedDate)
          const isSelected = isSameMonth(day, selectedDate) && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')

          return (
            <div key={day.toString()} className="relative">
              <Button
                variant="outline"
                className={`h-20 p-2 flex flex-col items-center justify-start w-full ${
                  !isCurrentMonth ? 'opacity-30' : ''
                } ${isToday(day) ? 'border-primary' : ''} ${isSelected ? 'bg-blue-100 border-blue-500' : ''}`}
                onClick={() => setSelectedDate(day)}
              >
                <span className="text-sm">{format(day, 'd')}</span>
                <div className="flex gap-1 mt-1">
                  {plannedTasks.length > 0 && (
                    <div className="relative group">
                      <Badge
                        variant="secondary"
                        className="badge-planned cursor-pointer"
                      >
                        {plannedTasks.length}
                      </Badge>
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                        <div className="p-2">
                          <h4 className="text-sm font-semibold mb-1">Planned Tasks</h4>
                          <ul className="text-xs">
                            {plannedTasks.map(task => (
                              <li key={task.id}>
                                • {task.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {executedTasks.length > 0 && (
                    <div className="relative group">
                      <Badge
                        variant="secondary"
                        className="badge-executed cursor-pointer"
                      >
                        {executedTasks.length}
                      </Badge>
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                        <div className="p-2">
                          <h4 className="text-sm font-semibold mb-1">Executed Tasks</h4>
                          <ul className="text-xs">
                            {executedTasks.map(task => (
                              <li key={task.id}>
                                • {task.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
} 