import { useState } from 'react';
import { Task } from './types';
import { supabase } from '@/lib/supabase';

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', task.id);

      if (error) throw error;
    } catch (error) {
      console.error('タスクの削除エラー:', error);
    }
  };

  const handleToggleStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', task.id);

      if (error) throw error;
    } catch (error) {
      console.error('ステータス更新エラー:', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ title: editTitle })
        .eq('id', task.id);

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      console.error('タイトル更新エラー:', error);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleUpdate} className="flex items-center gap-2 p-2 border rounded">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="flex-1 border p-1 rounded"
          autoFocus
        />
        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">
          保存
        </button>
        <button 
          type="button" 
          onClick={() => setIsEditing(false)}
          className="bg-gray-500 text-white px-2 py-1 rounded"
        >
          キャンセル
        </button>
      </form>
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)} 
      className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer"
    >
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={handleToggleStatus}
        onClick={(e) => e.stopPropagation()}
      />
      <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
        {task.title}
      </span>
      <button
        onClick={handleDelete}
        className="ml-auto text-red-500 hover:text-red-700"
      >
        削除
      </button>
    </div>
  );
} 