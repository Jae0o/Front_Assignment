import { useState } from "react";

import * as S from "./TaskBoard.styles";

import { DragDropContext, DragStart } from "react-beautiful-dnd";

import { TaskList } from "./components";
import { TaskItemListType, TaskItemType, TaskStatusType } from "@/types";
import { useDragEnd, useDragUpdate, useOnClick } from "./hooks";
import { getItems } from "./utils";

export const TASK_STATUS: TaskStatusType[] = [
  "NO_STATUS",
  "TODO",
  "IN_PROGRESS",
  "DONE",
];

const TaskBoard = () => {
  const [items, setItems] = useState<TaskItemListType>({
    NO_STATUS: getItems(10),
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  });
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { isDisablePlace, onDragUpdate } = useDragUpdate();

  const onDragEnd = useDragEnd({
    items,
    setItems,
    selectedTasks,
    setIsDragging,
    setSelectedTasks,
  });

  const onClick = useOnClick({
    selectedStatus,
    setSelectedStatus,
    setSelectedTasks,
    isDragging,
  });

  const onDragStart = ({ source, draggableId }: DragStart) => {
    setIsDragging(true);

    if (selectedStatus !== source.droppableId) {
      setSelectedTasks([]);
      setSelectedStatus(source.droppableId);
      return;
    }

    if (!selectedTasks.includes(draggableId)) {
      setSelectedTasks((prevTasks) => [...prevTasks, draggableId]);
      return;
    }
  };

  return (
    <S.TaskBoardLayout>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        {TASK_STATUS.map((status) => (
          <TaskList
            items={items[status]}
            selectedTasks={selectedTasks}
            key={status}
            status={status}
            selectedStatus={selectedStatus}
            isDisablePlace={isDisablePlace}
            onClick={onClick}
          />
        ))}
      </DragDropContext>
    </S.TaskBoardLayout>
  );
};

export default TaskBoard;
