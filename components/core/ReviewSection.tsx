'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { supabase } from '@/lib/supabase'
import { startOfWeek, addDays, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart"

export function ReviewSection() {
  const [weeklyTaskData, setWeeklyTaskData] = useState<{ name: string; plannedTasks: number; executedTasks: number }[]>([])
  const [goalData, setGoalData] = useState<{ name: string; planned: number; executed: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const weekStart = startOfWeek(new Date(), { locale: ja })
      
      try {
        const weeklyData = []
        for (let i = 0; i < 7; i++) {
          const currentDate = addDays(weekStart, i)
          const dateStr = format(currentDate, 'yyyy-MM-dd')
          
          const { data: dayTasks, error: dayError } = await supabase
            .from('tasks')
            .select('status')
            .eq('scheduled_date', dateStr)

          if (dayError) throw dayError

          const plannedTasks = dayTasks.length
          const executedTasks = dayTasks.filter(t => t.status === 'executed').length

          weeklyData.push({
            name: format(currentDate, 'E', { locale: ja }),
            plannedTasks,
            executedTasks
          })
        }
        setWeeklyTaskData(weeklyData)

        const { data: labelTasks, error: labelError } = await supabase
          .from('tasks')
          .select('label, status')

        if (labelError) throw labelError

        const labelStats = labelTasks.reduce((acc, task) => {
          if (!acc[task.label]) {
            acc[task.label] = { planned: 0, executed: 0 }
          }
          acc[task.label].planned++
          if (task.status === 'executed') {
            acc[task.label].executed++
          }
          return acc
        }, {} as Record<string, { planned: number; executed: number }>)

        setGoalData(Object.entries(labelStats).map(([name, stats]) => ({
          name,
          ...stats
        })))

      } catch (error) {
        console.error('データの取得に失敗しました:', error)
      }
    }

    fetchData()
  }, [])

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
    <Card>
      <CardHeader>
        <CardTitle>レビュー</CardTitle>
        <CardDescription>タスク完了率の傾向と目標ベースのタスク数</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
} 