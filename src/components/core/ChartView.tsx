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

// Define aggregation periods
type AggregationPeriod = 'day' | 'week' | 'month' | 'year'

interface ChartViewProps {
  tasks: Task[]
}

interface TaskData {
  name: string
  plannedTasks?: number
  executedTasks?: number
  value?: number // For PieChart
}

interface GoalData {
  name: string
  planned: number
  executed: number
}

// Custom tooltip property type
interface CustomTooltipProps {
  active: boolean
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
        const weekMatch = label.match(/W(\d+)/)
        if (!weekMatch) return null
        const weekNumber = parseInt(weekMatch[1], 10)
        const weekStartDate = addWeeks(startOfWeek(currentRange.start, { locale: ja }), weekNumber - 1)
        const weekEndDate = endOfWeek(weekStartDate, { locale: ja })
        filteredTasks = tasks.filter(task =>
          isWithinInterval(new Date(task.scheduledDate), { start: weekStartDate, end: weekEndDate })
        )
      } else if (aggregationPeriod === 'year') {
        const monthIndex = new Date(Date.parse(label + " 1, 2020")).getMonth()
        const monthStartDate = startOfMonth(addMonths(startOfYear(currentRange.start), monthIndex))
        const monthEndDate = endOfMonth(monthStartDate)
        filteredTasks = tasks.filter(task =>
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

export function ChartView({ tasks }: ChartViewProps) {
  const [taskData, setTaskData] = useState<TaskData[]>([])
  const [goalData, setGoalData] = useState<GoalData[]>([])
  const [navigationOffset, setNavigationOffset] = useState<number>(0)
  const [currentRange, setCurrentRange] = useState<{ start: Date; end: Date }>({
    start: startOfWeek(new Date(), { locale: ja }),
    end: endOfWeek(new Date(), { locale: ja }),
  })
  const [aggregationPeriod, setAggregationPeriod] = useState<AggregationPeriod>('week')

  // State for colors
  const [colorExecuted, setColorExecuted] = useState<string>('#8884d8') // Default color
  const [colorPlanned, setColorPlanned] = useState<string>('#82ca9d') // Default color

  // Fetch CSS variable colors on component mount
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

  // Define PIE_COLORS inside the component
  const PIE_COLORS = [colorExecuted, colorPlanned]

  useEffect(() => {
    const calculateRange = (period: AggregationPeriod, offset: number) => {
      let start: Date
      let end: Date

      if (period === 'day') {
        // For daily aggregation, set start and end to the same day
        const today = new Date()
        start = addDays(today, offset)
        end = addDays(today, offset)
      } else if (period === 'week') {
        // For weekly aggregation, display the specified week
        const currentWeekStart = startOfWeek(new Date(), { locale: ja })
        const adjustedWeekStart = addWeeks(currentWeekStart, offset)
        start = adjustedWeekStart
        end = endOfWeek(adjustedWeekStart, { locale: ja })
      } else if (period === 'month') {
        // For monthly aggregation, display the specified month (including dates of previous and next months)
        const currentMonthStart = startOfMonth(new Date())
        const adjustedMonthStart = addMonths(currentMonthStart, offset)
        start = startOfWeek(adjustedMonthStart, { locale: ja }) // Start of the week containing the start of the month
        end = endOfWeek(endOfMonth(adjustedMonthStart), { locale: ja }) // End of the week containing the end of the month
      } else if (period === 'year') {
        // For yearly aggregation, display the entire year (January to December)
        const currentYearStart = startOfYear(new Date())
        const adjustedYearStart = addYears(currentYearStart, offset)
        start = startOfMonth(adjustedYearStart) // Start of the first month of the year
        end = endOfYear(adjustedYearStart) // End of the last month of the year
      } else {
        // Default to the current week
        start = startOfWeek(new Date(), { locale: ja })
        end = endOfWeek(start, { locale: ja })
      }

      return { start, end }
    }

    const { start, end } = calculateRange(aggregationPeriod, navigationOffset)
    setCurrentRange({ start, end })

    // Aggregate data
    const data: TaskData[] = []

    if (aggregationPeriod === 'day') {
      const dateStr = format(start, 'yyyy-MM-dd')
      const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
      const executedTasks = dayTasks.filter(t => t.status === 'executed').length
      const remainingTasks = dayTasks.length - executedTasks

      data.push(
        { name: 'Executed Tasks', value: executedTasks },
        { name: 'Remaining Tasks', value: remainingTasks }
      )
    } else if (aggregationPeriod === 'week') {
      for (let i = 0; i < 7; i++) {
        const currentDate = addDays(start, i)
        const dateStr = format(currentDate, 'yyyy-MM-dd')
        const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
        const executedTasks = dayTasks.filter(t => t.status === 'executed').length
        const remainingTasks = dayTasks.length - executedTasks

        data.push({
          name: dateStr,
          executedTasks,
          remainingTasks,
        })
      }
    } else if (aggregationPeriod === 'month') {
      const weeksInMonth: { week: number; executedTasks: number; remainingTasks: number }[] = []
      let currentWeekStart = startOfWeek(start, { locale: ja })
      let weekNumber = 1

      while (currentWeekStart <= end) {
        const currentWeekEnd = endOfWeek(currentWeekStart, { locale: ja })
        const weekTasks = tasks.filter(task =>
          isWithinInterval(new Date(task.scheduledDate), { start: currentWeekStart, end: currentWeekEnd })
        )
        const executedTasks = weekTasks.filter(t => t.status === 'executed').length
        const remainingTasks = weekTasks.length - executedTasks

        weeksInMonth.push({
          week: weekNumber,
          executedTasks,
          remainingTasks,
        })

        currentWeekStart = addWeeks(currentWeekStart, 1)
        weekNumber++
      }

      weeksInMonth.forEach(weekData => {
        data.push({
          name: `W${weekData.week}`,
          executedTasks: weekData.executedTasks,
          remainingTasks: weekData.remainingTasks,
        })
      })
    } else if (aggregationPeriod === 'year') {
      const monthsInYear: { month: number; executedTasks: number; remainingTasks: number }[] = []
      let currentMonthStart = startOfMonth(start)

      while (currentMonthStart <= end) {
        const currentMonthEnd = endOfMonth(currentMonthStart)
        const monthTasks = tasks.filter(task =>
          isWithinInterval(new Date(task.scheduledDate), {
            start: currentMonthStart,
            end: currentMonthEnd
          })
        )
        const executedTasks = monthTasks.filter(t => t.status === 'executed').length
        const remainingTasks = monthTasks.length - executedTasks

        monthsInYear.push({
          month: currentMonthStart.getMonth(), // 0-11 month index
          executedTasks,
          remainingTasks
        })

        currentMonthStart = addMonths(currentMonthStart, 1)
      }

      data.push(...monthsInYear.map(monthData => ({
        name: format(new Date(start.getFullYear(), monthData.month), 'MMMM'),
        executedTasks: monthData.executedTasks,
        remainingTasks: monthData.remainingTasks
      })))
    }

    setTaskData(data)

    // Adjust goal-based data aggregation similarly
    const labelStats: Record<string, { executed: number; remaining: number }> = {}

    tasks.forEach(task => {
      const normalizedLabel = task.label ? task.label.trim() : ''

      if (!normalizedLabel) return // Exclude tasks without labels

      const taskDate = new Date(task.scheduledDate)
      if (!isWithinInterval(taskDate, { start, end })) return // Exclude tasks outside the range

      if (!labelStats[normalizedLabel]) {
        labelStats[normalizedLabel] = { executed: 0, remaining: 0 }
      }

      if (task.status === 'executed') {
        labelStats[normalizedLabel].executed++
      } else {
        labelStats[normalizedLabel].remaining++
      }
    })

    const goalDataArray: GoalData[] = Object.entries(labelStats).map(([name, stats]) => ({
      name,
      planned: stats.remaining,
      executed: stats.executed,
    }))

    setGoalData(goalDataArray)
  }, [tasks, navigationOffset, aggregationPeriod])

  const chartConfigTask = {
    executedTasks: {
      label: "Executed Tasks",
      color: colorExecuted,
    },
    remainingTasks: {
      label: "Remaining Tasks",
      color: colorPlanned,
    },
  }

  const chartConfigGoal = {
    executed: {
      label: "Executed",
      color: colorExecuted,
    },
    remaining: {
      label: "Remaining",
      color: colorPlanned,
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
    setNavigationOffset(0) // Reset offset when aggregation period changes
  }

  const handleToday = () => {
    setNavigationOffset(0)
  }

  const formatRange = () => {
    const { start, end } = currentRange
    return `${format(start, 'yyyy-MM-dd')} - ${format(end, 'yyyy-MM-dd')}`
  }

  return (
    <div>
      {/* Aggregation period selection */}
      <div className="flex items-center justify-between mb-4">
      </div>

      {/* Navigation and range display */}
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

      {/* Task Execution Rate Chart */}
      <ChartContainer config={chartConfigTask} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {aggregationPeriod === 'day' ? (
            // Daily aggregation: Pie chart
            <PieChart>
              <text
                x="50%"
                y="10%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-semibold"
              >
                {format(currentRange.start, 'yyyy-MM-dd')} {/* Display date */}
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
            // 週次の集計: バーチャートに変更
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
                dataKey="remainingTasks"
                stackId="a"
                fill={chartConfigTask.remainingTasks.color}
                name={chartConfigTask.remainingTasks.label}
              />
              <Bar
                dataKey="executedTasks"
                stackId="a"
                fill={chartConfigTask.executedTasks.color}
                name={chartConfigTask.executedTasks.label}
              />
            </BarChart>
          ) : (
            // Monthly and yearly aggregation: Vertical bar chart
            <BarChart data={taskData}>
              <text
                x="50%"
                y="10%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-semibold"
              >
                {aggregationPeriod === 'month'
                  ? format(currentRange.start, 'MMMM yyyy')
                  : format(currentRange.start, 'yyyy')}
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
                dataKey="remainingTasks"
                stackId="a"
                fill={chartConfigTask.remainingTasks.color}
                name={chartConfigTask.remainingTasks.label}
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

      {/* Goal-based Task Count Chart */}
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
                fill={chartConfigGoal.remaining.color}
                name={chartConfigGoal.remaining.label}
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
