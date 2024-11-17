'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Plus } from 'lucide-react'
import { format, isToday as isTodayFn } from 'date-fns'
import { Header } from './Header'
import { Task, TaskList } from './TaskList'
import { ExecutedTasks } from './ExecutedTasks'
import { AddTaskDialog } from './AddTaskDialog'
import { EditTaskDialog } from './EditTaskDialog'
import { CalendarView } from './CalendarView'
import { ReviewSection } from './ReviewSection'
import { supabase } from '@/lib/supabase'

export function TaskManagementApp() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [activeTab, setActiveTab] = useState("today")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [labels, setLabels] = useState(["健康", "仕事", "家事"])
  const newLabelRef = useRef(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [error, setError] = useState<string | null>(null)

  const weeklyTaskData = [
    { name: '月', plannedTasks: 10, executedTasks: 8 },
    { name: '火', plannedTasks: 12, executedTasks: 10 },
    { name: '水', plannedTasks: 8, executedTasks: 7 },
    { name: '木', plannedTasks: 15, executedTasks: 13 },
    { name: '金', plannedTasks: 10, executedTasks: 9 },
    { name: '土', plannedTasks: 5, executedTasks: 5 },
    { name: '日', plannedTasks: 3, executedTasks: 3 },
  ]

  const goalData = [
    { name: '健康', planned: 10, executed: 8 },
    { name: '仕事', planned: 15, executed: 12 },
    { name: '家事', planned: 5, executed: 3 },
  ]

  // タスクをデータベースから取得
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        // データベースから取得したデータを適切な形式に変換
        const formattedTasks: Task[] = data
          .filter((task: any) => task !== null) // nullのタスクを除外
          .map(task => ({
            id: task.id,
            title: task.title,
            memo: task.memo,
            status: task.status === 'executed' ? 'executed' : 'planned',
            starred: task.starred || false,
            scheduledDate: task.scheduled_date || '', // nullの場合は空文字に設定
            label: task.label || ''
          }))

        setTasks(formattedTasks)
      } catch (error) {
        console.error('タスクの取得に失敗しました:', error)
      }
    }

    fetchTasks()
  }, [])

  // タスクのステータスを更新
  const toggleTaskStatus = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const newStatus = task.status === "executed" ? "planned" : "executed"

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId)

      if (error) throw error

      setTasks(prevTasks => prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus }
          : task
      ))
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error)
    }
  }

  // スター状態を更新
  const toggleTaskStar = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ starred: !task.starred })
        .eq('id', taskId)

      if (error) throw error

      setTasks(prevTasks => prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, starred: !task.starred }
          : task
      ))
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error)
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
          label: updatedTask.label,
          scheduled_date: updatedTask.scheduledDate,
          status: updatedTask.status,
          starred: updatedTask.starred
        })
        .eq('id', updatedTask.id)

      if (error) throw error

      setTasks(prevTasks => prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ))
      setEditingTask(null)
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error)
    }
  }

  // 新しいタスクを追加する
  const addTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            title: newTask.title,
            memo: newTask.memo,
            scheduled_date: newTask.scheduledDate,
            label: newTask.label,
            status: newTask.status,
            starred: newTask.starred,
          }
        ])
        .single()

      if (error) {
        throw error
      }

      // dataがnullでないことを確認
      if (data) {
        const createdTask: Task = {
          id: data.id,
          title: data.title,
          memo: data.memo,
          status: data.status === 'executed' ? 'executed' : 'planned',
          starred: data.starred,
          scheduledDate: data.scheduled_date || '',
          label: data.label || ''
        }
        setTasks(prevTasks => [createdTask, ...prevTasks])
        setError(null)
      }
    } catch (error: any) {
      console.error('タスクの追加に失敗しました:', error)
      setError(error.message || 'タスクの追加に失敗しました。')
    }
  }

  // ルーティンに基づいて未来のタスクを生成（メモリ問題を防ぐため1ヶ月先までに制限）
  const generateFutureTasks = (task: Task) => {
    const { routine } = task;
    if (!routine) return;

    const startDate = new Date(routine.starts);
    const endDate = routine.ends.type === 'on' ? new Date(routine.ends.value as string) : null;
    const occurrences = routine.ends.type === 'after' ? routine.ends.value as number : Infinity;
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1); // 1ヶ月先までに制限

    let currentDate = startDate;
    let count = 0;
    const newTasks: Task[] = [];

    while ((!endDate || currentDate <= endDate) && count < occurrences && currentDate <= maxDate) {
      if (count > 0) { // 最初の発生は既に存在しているためスキップ
        const newTask: Task = {
          ...task,
          id: String(Date.now() + count), // 一意なIDを生成
          scheduledDate: format(currentDate, 'yyyy-MM-dd'),
          routine: undefined, // 新しいタスクにはルーティンを引き継がない
        };
        newTasks.push(newTask);
      }

      // 次の発生日を計算
      switch (routine.interval.unit) {
        case 'day':
          currentDate.setDate(currentDate.getDate() + routine.interval.number);
          break;
        case 'week':
          currentDate.setDate(currentDate.getDate() + routine.interval.number * 7);
          break;
        case 'month':
          currentDate.setMonth(currentDate.getMonth() + routine.interval.number);
          break;
        case 'year':
          currentDate.setFullYear(currentDate.getFullYear() + routine.interval.number);
          break;
        default:
          break;
      }

      count++;
    }

    if (newTasks.length > 0) {
      setTasks(prevTasks => [...prevTasks, ...newTasks]);
    }
  };

  // ドラッグ＆ドロップの終了時処理
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(result.source.index, 1)
    newTasks.splice(result.destination.index, 0, reorderedItem)

    setTasks(newTasks)
  }

  const addLabel = (newLabel: string) => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels(prevLabels => [...prevLabels, newLabel])
    }
  }

  return (
    <div className="container mx-auto p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">今日</TabsTrigger>
          <TabsTrigger value="pastfuture">過去＆未来</TabsTrigger>
          <TabsTrigger value="review">レビュー</TabsTrigger>
        </TabsList>
        {/* 今日のタブ */}
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                今日のタスク
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowExecutedTasks(!showExecutedTasks)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showExecutedTasks ? '実行済みタスクを隠す' : '実行済みタスクを表示'}
                  </Button>
                  <AddTaskDialog 
                    labels={labels} 
                    addTask={addTask} 
                    isToday={true} 
                    addLabel={addLabel}
                  />
                </div>
              </CardTitle>
              <CardDescription>今日のタスクリスト</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList 
                tasks={tasks.filter(task => task.scheduledDate && task.scheduledDate === format(new Date(), 'yyyy-MM-dd'))}
                toggleStatus={toggleTaskStatus}
                toggleStar={toggleTaskStar}
                onEdit={setEditingTask}
                isDraggable={false}
              />
              {showExecutedTasks && (
                <ExecutedTasks 
                  tasks={tasks.filter(task => task.scheduledDate && task.scheduledDate === format(new Date(), 'yyyy-MM-dd'))}
                  toggleStatus={toggleTaskStatus}
                  toggleStar={toggleTaskStar}
                  onEdit={setEditingTask}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 過去＆未来のタブ */}
        <TabsContent value="pastfuture">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                過去＆未来のタスク
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowExecutedTasks(!showExecutedTasks)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showExecutedTasks ? '実行済みタスクを隠す' : '実行済みタスクを表示'}
                  </Button>
                  <AddTaskDialog 
                    labels={labels} 
                    addTask={addTask} 
                    isToday={false} 
                    addLabel={addLabel}
                  />
                </div>
              </CardTitle>
              <CardDescription>今日以前と明日以降のタスク</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
                tasks={tasks} 
                addTask={addTask}
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* レビュータブ */}
        <TabsContent value="review">
          <ReviewSection 
            weeklyTaskData={weeklyTaskData} 
            goalData={goalData} 
          />
        </TabsContent>
      </Tabs>

      {/* タスク編集ダイアログ */}
      {editingTask && (
        <EditTaskDialog 
          task={editingTask}
          labels={labels}
          updateTask={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
} 