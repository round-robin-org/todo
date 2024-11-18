'use client'

import React, { useEffect, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, TooltipProps } from 'recharts'
import { format, startOfWeek, addDays, isWithinInterval, addWeeks } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChartContainer, ChartLegendContent } from "@/components/ui/chart"
import { Task } from './Task'

interface ChartViewProps {
  tasks: Task[]
}

interface WeeklyTaskData {
  name: string
  plannedTasks: number
  executedTasks: number
}

interface GoalData {
  name: string
  planned: number
  executed: number
}

// カスタムツールチップのプロパティ型
interface CustomTooltipProps extends TooltipProps<number, string> {
  tasks: Task[]
  chartType: 'weekly' | 'goal'
  weekRange: { weekStart: Date; weekEnd: Date }
}

// カスタムツールチップコンポーネント
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, tasks, chartType, weekRange }) => {
  if (active && payload && payload.length && weekRange) {
    const dataKey = payload[0].dataKey as string

    let filteredTasks: Task[] = []

    if (chartType === 'weekly') {
      // ツールチップのラベルから該当する日付を特定
      const dayIndex = ['日', '月', '火', '水', '木', '金', '土'].indexOf(label as string)
      if (dayIndex === -1) {
        return null
      }
      const targetDate = addDays(weekRange.weekStart, dayIndex)
      const dateStr = format(targetDate, 'yyyy-MM-dd')

      // 週間チャートの場合は特定の日付でフィルタリング
      filteredTasks = tasks.filter(task => task.scheduledDate === dateStr)
    } else if (chartType === 'goal') {
      const goalName = label as string
      // 目標別チャートの場合はラベルと対象期間でフィルタリング
      filteredTasks = tasks.filter(task => 
        task.label === goalName &&
        isWithinInterval(new Date(task.scheduledDate), { start: weekRange.weekStart, end: weekRange.weekEnd })
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
  const [weeklyTaskData, setWeeklyTaskData] = useState<WeeklyTaskData[]>([])
  const [goalData, setGoalData] = useState<GoalData[]>([])
  const [weekOffset, setWeekOffset] = useState<number>(0)
  const [weekRange, setWeekRange] = useState<{ weekStart: Date; weekEnd: Date }>({
    weekStart: startOfWeek(new Date(), { locale: ja }),
    weekEnd: addDays(startOfWeek(new Date(), { locale: ja }), 6)
  })

  useEffect(() => {
    const calculateWeekRange = (offset: number) => {
      const currentWeekStart = startOfWeek(new Date(), { locale: ja })
      const adjustedWeekStart = addWeeks(currentWeekStart, offset)
      const adjustedWeekEnd = addDays(adjustedWeekStart, 6)
      return { weekStart: adjustedWeekStart, weekEnd: adjustedWeekEnd }
    }

    const { weekStart, weekEnd } = calculateWeekRange(weekOffset)
    setWeekRange({ weekStart, weekEnd })

    const data: WeeklyTaskData[] = []

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(weekStart, i)
      const dateStr = format(currentDate, 'yyyy-MM-dd')

      const dayTasks = tasks.filter(task => task.scheduledDate === dateStr)
      const plannedTasks = dayTasks.length
      const executedTasks = dayTasks.filter(t => t.status === 'executed').length

      data.push({
        name: format(currentDate, 'E', { locale: ja }),
        plannedTasks,
        executedTasks
      })
    }

    setWeeklyTaskData(data)

    // Calculate Goal Data based on the new week range
    const labelStats: Record<string, { planned: number; executed: number }> = {}

    tasks.forEach(task => {
      const taskDate = new Date(task.scheduledDate)
      if (isWithinInterval(taskDate, { start: weekStart, end: weekEnd })) {
        if (!task.label) return
        if (!labelStats[task.label]) {
          labelStats[task.label] = { planned: 0, executed: 0 }
        }
        labelStats[task.label].planned++
        if (task.status === 'executed') {
          labelStats[task.label].executed++
        }
      }
    })

    const goalDataArray: GoalData[] = Object.entries(labelStats).map(([name, stats]) => ({
      name,
      ...stats
    }))

    setGoalData(goalDataArray)
  }, [tasks, weekOffset])

  const chartConfigWeekly = {
    plannedTasks: {
      label: "予定タスク数",
      color: "hsl(var(--color-planned))",
    },
    executedTasks: {
      label: "実行タスク数",
      color: "hsl(var(--color-executed))",
    },
  }

  const chartConfigGoal = {
    planned: {
      label: "予定",
      color: "hsl(var(--color-planned))",
    },
    executed: {
      label: "実行",
      color: "hsl(var(--color-executed))",
    },
  }

  const handlePreviousWeek = () => {
    setWeekOffset(prev => prev - 1)
  }

  const handleNextWeek = () => {
    setWeekOffset(prev => prev + 1)
  }

  const formattedWeekRange = `${format(weekRange.weekStart, 'yyyy-MM-dd')} - ${format(weekRange.weekEnd, 'yyyy-MM-dd')}`

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">週間タスク完了率</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handlePreviousWeek} 
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <span className="font-medium">{formattedWeekRange}</span>
          <button 
            onClick={handleNextWeek} 
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      <ChartContainer config={chartConfigWeekly} className="min-h-[300px] w-full">
        <AreaChart data={weeklyTaskData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip tasks={tasks} chartType="weekly" weekRange={weekRange} />} />
          <Legend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="plannedTasks"
            stroke="var(--badge-planned-bg)"
            fill="var(--badge-planned-bg)"
            name="予定タスク数"
          />
          <Area
            type="monotone"
            dataKey="executedTasks"
            stroke="var(--badge-executed-bg)"
            fill="var(--badge-executed-bg)"
            name="実行タスク数"
          />
        </AreaChart>
      </ChartContainer>
      <h3 className="font-semibold mt-8 mb-2">目標別タスク数</h3>
      <ChartContainer config={chartConfigGoal} className="min-h-[300px] w-full">
        <BarChart layout="vertical" data={goalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip content={<CustomTooltip tasks={tasks} chartType="goal" weekRange={weekRange} />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="planned" stackId="a" fill="var(--badge-planned-bg)" name="予定" />
          <Bar dataKey="executed" stackId="a" fill="var(--badge-executed-bg)" name="実行" />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
