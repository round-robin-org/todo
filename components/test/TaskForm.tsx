import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TaskForm() {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .insert([{ 
          title,
          status: 'pending',
          starred: false,
          label: ''
        }]);

      if (error) throw error;
      setTitle('');
    } catch (error) {
      console.error('タスクの追加エラー:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力"
        className="border p-2 rounded w-64"
      />
      <button 
        type="submit" 
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700"
      >
        追加
      </button>
    </form>
  );
} 