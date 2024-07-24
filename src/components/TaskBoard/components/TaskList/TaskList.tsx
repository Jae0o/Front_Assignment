import { useMemo } from "react";
import * as S from "./TaskList.styles";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { TaskItemType, TaskStatusType } from "@/types";
import { STATUS_NAMES } from "../../TaskBoard.constants";
import { taskMovingValidation } from "../../utils";

interface TaskListProps {
  items: TaskItemType[];
  selectedTasks: TaskItemType[];

  status: TaskStatusType;
  selectedStatus: string;

  onClick: (params: { item: TaskItemType; status: TaskStatusType }) => void;
}

const TaskList = ({
  items,
  selectedTasks,
  status,
  selectedStatus,
  onClick,
}: TaskListProps) => {
  const isDropDisabled = useMemo(
    () => taskMovingValidation({ start: selectedStatus, end: status }),
    [status, selectedStatus, taskMovingValidation]
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
                    {...itemProvided.draggableProps}
                    {...itemProvided.dragHandleProps}
                    ref={itemProvided.innerRef}
                    className="task_item"
                    $isDragging={snapshot.isDragging}
                    $isSelected={
                      !!selectedTasks.find(({ id }) => id === item.id)
                    }
                    onClick={() => onClick({ item, status })}
                    style={{
                      ...itemProvided.draggableProps.style,
                    }}
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
