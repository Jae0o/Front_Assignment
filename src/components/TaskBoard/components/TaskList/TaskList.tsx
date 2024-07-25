import { useMemo } from "react";
import * as S from "./TaskList.styles";

import { Droppable } from "react-beautiful-dnd";

import { OnClickItem, TaskItemType, TaskStatusType } from "@/types";
import { STATUS_NAMES } from "../../TaskBoard.constants";
import { TaskItem } from "./components";

interface TaskListProps {
  items: TaskItemType[];
  selectedTasks: string[];

  status: TaskStatusType;
  selectedStatus: string;
  isDisablePlace: boolean;

  onClick: OnClickItem;
}

const TaskList = ({
  items,
  selectedTasks,
  status,
  selectedStatus,
  isDisablePlace,
  onClick,
}: TaskListProps) => {
  const isDropDisabled = useMemo(
    () => selectedStatus === "NO_STATUS" && status === "IN_PROGRESS",
    [status, selectedStatus]
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
              <TaskItem
                key={item.id}
                index={index}
                item={item}
                status={status}
                selectedTasks={selectedTasks}
                isDisablePlace={isDisablePlace}
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
