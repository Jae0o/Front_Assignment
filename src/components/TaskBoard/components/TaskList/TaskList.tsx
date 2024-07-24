import { useMemo } from "react";
import * as S from "./TaskList.styles";

import { Droppable } from "react-beautiful-dnd";

import { TaskItemType, TaskStatusType } from "@/types";
import { STATUS_NAMES } from "../../TaskBoard.constants";
import { taskMovingValidation } from "../../utils";
import { TaskItem } from "./components";

interface TaskListProps {
  items: TaskItemType[];
  selectedTasks: string[];

  status: TaskStatusType;
  selectedStatus: string;
  isDisablePlace: boolean;

  onClick: (params: { itemId: string; status: TaskStatusType }) => void;
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
