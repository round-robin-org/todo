'use client'

import React, { useEffect, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, TooltipProps } from 'recharts'
import { format, startOfWeek, addDays, isWithinInterval } from 'date-fns'
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
  weekRange: { weekStart: Date; weekEnd: Date } | null
}

// カスタムツールチップコンポーネント
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, tasks, chartType, weekRange }) => {
  if (active && payload && payload.length && weekRange) {
    const dataKey = payload[0].dataKey as string

    let filteredTasks: Task[] = []

    if (chartType === 'weekly') {
      // ツールチップのラベルから該当する日付を特定
      const weekStart = startOfWeek(new Date(), { locale: ja })
      const dayIndex = ['日', '月', '火', '水', '木', '金', '土'].indexOf(label as string)
      if (dayIndex === -1) {
        return null
      }
      const targetDate = addDays(weekStart, dayIndex)
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
        <ul className="mt-1 text-xs">
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
  const [weekRange, setWeekRange] = useState<{ weekStart: Date; weekEnd: Date } | null>(null)

  useEffect(() => {
    const calculateWeeklyData = () => {
      const weekStart = startOfWeek(new Date(), { locale: ja })
      const weekEnd = addDays(weekStart, 6)
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
      setWeekRange({ weekStart, weekEnd })
      return { weekStart, weekEnd }
    }

    const calculateGoalData = (weekStart: Date, weekEnd: Date) => {
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

      const data: GoalData[] = Object.entries(labelStats).map(([name, stats]) => ({
        name,
        ...stats
      }))

      setGoalData(data)
    }

    const { weekStart, weekEnd } = calculateWeeklyData()
    calculateGoalData(weekStart, weekEnd)
  }, [tasks])

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

  return (
    <div>
      <h3 className="font-semibold mb-2">週間タスク完了率</h3>
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
      <h3 className="font-semibold mt-4 mb-2">目標別タスク数</h3>
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
