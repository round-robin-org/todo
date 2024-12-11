'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  format,
  startOfWeek,
  addDays,
  isWithinInterval,
  addWeeks,
  startOfMonth,
  addMonths,
  startOfYear,
  addYears,
  endOfWeek,
  endOfMonth,
  endOfYear,
} from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChartContainer, ChartLegendContent } from "@src/components/ui/chart"
import { Task } from '@src/lib/types'
import { Button } from "@src/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

type AggregationPeriod = 'day' | 'week' | 'month' | 'year'

const calculateChartDateRange = (period: AggregationPeriod, offset: number) => {
  let start: Date
  let end: Date

  if (period === 'day') {
    const today = new Date()
    start = addDays(today, offset)
    end = addDays(today, offset)
  } else if (period === 'week') {
    const currentWeekStart = startOfWeek(new Date(), { locale: ja })
    const adjustedWeekStart = addWeeks(currentWeekStart, offset)
    start = adjustedWeekStart
    end = endOfWeek(adjustedWeekStart, { locale: ja })
  } else if (period === 'month') {
    const currentMonthStart = startOfMonth(new Date())
    const adjustedMonthStart = addMonths(currentMonthStart, offset)
    start = startOfWeek(adjustedMonthStart, { locale: ja })
    end = endOfWeek(endOfMonth(adjustedMonthStart), { locale: ja })
  } else if (period === 'year') {
    const currentYearStart = startOfYear(new Date())
    const adjustedYearStart = addYears(currentYearStart, offset)
    start = startOfMonth(adjustedYearStart)
    end = endOfYear(adjustedYearStart)
  } else {
    start = startOfWeek(new Date(), { locale: ja })
    end = endOfWeek(start, { locale: ja })
  }

  return { start, end }
}

interface ChartViewProps {
  tasks: Task[]
  aggregationPeriod: 'day' | 'week' | 'month' | 'year'
  navigationOffset: number
  setAggregationPeriod: React.Dispatch<React.SetStateAction<'day' | 'week' | 'month' | 'year'>>
  setNavigationOffset: React.Dispatch<React.SetStateAction<number>>
}

interface TaskData {
  name: string
  plannedTasks?: number
  executedTasks?: number
  value?: number
}

interface GoalData {
  name: string
  planned: number
  executed: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: any
  label?: string
  tasks: Task[]
  chartType: 'task' | 'goal'
  currentRange: { start: Date; end: Date }
  aggregationPeriod: AggregationPeriod
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  tasks,
  chartType,
  currentRange,
  aggregationPeriod,
}) => {
  if (active && payload && payload.length && currentRange) {
    let filteredTasks: Task[] = []

    const targetDateStr = format(currentRange.start, 'yyyy-MM-dd')

    if (chartType === 'task') {
      if (aggregationPeriod === 'day') {
        filteredTasks = tasks.filter(task => task.scheduledDate === targetDateStr)
      } else if (aggregationPeriod === 'week') {
        const targetDate = new Date(label as string)
        if (isNaN(targetDate.getTime())) return null
        const dayIndex = targetDate.getDay()
        const specificDateStr = format(addDays(currentRange.start, dayIndex), 'yyyy-MM-dd')
        filteredTasks = tasks.filter(task => task.scheduledDate === specificDateStr)
      } else if (aggregationPeriod === 'month') {
        if (!label) return null;
        const weekMatch = label.match(/W(\d+)/)
        if (!weekMatch) return null
        const weekNumber = parseInt(weekMatch[1], 10)
        const weekStartDate = addWeeks(startOfWeek(currentRange.start, { locale: ja }), weekNumber - 1)
        const weekEndDate = endOfWeek(weekStartDate, { locale: ja })
        filteredTasks = tasks.filter(task =>
          task.scheduledDate &&
          isWithinInterval(new Date(task.scheduledDate), { start: weekStartDate, end: weekEndDate })
        )
      } else if (aggregationPeriod === 'year') {
        const monthIndex = new Date(Date.parse(label + " 1, 2020")).getMonth()
        const monthStartDate = startOfMonth(addMonths(startOfYear(currentRange.start), monthIndex))
        const monthEndDate = endOfMonth(monthStartDate)
        filteredTasks = tasks.filter(task =>
          task.scheduledDate &&
          isWithinInterval(new Date(task.scheduledDate), { start: monthStartDate, end: monthEndDate })
        )
      }
    } else if (chartType === 'goal') {
      const goalName = label ? label.trim() : ''

      if (!goalName) {
        return null
      }

      if (aggregationPeriod === 'day') {
        filteredTasks = tasks.filter(task =>
          task.label?.trim() === goalName && task.scheduledDate === targetDateStr
        )
      } else {
        filteredTasks = tasks.filter(task =>
          task.label?.trim() === goalName &&
          task.scheduledDate &&
          isWithinInterval(new Date(task.scheduledDate), { start: currentRange.start, end: currentRange.end })
        )
      }
    }

    if (filteredTasks.length === 0) {
      return (
        <div className="custom-tooltip bg-white border border-gray-200 p-2 rounded shadow-lg">
          <p className="label font-semibold">No tasks</p>
        </div>
      )
    }

    return (
      <div className="custom-tooltip bg-white border border-gray-200 p-2 rounded shadow-lg">
        {aggregationPeriod === 'week' ? (
          <>
            {payload.map((p: any, index: number) => (
              <p key={index} className="label font-semibold">{`${p.name}: ${p.value}`}</p>
            ))}
          </>
        ) : (
          <p className="label font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
        )}
        <ul className="mt-1 text-xs max-h-40 overflow-y-auto">
          {filteredTasks.map(task => (
            <li key={task.id} className="flex items-center">
              {task.status === 'executed' ? (
                <span className="mr-1 text-green-500">✔️</span>
              ) : (
                <span className="mr-1 text-gray-500">•</span>
              )}
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}

const calculateMidDate = (start: Date, end: Date): Date => {
  return new Date((start.getTime() + end.getTime()) / 2)
}

export function ChartView({ 
  tasks, 
  aggregationPeriod, 
  navigationOffset, 
  setAggregationPeriod, 
  setNavigationOffset 
}: ChartViewProps) {
  const [taskData, setTaskData] = useState<TaskData[]>([])
  const [goalData, setGoalData] = useState<GoalData[]>([])
  const [currentRange, setCurrentRange] = useState<{ start: Date; end: Date }>({
    start: startOfWeek(new Date(), { locale: ja }),
    end: endOfWeek(new Date(), { locale: ja }),
  })

  const [colorExecuted, setColorExecuted] = useState<string>('#8884d8')
  const [colorPlanned, setColorPlanned] = useState<string>('#82ca9d')

  useEffect(() => {
    const root = document.documentElement
    const executed = getComputedStyle(root).getPropertyValue('--color-executed').trim()
    const planned = getComputedStyle(root).getPropertyValue('--color-planned').trim()
    if (executed) {
      setColorExecuted(`hsl(${executed})`)
    }
    if (planned) {
      setColorPlanned(`hsl(${planned})`)
    }
  }, [])

  const PIE_COLORS = [colorExecuted, colorPlanned]

  useEffect(() => {
    const { start, end } = calculateChartDateRange(aggregationPeriod, navigationOffset)
    setCurrentRange({ start, end })

    const data: TaskData[] = []

    if (aggregationPeriod === 'day') {
      const dateStr = format(start, 'yyyy-MM-dd')
      const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
      const plannedTasks = dayTasks.length
      const executedTasks = dayTasks.filter(t => t.status === 'executed').length
      const remainingTasks = plannedTasks - executedTasks

      data.push(
        { name: 'Executed Tasks', value: executedTasks },
        { name: 'Remaining Tasks', value: remainingTasks }
      )
    } else if (aggregationPeriod === 'week') {
      for (let i = 0; i < 7; i++) {
        const currentDate = addDays(start, i)
        const dateStr = format(currentDate, 'yyyy-MM-dd')
        const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
        const plannedTasks = dayTasks.length
        const executedTasks = dayTasks.filter(t => t.status === 'executed').length

        data.push({
          name: dateStr,
          plannedTasks,
          executedTasks,
        })
      }
    } else if (aggregationPeriod === 'month') {
      const weeksInMonth: { week: number; plannedTasks: number; executedTasks: number }[] = []
      let currentWeekStart = startOfWeek(start, { locale: ja })
      let weekNumber = 1

      while (currentWeekStart <= end) {
        const currentWeekEnd = endOfWeek(currentWeekStart, { locale: ja })
        const weekTasks = tasks.filter(task =>
          task.scheduledDate &&
          isWithinInterval(new Date(task.scheduledDate), { start: currentWeekStart, end: currentWeekEnd })
        )
        const plannedTasks = weekTasks.length
        const executedTasks = weekTasks.filter(t => t.status === 'executed').length

        weeksInMonth.push({
          week: weekNumber,
          plannedTasks,
          executedTasks,
        })

        currentWeekStart = addWeeks(currentWeekStart, 1)
        weekNumber++
      }

      weeksInMonth.forEach(weekData => {
        data.push({
          name: `W${weekData.week}`,
          plannedTasks: weekData.plannedTasks,
          executedTasks: weekData.executedTasks,
        })
      })
    } else if (aggregationPeriod === 'year') {
      const monthsInYear: { month: number; plannedTasks: number; executedTasks: number }[] = []
      let currentMonthStart = startOfMonth(start)

      while (currentMonthStart <= end) {
        const currentMonthEnd = endOfMonth(currentMonthStart)
        const monthTasks = tasks.filter(task =>
          task.scheduledDate &&
          isWithinInterval(new Date(task.scheduledDate), {
            start: currentMonthStart,
            end: currentMonthEnd
          })
        )

        monthsInYear.push({
          month: currentMonthStart.getMonth(),
          plannedTasks: monthTasks.length,
          executedTasks: monthTasks.filter(t => t.status === 'executed').length
        })

        currentMonthStart = addMonths(currentMonthStart, 1)
      }

      data.push(...monthsInYear.map(monthData => ({
        name: format(new Date(start.getFullYear(), monthData.month), 'MMMM'),
        plannedTasks: monthData.plannedTasks,
        executedTasks: monthData.executedTasks
      })))
    }

    setTaskData(data)

    const labelStats: Record<string, { planned: number; executed: number }> = {}

    const targetDateStr = format(start, 'yyyy-MM-dd')

    tasks.forEach(task => {
      const normalizedLabel = task.label ? task.label.trim() : '';

      if (!normalizedLabel) {
        return;
      }

      if (aggregationPeriod === 'day') {
        if (task.scheduledDate === targetDateStr) {
          if (!labelStats[normalizedLabel]) {
            labelStats[normalizedLabel] = { planned: 0, executed: 0 };
          }
          labelStats[normalizedLabel].planned++;
          if (task.status === 'executed') {
            labelStats[normalizedLabel].executed++;
          }
        }
      } else {
        if (!task.scheduledDate) return;
        const taskDate = new Date(task.scheduledDate);
        if (isWithinInterval(taskDate, { start, end })) {
          if (!labelStats[normalizedLabel]) {
            labelStats[normalizedLabel] = { planned: 0, executed: 0 };
          }
          labelStats[normalizedLabel].planned++;
          if (task.status === 'executed') {
            labelStats[normalizedLabel].executed++;
          }
        }
      }
    });

    const goalDataArray: GoalData[] = Object.entries(labelStats).map(([name, stats]) => ({
      name,
      ...stats,
    }))

    console.log('Aggregated Goal Data:', goalDataArray) // Debug log
    setGoalData(goalDataArray)
  }, [tasks, navigationOffset, aggregationPeriod])

  const chartConfigTask = {
    plannedTasks: {
      label: "Planned Tasks",
      color: colorPlanned,
    },
    executedTasks: {
      label: "Executed Tasks",
      color: colorExecuted,
    },
  }

  const chartConfigGoal = {
    planned: {
      label: "Planned",
      color: colorPlanned,
    },
    executed: {
      label: "Executed",
      color: colorExecuted,
    },
  }

  const handlePrevious = () => {
    setNavigationOffset(prev => prev - 1)
  }

  const handleNext = () => {
    setNavigationOffset(prev => prev + 1)
  }

  const handleAggregationPeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPeriod = e.target.value as AggregationPeriod
    setAggregationPeriod(selectedPeriod)
    setNavigationOffset(0)
  }

  const handleToday = () => {
    setNavigationOffset(0)
  }

  const formatRange = () => {
    const { start, end } = currentRange
    return `${format(start, 'yyyy-MM-dd')} - ${format(end, 'yyyy-MM-dd')}`
  }

  const midDate = calculateMidDate(currentRange.start, currentRange.end)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
      </div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Task Execution Rate</h3>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleToday}
            className="px-2 py-1 bg-black text-white rounded hover:bg-gray-800 flex items-center"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Today
          </Button>
          <div className="flex items-center space-x-2">
            <select
              id="aggregationPeriod"
              value={aggregationPeriod}
              onChange={handleAggregationPeriodChange}
              className="px-2 py-1 border rounded"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <Button
            onClick={handlePrevious}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ChartContainer config={chartConfigTask} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {aggregationPeriod === 'day' ? (
            <PieChart>
              <text
                x="50%"
                y="10%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-semibold"
              >
                {format(currentRange.start, 'yyyy-MM-dd')}
              </text>
              <Pie
                data={taskData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={colorPlanned}
                label
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    tasks={tasks}
                    chartType="task"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                )}
              />
              <Legend />
            </PieChart>
          ) : aggregationPeriod === 'week' ? (
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    tasks={tasks}
                    chartType="task"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                )}
              />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="plannedTasks"
                stackId="a"
                fill={chartConfigTask.plannedTasks.color}
                name={chartConfigTask.plannedTasks.label}
              />
              <Bar
                dataKey="executedTasks"
                stackId="a"
                fill={chartConfigTask.executedTasks.color}
                name={chartConfigTask.executedTasks.label}
              />
            </BarChart>
          ) : (
            <BarChart data={taskData}>
              <text
                x="50%"
                y="10%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-semibold"
              >
                {aggregationPeriod === 'month'
                  ? format(midDate, 'MMMM yyyy')
                  : format(midDate, 'yyyy')}
              </text>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    tasks={tasks}
                    chartType="task"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                )}
              />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="plannedTasks"
                stackId="a"
                fill={chartConfigTask.plannedTasks.color}
                name={chartConfigTask.plannedTasks.label}
              />
              <Bar
                dataKey="executedTasks"
                stackId="a"
                fill={chartConfigTask.executedTasks.color}
                name={chartConfigTask.executedTasks.label}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </ChartContainer>

      <h3 className="font-semibold mt-8 mb-2">Goal-based Task Count</h3>
      <ChartContainer config={chartConfigGoal} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {goalData.length > 0 ? (
            <BarChart layout="vertical" data={goalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip
                content={({ active, payload, label }) => (
                  <CustomTooltip
                    active={active}
                    payload={payload}
                    label={label}
                    tasks={tasks}
                    chartType="goal"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                )}
              />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="executed"
                stackId="a"
                fill={chartConfigGoal.executed.color}
                name={chartConfigGoal.executed.label}
              />
              <Bar
                dataKey="planned"
                stackId="a"
                fill={chartConfigGoal.planned.color}
                name={chartConfigGoal.planned.label}
              />
            </BarChart>
          ) : (
            <p className="text-center text-gray-500">No data available for goal-based task count.</p>
          )}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
