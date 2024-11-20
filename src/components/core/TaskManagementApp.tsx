'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { format } from 'date-fns'
import { Header } from '@src/components/core/Header'
import { TaskDialog } from '@src/components/core/TaskDialog'
import { CalendarView } from '@src/components/core/CalendarView'
import { ChartView } from '@src/components/core/ChartView'
import { useTasks } from '@src/hooks/useTasks'
import { TaskList } from '@src/components/core/TaskList'
import { ExecutedTasks } from '@src/components/core/ExecutedTasks'
import { TabContent } from '@src/components/core/TabContent'
import { Task } from '@src/lib/types'
import { supabase } from '@src/lib/supabase'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { MapView } from './MapView'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

export function TaskManagementApp() {
  const [activeTab, setActiveTab] = useState("today")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showExecutedTasks, setShowExecutedTasks] = useState(false)
  const [labels, setLabels] = useState(["Health", "Work", "Housework"])
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [showBacklog, setShowBacklog] = useState(false)
  const [userLocation, setUserLocation] = useState<{ longitude: number, latitude: number } | null>(null)

  const { tasks, setTasks, error } = useTasks(selectedDate, activeTab)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          })
        },
        (error) => {
          console.error('Failed to get user location:', error)
          toast.error('ユーザーの位置情報を取得できませんでした。デフォルトの位置を使用します。')
        }
      )
    } else {
      console.error('This browser does not support geolocation.')
      toast.error('ジオロケーションはサポートされていません。デフォルトの位置を使用します。')
    }
  }, [])

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    // ドラッグ元がタスクリストでドラッグ先が日付セルの場合
    if (source.droppableId === 'taskList' && destination.droppableId.startsWith('date-')) {
      const newDate = destination.droppableId.replace('date-', '')
      const task = tasks.find(t => t.id === draggableId)
      if (task) {
        await updateTask({ ...task, scheduledDate: newDate })
      }
    }

    // ドラッグ元が日付セルでドラッグ先がタスクリストの場合（バックログに戻す）
    if (source.droppableId.startsWith('date-') && destination.droppableId === 'taskList') {
      const task = tasks.find(t => t.id === draggableId)
      if (task) {
        await updateTask({ ...task, scheduledDate: null })
      }
    }

    // 同じ日付セル間での並び替え（必要に応じて実装）
    if (source.droppableId.startsWith('date-') && destination.droppableId.startsWith('date-') && source.droppableId === destination.droppableId) {
      // 必要なら並び替えのロジックを追加
      // 現在は並び替えを行わないため、何もしない
    }
  }

  const updateTask = async (updatedTask: Task) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          scheduled_date: updatedTask.scheduledDate ? updatedTask.scheduledDate : null,
          longitude: userLocation ? userLocation.longitude : null,
          latitude: userLocation ? userLocation.latitude : null
        })
        .eq('id', updatedTask.id)

      if (error) throw error

      setTasks(prevTasks =>
        prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
      )
      toast.success('タスクの日付が更新されました')
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error)
      toast.error('タスクの日付の更新に失敗しました')
    }
  }

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          scheduled_date: taskData.scheduledDate ? taskData.scheduledDate : null,
          longitude: userLocation ? userLocation.longitude : null,
          latitude: userLocation ? userLocation.latitude : null,
          scheduledDate: undefined
        })
        .select()

      if (error) {
        throw error
      }

      setTasks(prevTasks => [data[0], ...prevTasks])
      toast.success('タスクが追加されました')
    } catch (error) {
      console.error('タスクの追加に失敗しました:', error)
      toast.error('タスクの追加に失敗しました')
    }
  }

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

      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, status: updatedStatus } : t
        )
      )
      toast.success('タスクのステータスが更新されました')
    } catch (error) {
      console.error('ステータスの更新に失敗しました:', error)
      toast.error('ステータスの更新に失敗しました')
    }
  }

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
      toast.success('タスクのスターが更新されました')
    } catch (error) {
      console.error('スターの更新に失敗しました:', error)
      toast.error('スターの更新に失敗しました')
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (error) throw error

      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId))
      toast.success('タスクが削除されました')
    } catch (error) {
      console.error('タスクの削除に失敗しました:', error)
      toast.error('タスクの削除に失敗しました')
    }
  }

  const addLabel = (newLabel: string) => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels(prevLabels => [...prevLabels, newLabel])
      toast.success(`ラベル "${newLabel}" を追加しました`)
    } else {
      toast.error('無効なラベルか、既に存在するラベルです')
    }
  }

  const toggleExecutedTasks = () => {
    setShowExecutedTasks(prev => !prev)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div>
        <Header />
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="calendar">カレンダー</TabsTrigger>
            <TabsTrigger value="map">マップ</TabsTrigger>
            <TabsTrigger value="chart">チャート</TabsTrigger>
          </TabsList>

          {/* カレンダービュータブ */}
          <TabsContent value="calendar">
            <TabContent 
              title="カレンダービュー" 
              description="日付ごとにタスクを表示します。" 
              labels={labels}
              addTask={addTask}
              addLabel={addLabel}
              showToggleButton={true}
              showExecutedTasks={showExecutedTasks}
              toggleExecutedTasks={toggleExecutedTasks}
            >
              <CalendarView 
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                tasks={tasks}
                addTask={addTask}
                addLabel={addLabel}
                labels={labels}
                showBacklog={showBacklog}
                setShowBacklog={setShowBacklog}
                toggleTaskStatus={toggleTaskStatus}
                toggleTaskStar={toggleTaskStar}
                onEdit={setEditingTask}
                deleteTask={deleteTask}
                handleDragEnd={handleDragEnd}
              />

              {/* 日付が選択されていてバックログが表示されていない場合に選択した日付のタスクリストを表示 */}
              {!showBacklog && selectedDate && (
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

              {/* バックログが表示されている場合にバックログタスクリストを表示 */}
              {showBacklog && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>バックログのタスク</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TaskList 
                      tasks={tasks.filter(task => !task.scheduledDate)}
                      toggleStatus={toggleTaskStatus}
                      toggleStar={toggleTaskStar}
                      onEdit={setEditingTask}
                      isDraggable={true}
                      deleteTask={deleteTask}
                      onDragEnd={handleDragEnd}
                    />
                    {showExecutedTasks && (
                      <ExecutedTasks 
                        tasks={tasks.filter(task => !task.scheduledDate)}
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

          {/* チャートタブ */}
          <TabsContent value="chart">
            <TabContent 
              title="チャートビュー" 
              description="タスクの実行率や目標別タスク数のトレンド。" 
              labels={labels}
              addTask={addTask}
              addLabel={addLabel}
              showToggleButton={false}
            >
              <ChartView tasks={tasks} />
            </TabContent>
          </TabsContent>

          {/* マップタブ */}
          <TabsContent value="map">
            <TabContent 
              title="マップビュー" 
              description="マップ上でタスクを表示します。" 
              labels={labels}
              addTask={addTask}
              addLabel={addLabel}
              showToggleButton={false}
            >
              <MapView tasks={tasks} userLocation={userLocation} />
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
            userLocation={userLocation}
          />
        )}
      </div>
    </DragDropContext>
  )
} 