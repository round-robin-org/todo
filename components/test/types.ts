export interface Task {
  id: string;
  title: string;
  memo?: string;
  scheduled_date?: string;
  status: 'pending' | 'completed';
  starred: boolean;
  created_at: string;
  routine?: string;
  label: string;
} 