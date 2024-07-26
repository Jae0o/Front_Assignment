import { useMemo } from "react";
import * as S from "./TaskList.styles";

import { Droppable } from "react-beautiful-dnd";

import { OnClickItem, TaskItemType, TaskStatusItemType } from "@/types";
import { TaskItem } from "./components";

interface TaskListProps {
  items: TaskItemType[];
  selectedTasks: string[];

  status: TaskStatusItemType;
  selectedStatus: string;
  isDisablePlace: boolean;

  disabled: boolean;
  onClick: OnClickItem;
}

const TaskList = ({
  items,
  selectedTasks,
  status,
  selectedStatus,
  isDisablePlace,
  disabled,
  onClick,
}: TaskListProps) => {
  const { type: statusType, title } = status;

  const isDropDisabled = useMemo(
    () => selectedStatus === "NO_STATUS" && statusType === "IN_PROGRESS",
    [status, selectedStatus]
  );

  return (
    <Droppable droppableId={statusType}>
      {(provided, snapshot) => (
        <S.TaskListLayout
          $isDraggingOver={snapshot.isDraggingOver}
          $isDropDisabled={isDropDisabled}
          $isDisablePlace={isDisablePlace}
        >
          <S.TaskListTitle>{title}</S.TaskListTitle>
          <S.TaskListContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <TaskItem
                key={item.id}
                index={index}
                item={item}
                status={statusType}
                selectedTasks={selectedTasks}
                isDisablePlace={isDisablePlace}
                disabled={disabled}
                onClick={onClick}
              />
            ))}
            {provided.placeholder}
          </S.TaskListContainer>
        </S.TaskListLayout>
      )}
    </Droppable>
  );
};

export default TaskList;
