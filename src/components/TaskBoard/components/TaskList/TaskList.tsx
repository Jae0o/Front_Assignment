import { useMemo } from "react";
import * as S from "./TaskList.styles";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { TaskItemType, TaskStatusType } from "@/types";
import { STATUS_NAMES } from "../../TaskBoard.constants";
import { taskMovingValidation } from "../../utils";

interface TaskListProps {
  items: TaskItemType[];
  status: TaskStatusType;
  draggingId: string;
}

const TaskList = ({ items, status, draggingId }: TaskListProps) => {
  const isDropDisabled = useMemo(
    () => taskMovingValidation({ start: draggingId, end: status }),
    [status, draggingId]
  );

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <S.TaskListLayout
          $isDraggingOver={snapshot.isDraggingOver}
          $isDropDisabled={isDropDisabled}
          $status={status}
        >
          <S.TaskListTitle>{STATUS_NAMES[status]}</S.TaskListTitle>
          <S.TaskListContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(itemProvided, snapshot) => (
                  <S.TaskItem
                    ref={itemProvided.innerRef}
                    $isDragging={snapshot.isDragging}
                    style={{
                      ...itemProvided.draggableProps.style,
                    }}
                    {...itemProvided.draggableProps}
                    {...itemProvided.dragHandleProps}
                  >
                    {item.content}
                  </S.TaskItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </S.TaskListContainer>
        </S.TaskListLayout>
      )}
    </Droppable>
  );
};

export default TaskList;
