'use client'

import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { Button } from "@src/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Badge } from "@src/components/ui/badge"
import { TaskList } from './TaskList'
import { Droppable } from 'react-beautiful-dnd'
import { Task } from '@src/lib/types'

export function CalendarView({
  selectedDate,
  setSelectedDate,
  tasks,
  addTask,
  addLabel,
  labels,
  showBacklog,
  setShowBacklog,
  toggleTaskStatus,
  toggleTaskStar,
  onEdit,
  deleteTask,
  handleDragEnd
}: CalendarViewProps) {
  const monthStart = startOfMonth(selectedDate || new Date());
  const monthEnd = endOfMonth(selectedDate || new Date());
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startWeekDay = monthStart.getDay();
  const blankDays = Array.from({ length: startWeekDay }, (_, i) => i);

  const handleToday = () => {
    setSelectedDate(new Date());
    setShowBacklog(false);
  }

  const handleBacklog = () => {
    setShowBacklog(true);
    setSelectedDate(null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setSelectedDate(prev => {
            if (prev) {
              return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
            }
            return new Date();
          })}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {selectedDate ? format(selectedDate, 'MMMM yyyy') : format(new Date(), 'MMMM yyyy')}
        </h2>
        <Button
          onClick={() => setSelectedDate(prev => {
            if (prev) {
              return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
            }
            return new Date();
          })}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-end mb-4 space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleToday}
          className="px-2 py-1 bg-black text-white rounded hover:bg-gray-800 flex items-center"
        >
          <Calendar className="h-4 w-4 mr-1" />
          Today
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleBacklog}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          Backlog
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blankDays.map((_, index) => (
          <div key={`blank-${index}`} className="h-14"></div>
        ))}
        {monthDays.map(day => {
          const formattedDay = format(day, 'yyyy-MM-dd')
          const dayTasks = tasks.filter(task => task.scheduledDate === formattedDay)
          const plannedTasks = dayTasks.filter(task => task.status === "planned")
          const executedTasks = dayTasks.filter(task => task.status === "executed")
          const isCurrentMonth = isSameMonth(day, selectedDate || new Date())

          return (
            <Droppable key={formattedDay} droppableId={`date-${formattedDay}`}>
              {(provided, snapshot) => (
                <Button
                  variant="outline"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`h-14 p-1 flex flex-col items-center justify-start w-full ${!isCurrentMonth ? 'opacity-30' : ''} ${isToday(day) ? 'border-primary' : ''} ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
                  onClick={() => {
                    setSelectedDate(day)
                    setShowBacklog(false)
                  }}
                >
                  <span className="text-sm">{format(day, 'd')}</span>
                  <div className="flex gap-1 mt-1">
                    {plannedTasks.length > 0 && (
                      <div className="relative group">
                        <Badge
                          variant="secondary"
                          className="badge-planned"
                        >
                          {plannedTasks.length}
                        </Badge>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className="p-2">
                            <h4 className="text-sm font-semibold mb-1">Planned Tasks</h4>
                            <ul className="text-xs">
                              {plannedTasks.map(task => (
                                <li key={task.id} className="">
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
                          className="badge-executed"
                        >
                          {executedTasks.length}
                        </Badge>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className="p-2">
                            <h4 className="text-sm font-semibold mb-1">Executed Tasks</h4>
                            <ul className="text-xs">
                              {executedTasks.map(task => (
                                <li key={task.id} className="">
                                  • {task.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {provided.placeholder}
                </Button>
              )}
            </Droppable>
          )
        })}
      </div>

      <Droppable droppableId="backlog" isDropDisabled={!showBacklog}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {/* バックログの内容 */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}