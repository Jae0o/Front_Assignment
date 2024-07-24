import * as S from "./TaskItem.styles";

import { Draggable } from "react-beautiful-dnd";

import { TaskItemType, TaskStatusType } from "@/types";
import { useMemo } from "react";

interface TaskItemProps {
  index: number;
  status: TaskStatusType;
  item: TaskItemType;
  selectedTasks: TaskItemType[];
  isDisablePlace: boolean;
  onClick: (params: { item: TaskItemType; status: TaskStatusType }) => void;
}

const TaskItem = ({
  index,
  item,
  status,
  selectedTasks,
  isDisablePlace,
  onClick,
}: TaskItemProps) => {
  const isSelected = useMemo(
    () => !!selectedTasks.find(({ id }) => id === item.id),
    [item.id, selectedTasks]
  );
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(itemProvided, snapshot) => (
        <S.TaskItem
          {...itemProvided.draggableProps}
          {...itemProvided.dragHandleProps}
          ref={itemProvided.innerRef}
          className="task_item"
          $isDragging={snapshot.isDragging}
          $isSelected={isSelected}
          $isDisablePlace={isDisablePlace}
          onClick={() => onClick({ item, status })}
          style={{
            ...itemProvided.draggableProps.style,
          }}
        >
          {item.content}
        </S.TaskItem>
      )}
    </Draggable>
  );
};

export default TaskItem;
