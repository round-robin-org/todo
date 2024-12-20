import { Task, Routine } from '@src/lib/types'
import { format } from 'date-fns'
import { RRule, Frequency, Weekday, Options } from 'rrule'

export function expandRecurringTasks(tasks: Task[], rangeStart: Date, rangeEnd: Date): Task[] {
  const expandedTasks: Task[] = []

  for (const task of tasks) {
    if (task.routine) {
      const rule = buildRecurrenceRule(task.routine)
      const occurrences = rule.between(rangeStart, rangeEnd, true).filter(date => date >= rangeStart && date <= rangeEnd);

      for (const date of occurrences) {
        const formattedDate = format(date, 'yyyy-MM-dd')
        const exception = task.exceptions?.[formattedDate]

        if (exception?.status === 'deleted') continue

        if (task.routine.ends?.type === 'on' && date > new Date(task.routine.ends.value as string)) {
          continue
        }

        expandedTasks.push({
          ...task,
          title: task.title,
          id: `${task.id}-${formattedDate}`,
          originalId: task.id,
          label: task.label,
          scheduledDate: formattedDate,
          status: exception?.status || task.status,
          starred: exception?.starred ?? task.starred,
          memo: exception?.memo || task.memo,
          occurrenceDate: formattedDate
        })
      }
    } else {
      if (task.scheduledDate && new Date(task.scheduledDate) >= rangeStart && new Date(task.scheduledDate) <= rangeEnd) {
        expandedTasks.push(task)
      }
    }
  }

  return expandedTasks
}

function buildRecurrenceRule(routine: Routine) {
  const options: Partial<Options> = {
    freq: Frequency.DAILY,
    interval: routine.interval.number,
    dtstart: new Date(routine.starts),
    until: routine.ends?.type === 'on' ? new Date(routine.ends.value as string) : undefined,
    count: routine.ends?.type === 'after' ? Number(routine.ends.value) : undefined,
  }

  switch (routine.interval.unit) {
    case 'day':
      options.freq = Frequency.DAILY
      break
    case 'week':
      options.freq = Frequency.WEEKLY
      if (routine.weekDays && routine.weekDays.length > 0) {
        options.byweekday = routine.weekDays.map(day => {
          const mappedDay = mapWeekday(day)
          if (!mappedDay) {
            throw new Error(`Invalid weekday: ${day}`)
          }
          return mappedDay
        })
      }
      break
    case 'month':
      options.freq = Frequency.MONTHLY
      if (routine.monthOption === 'day') {
        const day = parseInt(routine.monthDay || '1', 10)
        if (isNaN(day) || day < 1 || day > 31) {
          throw new Error(`Invalid month day: ${routine.monthDay}`)
        }
        options.bymonthday = [day]
      } else if (routine.monthOption === 'weekday') {
        const nth = mapNthWeek(routine.monthWeek!)
        const wd = mapWeekday(routine.monthWeekDay!)
        if (nth === undefined) {
          throw new Error(`Invalid week number: ${routine.monthWeek}`)
        }
        if (!wd) {
          throw new Error(`Invalid weekday: ${routine.monthWeekDay}`)
        }
        options.byweekday = [wd.nth(nth)]
      }
      break
    case 'year':
      options.freq = Frequency.YEARLY
      break
    default:
      throw new Error(`Invalid interval unit: ${routine.interval.unit}`)
  }

  return new RRule(options)
}

function mapWeekday(day: string): Weekday | undefined {
  const dayMap: Record<string, Weekday> = {
    'Mon': new Weekday(0),
    'Tue': new Weekday(1),
    'Wed': new Weekday(2),
    'Thu': new Weekday(3),
    'Fri': new Weekday(4),
    'Sat': new Weekday(5),
    'Sun': new Weekday(6),
  }
  return dayMap[day]
}

function mapNthWeek(weekStr: string): number | undefined {
  const nthMap: Record<string, number> = {
    'First': 1,
    'Second': 2,
    'Third': 3,
    'Fourth': 4,
    'Last': -1
  }
  return nthMap[weekStr]
}