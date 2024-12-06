'use client'

import React from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { TaskItem } from '@src/components/core/TaskItem'
import { Task } from '@src/lib/types'

type TaskListProps = {
  tasks: Task[];
  toggleStatus: (id: string) => void;
  toggleStar: (id: string) => void;
  onEdit: (task: Task) => void;
  isDraggable: boolean;
  onDragEnd?: (result: DropResult) => void;
  deleteTask: (id: string) => void;
  assignTaskToDate?: (id: string) => void;
  unassignTaskFromDate?: (id: string) => void;
  setTaskToSchedule?: (task: Task | null) => void;
  showExecutedTasks?: boolean;
  executedTasks?: Task[];
}

export function TaskList({ tasks, toggleStatus, toggleStar, onEdit, isDraggable, onDragEnd, deleteTask, assignTaskToDate, unassignTaskFromDate, setTaskToSchedule, showExecutedTasks, executedTasks }: TaskListProps) {
  const plannedTasks = tasks.filter(task => task.status === "planned")

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isDraggable ? (
        <Droppable droppableId="taskList">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {plannedTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
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
                        deleteTask={deleteTask}
                        assignToDate={assignTaskToDate}
                        unassignFromDate={unassignTaskFromDate}
                        setTaskToSchedule={setTaskToSchedule}
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
        <ul>
          {plannedTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              toggleStatus={toggleStatus} 
              toggleStar={toggleStar} 
              onEdit={onEdit} 
              deleteTask={deleteTask}
              assignToDate={assignTaskToDate}
              unassignFromDate={unassignTaskFromDate}
              setTaskToSchedule={setTaskToSchedule}
            />
          ))}
        </ul>
      )}
      {showExecutedTasks && executedTasks && (
        <ul>
          {executedTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              toggleStatus={toggleStatus} 
              toggleStar={toggleStar} 
              onEdit={onEdit} 
              deleteTask={deleteTask}
              isExecuted={true}
              assignToDate={assignTaskToDate}
              unassignFromDate={unassignTaskFromDate}
              setTaskToSchedule={setTaskToSchedule}
            />
          ))}
        </ul>
      )}
    </DragDropContext>
  )
} 