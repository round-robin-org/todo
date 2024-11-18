'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from 'date-fns'
import { Header } from './Header'
import { TaskDialog } from './TaskDialog'
import { CalendarView } from './CalendarView'
import { ChartView } from './ChartView'
import { useTasks } from '@/hooks/useTasks'
import { TaskList } from './TaskList'
import { ExecutedTasks } from './ExecutedTasks'
import { TabContent } from './TabContent'
import { Task } from '../../lib/types'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export function TaskManagementApp() {
  const [activeTab, setActiveTab] = useState("today")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [labels, setLabels] = useState(["健康", "仕事", "家事"])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { tasks, setTasks, error } = useTasks(selectedDate, activeTab)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  // タスクの追加
  const addTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          scheduled_date: taskData.scheduledDate ? taskData.scheduledDate : null,
          scheduledDate: undefined
        })
        .select()

      if (error) {
        throw error
      }

      // 新しいタスクをステートに追加
      setTasks(prevTasks => [data[0], ...prevTasks])
      toast.success('タスクを追加しました')
    } catch (error) {
      console.error('タスクの追加に失敗しました:', error)
      toast.error('タスクの追加に失敗しました。')
    }
  }

  // タスクの更新
  const updateTask = async (updatedTask: Task) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updatedTask.title,
          memo: updatedTask.memo,
          status: updatedTask.status,
          starred: updatedTask.starred,
          scheduled_date: updatedTask.scheduledDate ? updatedTask.scheduledDate : null,
          label: updatedTask.label
        })
        .eq('id', updatedTask.id)

      if (error) throw error

      // ステートを更新
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      )
      toast.success('タスクを更新しました')
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error)
      toast.error('タスクの更新に失敗しました。')
    }
  }

  // ステータスをトグルする関数の追加
  const toggleTaskStatus = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) throw new Error('タスクが見つかりません')

      const updatedStatus = task.status === 'executed' ? 'planned' : 'executed'

      const { error } = await supabase
        .from('tasks')
        .update({ status: updatedStatus })
        .eq('id', taskId)

      if (error) throw error

      // ステートを更新
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, status: updatedStatus } : t
        )
      )
      toast.success('タスクのステータスを更新しました')
    } catch (error) {
      console.error('ステータスの更新に失敗しました:', error)
      toast.error('ステータスの更新に失敗しました。')
    }
  }

  // スターをトグルする関数の追加
  const toggleTaskStar = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) throw new Error('タスクが見つかりません')

      const updatedStar = !task.starred

      const { error } = await supabase
        .from('tasks')
        .update({ starred: updatedStar })
        .eq('id', taskId)

      if (error) throw error

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, starred: updatedStar } : t
        )
      )
      toast.success('タスクのスターを更新しました')
    } catch (error) {
      console.error('スターの更新に失敗しました:', error)
      toast.error('スターの更新に失敗しました。')
    }
  }

  // ラベルの追加
  const addLabel = (newLabel: string) => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels(prevLabels => [...prevLabels, newLabel])
    }
  }

  // タスクの削除
  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (error) throw error

      // ステートからタスクを削除
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId))
      toast.success('タスクを削除しました')
    } catch (error) {
      console.error('タスクの削除に失敗しました:', error)
      toast.error('タスクの削除に失敗しました。')
    }
  }

  return (
    <div>
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="today">今日</TabsTrigger>
          <TabsTrigger value="pastfuture">過去＆未来</TabsTrigger>
          <TabsTrigger value="backlog">バックログ</TabsTrigger>
          <TabsTrigger value="review">レビュー</TabsTrigger>
        </TabsList>

        {/* 今日のタブ */}
        <TabsContent value="today">
          <TabContent 
            title="今日のタスク" 
            description="今日のタスクを管理します。" 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
          >
            <TaskList 
              tasks={tasks.filter(task => task.scheduledDate === format(new Date(), 'yyyy-MM-dd'))}
              toggleStatus={toggleTaskStatus}
              toggleStar={toggleTaskStar}
              onEdit={setEditingTask}
              isDraggable={false}
              deleteTask={deleteTask}
              onDragEnd={handleDragEnd}
            />
            {showExecutedTasks && (
              <ExecutedTasks 
                tasks={tasks.filter(task => task.scheduledDate === format(new Date(), 'yyyy-MM-dd'))}
                toggleStatus={toggleTaskStatus}
                toggleStar={toggleTaskStar}
                onEdit={setEditingTask}
              />
            )}
          </TabContent>
        </TabsContent>

        {/* 過去＆未来のタブ */}
        <TabsContent value="pastfuture">
          <TabContent 
            title="過去＆未来のタスク" 
            description="今日以前と明日以降のタスク" 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
          >
            <CalendarView 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              tasks={tasks} 
              addTask={addTask}
              addLabel={addLabel}
              labels={labels}
            />
            {selectedDate && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{format(selectedDate, 'MMMM d, yyyy')} のタスク</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList 
                    tasks={tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd') && task.status === "planned")}
                    toggleStatus={toggleTaskStatus}
                    toggleStar={toggleTaskStar}
                    onEdit={setEditingTask}
                    isDraggable={false}
                    deleteTask={deleteTask}
                    onDragEnd={handleDragEnd}
                  />
                  {showExecutedTasks && (
                    <ExecutedTasks 
                      tasks={tasks.filter(task => task.scheduledDate === format(selectedDate, 'yyyy-MM-dd'))}
                      toggleStatus={toggleTaskStatus}
                      toggleStar={toggleTaskStar}
                      onEdit={setEditingTask}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </TabContent>
        </TabsContent>

        {/* バックログのタブ */}
        <TabsContent value="backlog">
          <TabContent 
            title="バックログ" 
            description="日付が設定されていないタスクのリスト" 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
          >
            <TaskList 
              tasks={tasks.filter(task => !task.scheduledDate)}
              toggleStatus={toggleTaskStatus}
              toggleStar={toggleTaskStar}
              onEdit={setEditingTask}
              isDraggable={false}
              deleteTask={deleteTask}
              onDragEnd={handleDragEnd}
            />
          </TabContent>
        </TabsContent>

        {/* レビュータブ */}
        <TabsContent value="review">
          <TabContent 
            title="レビュー" 
            description="タスク完了率の傾向と目標ベースのタスク数" 
            labels={labels}
            addTask={addTask}
            addLabel={addLabel}
          >
            <ChartView tasks={tasks} />
          </TabContent>
        </TabsContent>
      </Tabs>

      {/* タスク編集ダイアログ */}
      {editingTask && (
        <TaskDialog 
          labels={labels}
          addTask={addTask}
          updateTask={updateTask}
          isEdit={true}
          taskToEdit={editingTask}
          isToday={false}
          addLabel={addLabel}
          open={true}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
} 