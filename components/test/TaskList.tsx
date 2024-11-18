import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Task } from './types';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // 初期データの取得
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) console.error('Error fetching tasks:', error);
      else setTasks(data || []);
    };

    fetchTasks();

    // リアルタイムサブスクリプションの設定
    const channel = supabase.channel('tasks-changes');
    
    channel
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        (payload) => {
          console.log('受信したペイロード:', payload);
          
          if (payload.eventType === 'INSERT') {
            console.log('挿入イベント検出');
            setTasks(prev => [payload.new as Task, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            console.log('削除イベント検出');
            setTasks(prev => prev.filter(task => task.id !== (payload.old as Task).id));
          } else if (payload.eventType === 'UPDATE') {
            console.log('更新イベント検出');
            setTasks(prev => prev.map(task => 
              task.id === (payload.new as Task).id ? payload.new as Task : task
            ));
          }
        }
      )
      .subscribe((status) => {
        console.log('サブスクリプションステータス:', status);
      });

    return () => {
      console.log('チャンネルのクリーンアップ');
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="p-4">
      <TaskForm />
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
} 