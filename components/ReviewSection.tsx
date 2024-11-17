'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

type ReviewSectionProps = {
  weeklyTaskData: { name: string; plannedTasks: number; executedTasks: number }[];
  goalData: { name: string; planned: number; executed: number }[];
}

export function ReviewSection({ weeklyTaskData, goalData }: ReviewSectionProps) {
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