import * as S from "./TaskList.styles";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { TaskItemType, TaskStatusType } from "@/types";
import { STATUS_NAMES } from "../../TaskBoard.constants";

interface TaskListProps {
  items: TaskItemType[];
  status: TaskStatusType;
}

const TaskList = ({ items, status }: TaskListProps) => {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <S.TaskListLayout
          $isDraggingOver={snapshot.isDraggingOver}
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
