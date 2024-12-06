import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@src/lib/supabase'
import { Task } from '@src/lib/types'
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
          label: task.label || '',
          longitude: task.longitude || null,
          latitude: task.latitude || null,
          routine: task.routine || null
        }))

      setTasks(formattedTasks)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      setError('Failed to fetch tasks.')
    }
  }, [])

  const fetchTodayTasks = useCallback(async () => {
    const today = format(new Date(), 'yyyy-MM-dd')
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .or(`scheduled_date.is.null,scheduled_date.eq.${today}`)
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
          label: task.label || '',
          longitude: task.longitude || null,
          latitude: task.latitude || null,
          routine: task.routine || null
        }))

      setTasks(formattedTasks)
    } catch (error) {
      console.error('Failed to fetch today\'s tasks:', error)
      setError('Failed to fetch today\'s tasks.')
    }
  }, [])

  useEffect(() => {
    if (activeTab === "today") {
      fetchTodayTasks()
    } else {
      fetchTasksByMonth(selectedDate)
    }
  }, [activeTab, selectedDate, fetchTasksByMonth, fetchTodayTasks])

  // Setting up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('tasks-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
        // Simple refetch strategy
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