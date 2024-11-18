'use client'

import React, { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
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
import { ja, enUS } from 'date-fns/locale'
import { ChartContainer, ChartLegendContent } from "@/components/ui/chart"
import { Task } from '../../lib/types'
import { Button } from "@/components/ui/button"
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
      // Filter tasks based on aggregation period
      if (aggregationPeriod === 'day') {
        filteredTasks = tasks.filter(task => task.scheduledDate === targetDateStr)
      } else if (aggregationPeriod === 'week') {
        const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(label as string)
        if (dayIndex === -1) return null
        const targetDate = addDays(currentRange.start, dayIndex)
        const dateStr = format(targetDate, 'yyyy-MM-dd')
        filteredTasks = tasks.filter(task => task.scheduledDate === dateStr)
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
        const monthMatch = label.match(/(\d+)月/)
        if (!monthMatch) return null
        const month = parseInt(monthMatch[1], 10)
        const monthStartDate = startOfMonth(addMonths(startOfYear(currentRange.start), month - 1))
        const monthEndDate = endOfMonth(monthStartDate)
        filteredTasks = tasks.filter(task =>
          isWithinInterval(new Date(task.scheduledDate), { start: monthStartDate, end: monthEndDate })
        )
      }
    } else if (chartType === 'goal') {
      const goalName = label ? label.trim() : '';
      
      // Exclude empty labels
      if (!goalName) {
        return null;
      }

      if (aggregationPeriod === 'day') {
        filteredTasks = tasks.filter(task =>
          task.label?.trim() === goalName && task.scheduledDate === targetDateStr
        );
      } else {
        filteredTasks = tasks.filter(task =>
          task.label?.trim() === goalName &&
          isWithinInterval(new Date(task.scheduledDate), { start: currentRange.start, end: currentRange.end })
        );
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
        <p className="label font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
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
      // Daily aggregation: Aggregate planned and executed tasks for the pie chart
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
      // Weekly aggregation: Aggregate tasks daily for the area chart
      for (let i = 0; i < 7; i++) {
        const currentDate = addDays(start, i)
        const dateStr = format(currentDate, 'yyyy-MM-dd')
        const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
        const plannedTasks = dayTasks.length
        const executedTasks = dayTasks.filter(t => t.status === 'executed').length

        data.push({
          name: format(currentDate, 'EEE', { locale: enUS }),
          plannedTasks,
          executedTasks,
        })
      }
    } else if (aggregationPeriod === 'month') {
      // Monthly aggregation: Aggregate tasks weekly for the vertical bar chart
      const weeksInMonth: { week: number; plannedTasks: number; executedTasks: number }[] = []
      let currentWeekStart = startOfWeek(start, { locale: ja })
      let weekNumber = 1

      while (currentWeekStart <= end) {
        const currentWeekEnd = endOfWeek(currentWeekStart, { locale: ja })
        const weekTasks = tasks.filter(task =>
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
      // Yearly aggregation: Aggregate tasks monthly for the vertical bar chart
      const monthsInYear: { month: number; plannedTasks: number; executedTasks: number }[] = []
      let currentMonthStart = startOfMonth(start)

      // 年の最初から最後まで1ヶ月ずつ処理
      while (currentMonthStart <= end) {
        const currentMonthEnd = endOfMonth(currentMonthStart)
        const monthTasks = tasks.filter(task =>
          isWithinInterval(new Date(task.scheduledDate), {
            start: currentMonthStart,
            end: currentMonthEnd
          })
        )

        monthsInYear.push({
          month: currentMonthStart.getMonth(), // 0-11の月インデックス
          plannedTasks: monthTasks.length,
          executedTasks: monthTasks.filter(t => t.status === 'executed').length
        })

        currentMonthStart = addMonths(currentMonthStart, 1)
      }

      // データの整形
      data.push(...monthsInYear.map(monthData => ({
        name: format(new Date(start.getFullYear(), monthData.month), 'MMMM'),
        plannedTasks: monthData.plannedTasks,
        executedTasks: monthData.executedTasks
      })))
    }

    setTaskData(data)

    // Modify goal-based data aggregation
    const labelStats: Record<string, { planned: number; executed: number }> = {}

    // Get date string
    const targetDateStr = format(start, 'yyyy-MM-dd')

    tasks.forEach(task => {
      const normalizedLabel = task.label ? task.label.trim() : '';

      // Ensure label exists and is not empty
      if (!normalizedLabel) {
        return; // Exclude tasks without labels
      }

      if (aggregationPeriod === 'day') {
        // For daily aggregation, only consider specific day
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
        // For other periods, aggregate tasks within range
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
        <h3 className="font-semibold">Task Aggregation</h3>
        <div className="flex items-center space-x-2">
          <label htmlFor="aggregationPeriod" className="font-medium">
            Aggregation Period:
          </label>
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
          <Button
            onClick={handlePrevious}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium">{formatRange()}</span>
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
                content={
                  <CustomTooltip
                    tasks={tasks}
                    chartType="task"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                }
              />
              <Legend />
            </PieChart>
          ) : aggregationPeriod === 'week' ? (
            // Weekly aggregation: Area chart
            <AreaChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={
                  <CustomTooltip
                    tasks={tasks}
                    chartType="task"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                }
              />
              <Legend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="plannedTasks"
                stroke={chartConfigTask.plannedTasks.color}
                fill={chartConfigTask.plannedTasks.color}
                name={chartConfigTask.plannedTasks.label}
              />
              <Area
                type="monotone"
                dataKey="executedTasks"
                stroke={chartConfigTask.executedTasks.color}
                fill={chartConfigTask.executedTasks.color}
                name={chartConfigTask.executedTasks.label}
              />
            </AreaChart>
          ) : (
            // Monthly and yearly aggregation: Vertical bar chart
            <BarChart data={taskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={
                  <CustomTooltip
                    tasks={tasks}
                    chartType="task"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                }
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
                content={
                  <CustomTooltip
                    tasks={tasks}
                    chartType="goal"
                    currentRange={currentRange}
                    aggregationPeriod={aggregationPeriod}
                  />
                }
              />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey="planned"
                stackId="a"
                fill={chartConfigGoal.planned.color}
                name={chartConfigGoal.planned.label}
              />
              <Bar
                dataKey="executed"
                stackId="a"
                fill={chartConfigGoal.executed.color}
                name={chartConfigGoal.executed.label}
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
