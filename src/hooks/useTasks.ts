import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@src/lib/supabase'
import { Task, Routine } from '@src/lib/types'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { RRule, RRuleSet, Weekday } from 'rrule'

export function useTasks(selectedDate: Date, activeTab: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async (date: Date) => {
    // 月単位で取得 (Calendarビューなど)
    const start = format(startOfMonth(date), 'yyyy-MM-dd')
    const end = format(endOfMonth(date), 'yyyy-MM-dd')

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        // 非予定タスクも含め、月範囲内のタスクを取得
        .or(`scheduled_date.gte.${start},scheduled_date.lte.${end},scheduled_date.is.null`)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedTasks: Task[] = data.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        memo: task.memo || '',
        status: task.status === 'executed' ? 'executed' : 'planned',
        starred: task.starred || false,
        scheduledDate: task.scheduled_date || null,
        label: task.label || '',
        routine: task.routine || null,
        parentTaskId: task.parent_task_id || null
      }))

      // 繰り返しタスクを展開
      const expandedTasks = expandRecurringTasks(formattedTasks, new Date(start), new Date(end))
      setTasks(expandedTasks)
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

      if (error) throw error

      const formattedTasks: Task[] = data.map((task: any) => ({
        id: task.id.toString(),
        title: task.title,
        memo: task.memo || '',
        status: task.status === 'executed' ? 'executed' : 'planned',
        starred: task.starred || false,
        scheduledDate: task.scheduled_date || null,
        label: task.label || '',
        routine: task.routine || null,
        parentTaskId: task.parent_task_id || null
      }))

      const expandedTasks = expandRecurringTasks(formattedTasks, new Date(today), new Date(today))
      setTasks(expandedTasks)
    } catch (error) {
      console.error('Failed to fetch today\'s tasks:', error)
      setError('Failed to fetch today\'s tasks.')
    }
  }, [])

  useEffect(() => {
    if (activeTab === "today") {
      fetchTodayTasks()
    } else {
      fetchTasks(selectedDate)
    }
  }, [activeTab, selectedDate, fetchTasks, fetchTodayTasks])

  useEffect(() => {
    const channel = supabase
      .channel('tasks-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, payload => {
        // 変更があるたびに再取得
        if (activeTab === "today") {
          fetchTodayTasks()
        } else {
          fetchTasks(selectedDate)
        }
      })
      .subscribe()

    return () => {
      supabase.channel('tasks-channel').unsubscribe()
    }
  }, [activeTab, selectedDate, fetchTasks, fetchTodayTasks])

  return { tasks, setTasks, error }
}

/**
 * 繰り返しタスクを展開する関数
 */
function expandRecurringTasks(tasks: Task[], rangeStart: Date, rangeEnd: Date): Task[] {
  const expandedTasks: Task[] = []

  for (const task of tasks) {
    if (task.routine && !task.parentTaskId) {
      const rule = buildRecurrenceRule(task.routine)
      const occurrences = rule.between(rangeStart, rangeEnd, true)

      for (const date of occurrences) {
        expandedTasks.push({
          ...task,
          id: `${task.id}-${format(date, 'yyyyMMdd')}`,
          scheduledDate: format(date, 'yyyy-MM-dd'),
          parentTaskId: task.id
        })
      }
    } else {
      expandedTasks.push(task)
    }
  }

  return expandedTasks
}

/**
 * ルールオブジェクトをrruleで構築
 */
function buildRecurrenceRule(routine: Routine) {
  const options: Partial<RRule.Options> = {
    freq: RRule.DAILY,
    interval: routine.interval.number,
    dtstart: new Date(routine.starts),
    until: routine.ends.type === 'on' ? new Date(routine.ends.value as string) : undefined,
    count: routine.ends.type === 'after' ? routine.ends.value as number : undefined,
  }

  switch (routine.interval.unit) {
    case 'day':
      options.freq = RRule.DAILY
      break
    case 'week':
      options.freq = RRule.WEEKLY
      if (routine.weekDays && routine.weekDays.length > 0) {
        options.byweekday = routine.weekDays.map(day => mapWeekday(day))
      }
      break
    case 'month':
      options.freq = RRule.MONTHLY
      if (routine.monthOption === 'day') {
        options.bymonthday = [parseInt(routine.monthDay || '1', 10)]
      } else if (routine.monthOption === 'weekday') {
        const nth = mapNthWeek(routine.monthWeek!)
        const wd = mapWeekday(routine.monthWeekDay!)
        options.byweekday = [wd.nth(nth)]
      }
      break
    case 'year':
      options.freq = RRule.YEARLY
      break
    default:
      options.freq = RRule.DAILY
      break
  }

  return new RRule(options)
}

function mapWeekday(day: string): Weekday {
  const dayMap: Record<string, Weekday> = {
    'Sun': RRule.SU,
    'Mon': RRule.MO,
    'Tue': RRule.TU,
    'Wed': RRule.WE,
    'Thu': RRule.TH,
    'Fri': RRule.FR,
    'Sat': RRule.SA
  }
  return dayMap[day] || RRule.MO
}

function mapNthWeek(weekStr: string) {
  const nthMap: Record<string, number> = {
    'First': 1,
    'Second': 2,
    'Third': 3,
    'Fourth': 4,
    'Last': -1
  }
  return nthMap[weekStr] || 1
}
