'use client'

import React, { useEffect, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { format, startOfWeek, addDays } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart"
import { Task } from './Task'

interface ChartViewProps {
  tasks: Task[]
}

export function ChartView({ tasks }: ChartViewProps) {
  const [weeklyTaskData, setWeeklyTaskData] = useState<{ name: string; plannedTasks: number; executedTasks: number }[]>([])
  const [goalData, setGoalData] = useState<{ name: string; planned: number; executed: number }[]>([])

  useEffect(() => {
    const calculateWeeklyData = () => {
      const weekStart = startOfWeek(new Date(), { locale: ja })
      const data = []

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
    }

    const calculateGoalData = () => {
      const labelStats: Record<string, { planned: number; executed: number }> = {}

      tasks.forEach(task => {
        if (!task.label) return
        if (!labelStats[task.label]) {
          labelStats[task.label] = { planned: 0, executed: 0 }
        }
        labelStats[task.label].planned++
        if (task.status === 'executed') {
          labelStats[task.label].executed++
        }
      })

      const data = Object.entries(labelStats).map(([name, stats]) => ({
        name,
        ...stats
      }))

      setGoalData(data)
    }

    calculateWeeklyData()
    calculateGoalData()
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
          <Tooltip content={<ChartTooltipContent />} />
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
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Bar dataKey="planned" stackId="a" fill="var(--badge-planned-bg)" />
          <Bar dataKey="executed" stackId="a" fill="var(--badge-executed-bg)" />
        </BarChart>
      </ChartContainer>
    </div>
  )
} 