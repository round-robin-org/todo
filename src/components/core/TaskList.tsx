'use client'

import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskItem } from '@src/components/core/TaskItem'
import { Task } from '@src/lib/types'

type TaskListProps = {
  tasks: Task[];
  toggleStatus: (id: string) => void;
  toggleStar: (id: string) => void;
  onEdit: (task: Task) => void;
  isDraggable: boolean;
  onDragEnd?: (result: any) => void;
  deleteTask: (id: string) => void;
}

export function TaskList({ tasks, toggleStatus, toggleStar, onEdit, isDraggable, onDragEnd, deleteTask }: TaskListProps) {
  const plannedTasks = tasks.filter(task => task.status === "planned")

  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps}>
          {plannedTasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskItem 
                    task={task} 
                    toggleStatus={toggleStatus} 
                    toggleStar={toggleStar} 
                    onEdit={onEdit} 
                    deleteTask={deleteTask}
                    isDragging={snapshot.isDragging}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
} 