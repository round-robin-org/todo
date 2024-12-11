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
  originalId?: string; // 繰り返しタスクの元のID
  isRecurring?: boolean; // 繰り返しタスクかどうか
  occurrenceDate?: string; // 繰り返しタスクの発生日
  title: string;
  memo: string;
  status: 'executed' | 'planned';
  starred: boolean;
  scheduledDate: string | null;
  label: string;
  routine: Routine | null;
  exceptions?: {
    [date: string]: {
      status?: 'executed' | 'planned' | 'deleted';
      starred?: boolean;
      memo?: string;
    };
  };
} 