'use client'

import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Task } from './TaskItem'
import { AddTaskDialog } from './AddTaskDialog'

type CalendarViewProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  addLabel: (newLabel: string) => void;
}

export function CalendarView({ selectedDate, setSelectedDate, tasks, addTask, addLabel }: CalendarViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 現在選択されている日付にタスクを追加するためのダイアログの状態管理
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const handleAddTask = (title: string, memo: string, label: string) => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    addTask({ title, memo, scheduledDate: formattedDate, label, status: 'planned', starred: false })
    setIsAddDialogOpen(false);
  }

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
            <div key={day.toString()} className="relative">
              <Button
                variant="outline"
                className={`h-14 p-1 flex flex-col items-center justify-start w-full ${
                  !isCurrentMonth ? 'opacity-30' : ''
                } ${isToday(day) ? 'border-primary' : ''}`}
                onClick={() => setSelectedDate(day)}
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
                      {/* タスクリストのツールチップ */}
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
                      {/* タスクリストのツールチップ */}
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
              </Button>
            </div>
          )
        })}
      </div>

      {/* タスク追加ダイアログ */}
      {isAddDialogOpen && (
        <AddTaskDialog 
          labels={labels} 
          addTask={handleAddTask} 
          isToday={isToday(day)} 
          addLabel={addLabel}
        />
      )}
    </div>
  )
} 