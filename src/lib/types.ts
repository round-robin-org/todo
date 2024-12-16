export type Routine = {
  interval: {
    number: number;
    unit: 'day' | 'week' | 'month' | 'year';
  };
  starts: string; // 'yyyy-MM-dd'
  ends: {
    type: 'never' | 'on' | 'after';
    value: string | number; // date string or number of occurrences
  };
  weekDays?: string[];
  monthOption?: 'day' | 'weekday';
  monthDay?: string;
  monthWeek?: 'First' | 'Second' | 'Third' | 'Fourth' | 'Last';
  monthWeekDay?: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
}

export type Task = {
  id: string;
  originalId?: string;
  title: string;
  memo: string;
  status: 'executed' | 'planned' | 'deleted';
  starred: boolean;
  label: string;
  scheduledDate: string | null;
  routine: Routine | null;
  occurrenceDate?: string;
  exceptions?: {
    [date: string]: {
      status?: 'executed' | 'planned' | 'deleted';
      starred?: boolean;
      memo?: string;
    };
  };
  mode?: 'schedule' | 'copy';
} 