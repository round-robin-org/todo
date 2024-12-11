import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@src/lib/supabase'
import { Task } from '@src/lib/types'
import { toast } from 'sonner'
import { useAuth } from '@src/hooks/useAuth'
import { expandRecurringTasks } from '@src/utils/expandRecurringTasks'

export function useTasks() {
  const { user } = useAuth()
  const userId = user?.id

  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTasks = useCallback(async (startDate: Date, endDate: Date) => {
    if (!userId) {
      console.warn('ユーザーIDが取得できませんでした。')
      setError('ユーザーが認証されていません。')
      return
    }

    try {
      setLoading(true)

      // scheduled_date が null のタスクを取得
      const { data: unplannedData, error: unplannedError } = await supabase
        .from('tasks')
        .select(`
          *,
          labels (
            name
          )
        `)
        .eq('user_id', userId)
        .is('scheduled_date', null)
        .order('created_at', { ascending: false })

      if (unplannedError) {
        console.error('Supabaseからのエラー:', unplannedError)
        throw unplannedError
      }

      console.log("unplannedData:", unplannedData)

      // scheduled_date が指定された期間内のタスクを取得
      const { data: plannedData, error: plannedError } = await supabase
        .from('tasks')
        .select(`
          *,
          labels (
            name
          )
        `)
        .eq('user_id', userId)
        .gte('scheduled_date', startDate.toISOString())
        .lte('scheduled_date', endDate.toISOString())
        .order('created_at', { ascending: false })

      if (plannedError) {
        console.error('Supabaseからのエラー:', plannedError)
        throw plannedError
      }

      // 2つの結果を別々にフォーマット
      const formattedUnplannedTasks: Task[] = unplannedData.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        memo: task.memo || '',
        status: task.status === 'executed' ? 'executed' : 'planned',
        starred: task.starred || false,
        scheduledDate: task.scheduled_date || null,
        label: task.labels?.name || null,
        routine: task.routine || null,
        parentTaskId: task.parent_task_id || null,
        exceptions: task.exceptions || {}
      }))

      const formattedPlannedTasks: Task[] = plannedData.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        memo: task.memo || '',
        status: task.status === 'executed' ? 'executed' : 'planned',
        starred: task.starred || false,
        scheduledDate: task.scheduled_date || null,
        label: task.labels?.name || null,
        routine: task.routine || null,
        parentTaskId: task.parent_task_id || null,
        exceptions: task.exceptions || {}
      }))

      const expandedPlannedTasks = expandRecurringTasks(formattedPlannedTasks, startDate, endDate);

      // 2つの結果を結合
      const expandedTasks = [...formattedUnplannedTasks, ...expandedPlannedTasks];

      setTasks(expandedTasks);
    } catch (error: any) {
      console.error('タスクのフェッチに失敗しました:', error)
      setError('Failed to fetch tasks.')
      toast.error('タスクの取得に失敗しました。')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    const channel = supabase
      .channel('tasks-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
      })
      .subscribe()

    return () => {
      supabase.channel('tasks-channel').unsubscribe()
    }
  }, [userId])

  return { tasks, setTasks, error, loading, fetchTasks }
}
