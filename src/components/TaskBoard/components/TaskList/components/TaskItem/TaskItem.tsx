import { useMemo } from "react";
import * as S from "./TaskItem.styles";

import { Draggable } from "react-beautiful-dnd";

import { OnClickItem, TaskItemType, TaskStatusType } from "@/types";

interface TaskItemProps {
  index: number;
  status: TaskStatusType;
  item: TaskItemType;
  selectedTasks: string[];
  isDisablePlace: boolean;
  disabled: boolean;
  onClick: OnClickItem;
}

const TaskItem = ({
  index,
  item,
  status,
  selectedTasks,
  isDisablePlace,
  disabled,
  onClick,
}: TaskItemProps) => {
  const isSelected = useMemo(
    () => !!selectedTasks.find((id) => id === item.id),
    [item.id, selectedTasks]
  );

  return (
    <Draggable
      key={item.id}
      draggableId={item.id}
      index={index}
    >
      {(itemProvided, snapshot) => (
        <S.TaskItem
          {...itemProvided.draggableProps}
          {...itemProvided.dragHandleProps}
          ref={itemProvided.innerRef}
          className="task_item"
          onClick={() => onClick({ itemId: item.id, status, isSelected })}
          style={{ ...itemProvided.draggableProps.style }}
          $isDragging={snapshot.isDragging}
          $isSelected={isSelected}
          $isDisablePlace={isDisablePlace}
          $disabled={disabled}
        >
          {item.content}
        </S.TaskItem>
      )}
    </Draggable>
  );
};

export default TaskItem;
