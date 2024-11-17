'use client'

import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Task, TaskItem } from './TaskItem'

type TaskListProps = {
  tasks: Task[];
  toggleStatus: (id: number) => void;
  toggleStar: (id: number) => void;
  onEdit: (task: Task) => void;
  isDraggable: boolean;
  onDragEnd?: (result: DropResult) => void;
}

export function TaskList({ tasks, toggleStatus, toggleStar, onEdit, isDraggable, onDragEnd }: TaskListProps) {
  const plannedTasks = tasks.filter(task => task.status === "planned")

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isDraggable ? (
        <Droppable droppableId="taskList">
          {(provided) => (
            <ul className="space-y-2" ref={provided.innerRef} {...provided.droppableProps}>
              {plannedTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
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
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      ) : (
        <ul className="space-y-2">
          {plannedTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              toggleStatus={toggleStatus} 
              toggleStar={toggleStar} 
              onEdit={onEdit} 
            />
          ))}
        </ul>
      )}
    </DragDropContext>
  )
} 