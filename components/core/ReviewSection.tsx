'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { supabase } from '@/lib/supabase'
import { startOfWeek, addDays, format } from 'date-fns'
import { ja } from 'date-fns/locale'

export function ReviewSection() {
  const [weeklyTaskData, setWeeklyTaskData] = useState<{ name: string; plannedTasks: number; executedTasks: number }[]>([])
  const [goalData, setGoalData] = useState<{ name: string; planned: number; executed: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // 今週の開始日を取得
      const weekStart = startOfWeek(new Date(), { locale: ja })
      
      try {
        // 週間データの取得
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

        // ラベル別データの取得
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
        }, {})

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>レビュー</CardTitle>
        <CardDescription>タスク完了率の傾向と目標ベースのタスク数</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">週間タスク完了率</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyTaskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="plannedTasks" stroke="#8884d8" fill="#8884d8" name="予定タスク数"/>
            <Area type="monotone" dataKey="executedTasks" stroke="#82ca9d" fill="#82ca9d" name="実行タスク数"/>
          </AreaChart>
        </ResponsiveContainer>
        <h3 className="font-semibold mt-4 mb-2">目標別タスク数</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={goalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="planned" stackId="a" fill="#8884d8" name="予定" />
            <Bar dataKey="executed" stackId="a" fill="#82ca9d" name="実行" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 