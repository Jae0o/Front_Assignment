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
  const { id, content } = item;

  const isSelected = useMemo(
    () => !!selectedTasks.find((selectedId) => selectedId === id),
    [id, selectedTasks]
  );

  return (
    <Draggable
      key={id}
      draggableId={id}
      index={index}
    >
      {(itemProvided, snapshot) => (
        <S.TaskItem
          {...itemProvided.draggableProps}
          {...itemProvided.dragHandleProps}
          ref={itemProvided.innerRef}
          className="task_item"
          onClick={() => onClick({ itemId: id, status, isSelected })}
          style={{ ...itemProvided.draggableProps.style }}
          $isDragging={snapshot.isDragging}
          $isSelected={isSelected}
          $isDisablePlace={isDisablePlace}
          $disabled={disabled}
        >
          {content}
        </S.TaskItem>
      )}
    </Draggable>
  );
};

export default TaskItem;
