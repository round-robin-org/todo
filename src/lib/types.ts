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
  title: string;
  memo: string;
  status: 'planned' | 'executed';
  starred: boolean;
  scheduledDate: string | null;
  label: string;
  longitude: number | null;
  latitude: number | null;
  routine?: Routine | null;
} 