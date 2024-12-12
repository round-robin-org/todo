import { useState, useCallback } from 'react'
import { supabase } from '@src/lib/supabase'
import { Routine, Task } from '@src/lib/types'
import { toast } from 'sonner'
import { useAuth } from '@src/hooks/useAuth'
import { expandRecurringTasks } from '@src/utils/expandRecurringTasks'

export function useTasks() {
  const { user } = useAuth()
  const userId = user?.id

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTasks = useCallback(async (startDate: Date, endDate: Date) => {
    if (!userId) {
      toast.error('Authentication is required to fetch tasks.')
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          labels (
            name
          )
        `)
        .eq('user_id', userId)

      if (error) {
        console.error('Failed to fetch tasks:', error)
        throw error
      }

      const formattedTasks: Task[] = data.map((task: {
        id: number;
        title: string;
        memo?: string;
        status: string;
        starred?: boolean;
        scheduled_date?: string;
        labels?: { name: string };
        routine?: Routine;
        original_task_id?: string;
        exceptions?: {
          [date: string]: {
            status?: 'executed' | 'planned' | 'deleted';
            starred?: boolean;
            memo?: string;
          };
        };
      }) => ({
        id: task.id.toString(),
        title: task.title,
        memo: task.memo || '',
        status: task.status === 'executed' ? 'executed' : 'planned',
        starred: task.starred || false,
        scheduledDate: task.scheduled_date || null,
        label: task.labels?.name || '',
        routine: task.routine || null,
        originalId: task.original_task_id || undefined,
        exceptions: task.exceptions || {}
      }))

      const unplannedTasks = formattedTasks.filter(task => !task.scheduledDate)
      const expandedTasks = expandRecurringTasks(formattedTasks, startDate, endDate);

      const combinedTasks = [...unplannedTasks, ...expandedTasks]
      setTasks(combinedTasks);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to fetch tasks:', error)
        toast.error('Failed to fetch tasks.')
      }
    } finally {
      setLoading(false)
    }
  }, [userId])

  return { tasks, setTasks, loading, fetchTasks }
}
