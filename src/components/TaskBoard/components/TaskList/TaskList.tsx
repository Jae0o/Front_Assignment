import { TaskItemType, TaskStatusType } from "@/types";
import * as S from "./TaskList.styles";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

interface TaskListProps {
  items: TaskItemType[];
  status: TaskStatusType;
}

const TaskList = ({ items, status }: TaskListProps) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <S.TaskListContainer
          {...provided.droppableProps}
          ref={provided.innerRef}
          $isDraggingOver={snapshot.isDraggingOver}
        >
          <S.TaskListTitle>{status}</S.TaskListTitle>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <S.TaskItem
                  ref={provided.innerRef}
                  $isDragging={snapshot.isDragging}
                  style={{
                    ...provided.draggableProps.style,
                  }}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item.content}
                </S.TaskItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </S.TaskListContainer>
      )}
    </Droppable>
  );
};

export default TaskList;
