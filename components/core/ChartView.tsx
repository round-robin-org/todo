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
import { ja } from 'date-fns/locale'
import { ChartContainer, ChartLegendContent } from "@/components/ui/chart"
import { Task } from '../../lib/types'

// 集計期間の定義
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

// カスタムツールチップのプロパティ型
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
      // 集計期間に応じたフィルタリング
      if (aggregationPeriod === 'day') {
        filteredTasks = tasks.filter(task => task.scheduledDate === targetDateStr)
      } else if (aggregationPeriod === 'week') {
        const dayIndex = ['日', '月', '火', '水', '木', '金', '土'].indexOf(label as string)
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
      
      // ラベルが空の場合は除外
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
          <p className="label font-semibold">タスクなし</p>
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
        // 日単位の場合、開始と終了を同じ日に設定
        const today = new Date()
        start = addDays(today, offset)
        end = addDays(today, offset)
      } else if (period === 'week') {
        // 週単位: 指定された週を表示
        const currentWeekStart = startOfWeek(new Date(), { locale: ja })
        const adjustedWeekStart = addWeeks(currentWeekStart, offset)
        start = adjustedWeekStart
        end = endOfWeek(adjustedWeekStart, { locale: ja })
      } else if (period === 'month') {
        // 月単位: 指定された月を表示（前後の月の日付を含む）
        const currentMonthStart = startOfMonth(new Date())
        const adjustedMonthStart = addMonths(currentMonthStart, offset)
        start = startOfWeek(adjustedMonthStart, { locale: ja }) // 月初を含む週の開始日
        end = endOfWeek(endOfMonth(adjustedMonthStart), { locale: ja }) // 月末を含む週の終了日
      } else if (period === 'year') {
        // 年単位: 指定された年を表示（1月から12月まで）
        const currentYearStart = startOfYear(new Date())
        const adjustedYearStart = addYears(currentYearStart, offset)
        start = startOfMonth(adjustedYearStart) // 年初を含む月の開始日
        end = endOfYear(adjustedYearStart) // 年末を含む月の終了日
      } else {
        // デフォルトは現在の週
        start = startOfWeek(new Date(), { locale: ja })
        end = endOfWeek(start, { locale: ja })
      }

      return { start, end }
    }

    const { start, end } = calculateRange(aggregationPeriod, navigationOffset)
    setCurrentRange({ start, end })

    // データの集計
    const data: TaskData[] = []

    if (aggregationPeriod === 'day') {
      // 日単位: パイチャート用に計画済みタスクと実行済みタスクを集計
      const dateStr = format(start, 'yyyy-MM-dd')
      const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
      const plannedTasks = dayTasks.length
      const executedTasks = dayTasks.filter(t => t.status === 'executed').length
      const remainingTasks = plannedTasks - executedTasks

      data.push(
        { name: '実行済みタスク数', value: executedTasks },
        { name: '未実行タスク数', value: remainingTasks }
      )
    } else if (aggregationPeriod === 'week') {
      // 週単位: エリアチャート用に日別にタスクを集計
      for (let i = 0; i < 7; i++) {
        const currentDate = addDays(start, i)
        const dateStr = format(currentDate, 'yyyy-MM-dd')
        const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
        const plannedTasks = dayTasks.length
        const executedTasks = dayTasks.filter(t => t.status === 'executed').length

        data.push({
          name: format(currentDate, 'E', { locale: ja }),
          plannedTasks,
          executedTasks,
        })
      }
    } else if (aggregationPeriod === 'month') {
      // 月単位: 垂直バーチャート用に週ごとにタスクを集計
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
      // 年単位: 垂直バーチャート用に月ごとにタスクを集計
      const monthsInYear: { month: number; plannedTasks: number; executedTasks: number }[] = []
      let currentMonthStart = startOfMonth(start)
      let monthNumber = 1

      while (currentMonthStart <= end) {
        const currentMonthEnd = endOfMonth(currentMonthStart)
        const monthTasks = tasks.filter(task =>
          isWithinInterval(new Date(task.scheduledDate), { start: currentMonthStart, end: currentMonthEnd })
        )
        const plannedTasks = monthTasks.length
        const executedTasks = monthTasks.filter(t => t.status === 'executed').length

        monthsInYear.push({
          month: monthNumber,
          plannedTasks,
          executedTasks,
        })

        currentMonthStart = addMonths(currentMonthStart, 1)
        monthNumber++
      }

      monthsInYear.forEach(monthData => {
        data.push({
          name: `${monthData.month}月`,
          plannedTasks: monthData.plannedTasks,
          executedTasks: monthData.executedTasks,
        })
      })
    }

    setTaskData(data)

    // 目標別データの集計を修正
    const labelStats: Record<string, { planned: number; executed: number }> = {}

    // 日付文字列を取得
    const targetDateStr = format(start, 'yyyy-MM-dd')

    tasks.forEach(task => {
      const normalizedLabel = task.label ? task.label.trim() : '';

      // ラベルが存在し、空でないことを確認
      if (!normalizedLabel) {
        return; // ラベルがないタスクは除外
      }

      if (aggregationPeriod === 'day') {
        // 日単位の場合は特定の日のみを対象とする
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
        // その他の期間の場合は範囲内のタスクを集計
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

    console.log('Aggregated Goal Data:', goalDataArray) // デバッグ用ログ
    setGoalData(goalDataArray)
  }, [tasks, navigationOffset, aggregationPeriod])

  const chartConfigTask = {
    plannedTasks: {
      label: "予定タスク数",
      color: colorPlanned,
    },
    executedTasks: {
      label: "実行タスク数",
      color: colorExecuted,
    },
  }

  const chartConfigGoal = {
    planned: {
      label: "予定",
      color: colorPlanned,
    },
    executed: {
      label: "実行",
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
    setNavigationOffset(0) // 集計期間が変わったらオフセットをリセット
  }

  const formatRange = () => {
    const { start, end } = currentRange
    return `${format(start, 'yyyy-MM-dd')} - ${format(end, 'yyyy-MM-dd')}`
  }

  return (
    <div>
      {/* 集計期間の選択 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">タスク集計</h3>
        <div className="flex items-center space-x-2">
          <label htmlFor="aggregationPeriod" className="font-medium">
            集計期間:
          </label>
          <select
            id="aggregationPeriod"
            value={aggregationPeriod}
            onChange={handleAggregationPeriodChange}
            className="px-2 py-1 border rounded"
          >
            <option value="day">日</option>
            <option value="week">週</option>
            <option value="month">月</option>
            <option value="year">年</option>
          </select>
        </div>
      </div>

      {/* ナビゲーションと範囲表示 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">タスク完了率</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <span className="font-medium">{formatRange()}</span>
          <button
            onClick={handleNext}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* タスク完了率チャート */}
      <ChartContainer config={chartConfigTask} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {aggregationPeriod === 'day' ? (
            // 日単位: パイチャート
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
            // 週単位: エリアチャート
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
            // 月単位および年単位: 垂直バーチャート
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

      {/* 目標別タスク数チャート */}
      <h3 className="font-semibold mt-8 mb-2">目標別タスク数</h3>
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
            <p className="text-center text-gray-500">目標別タスク数のデータがありません。</p>
          )}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
