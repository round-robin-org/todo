import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Task } from '../lib/types'
import { format, startOfMonth, endOfMonth } from 'date-fns'

export function useTasks(selectedDate: Date, activeTab: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchTasksByMonth = useCallback(async (date: Date) => {
    const start = format(startOfMonth(date), 'yyyy-MM-dd')
    const end = format(endOfMonth(date), 'yyyy-MM-dd')

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .or(`scheduled_date.gte.${start},scheduled_date.lte.${end},scheduled_date.is.null`)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      const formattedTasks: Task[] = data
        .filter((task: any) => task !== null)
        .map(task => ({
          id: task.id.toString(),
          title: task.title,
          memo: task.memo || '',
          status: task.status === 'executed' ? 'executed' : 'planned',
          starred: task.starred || false,
          scheduledDate: task.scheduled_date || null,
          label: task.label || ''
        }))

      setTasks(formattedTasks)
    } catch (error) {
      console.error('タスクの取得に失敗しました:', error)
      setError('タスクの取得に失敗しました。')
    }
  }, [])

  const fetchTodayTasks = useCallback(async () => {
    const today = format(new Date(), 'yyyy-MM-dd')
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('scheduled_date', today)
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      const formattedTasks: Task[] = data
        .filter((task: any) => task !== null)
        .map(task => ({
          id: task.id.toString(),
          title: task.title,
          memo: task.memo || '',
          status: task.status === 'executed' ? 'executed' : 'planned',
          starred: task.starred || false,
          scheduledDate: task.scheduled_date || null,
          label: task.label || ''
        }))

      setTasks(formattedTasks)
    } catch (error) {
      console.error('今日のタスクの取得に失敗しました:', error)
      setError('今日のタスクの取得に失敗しました。')
    }
  }, [])

  useEffect(() => {
    if (activeTab === "today") {
      fetchTodayTasks()
    } else {
      fetchTasksByMonth(selectedDate)
    }
  }, [activeTab, selectedDate, fetchTasksByMonth, fetchTodayTasks])

  // リアルタイムサブスクリプションの設定
  useEffect(() => {
    const channel = supabase
      .channel('tasks-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
        // シンプルな再フェッチ戦略
        if (activeTab === "today") {
          fetchTodayTasks()
        } else {
          fetchTasksByMonth(selectedDate)
        }
      })
      .subscribe()

    return () => {
      supabase.channel('tasks-channel').unsubscribe()
    }
  }, [activeTab, selectedDate, fetchTasksByMonth, fetchTodayTasks])

  return { tasks, setTasks, error }
} 