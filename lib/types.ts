export type Task = {
  id: string;
  title: string;
  memo: string;
  status: "planned" | "executed";
  starred: boolean;
  scheduledDate: string;
  label?: string;
  routine?: {
    interval: { number: number; unit: 'day' | 'week' | 'month' | 'year' };
    starts: string;
    ends: { type: 'never' | 'on' | 'after'; value?: string | number };
  };
}; 