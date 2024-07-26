import { useState } from "react";

import * as S from "./TaskBoard.styles";

import { DragDropContext } from "react-beautiful-dnd";

import { TaskList } from "./components";
import { TaskItemListType, TaskStatusItemType } from "@/types";
import { useDragEnd, useDragStart, useDragUpdate, useOnClick } from "./hooks";
import { getItems } from "./utils";

export const TASK_STATUS: TaskStatusItemType[] = [
  { type: "NO_STATUS", title: "1. No Status" },
  { type: "TODO", title: "2. ToDo" },
  { type: "IN_PROGRESS", title: "3. In Progress" },
  { type: "DONE", title: "4. Done" },
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
  const [isDisablePlace, setIsDisablePlace] = useState(false);

  const onDragStart = useDragStart({
    selectedStatus,
    selectedTasks,
    setIsDragging,
    setSelectedStatus,
    setSelectedTasks,
  });

  const { onDragUpdate } = useDragUpdate({ items, selectedTasks, setIsDisablePlace });

  const onDragEnd = useDragEnd({
    items,
    setItems,
    selectedTasks,
    setIsDragging,
    setSelectedTasks,
    setIsDisablePlace,
  });

  const onClick = useOnClick({
    selectedStatus,
    setSelectedStatus,
    setSelectedTasks,
    isDragging,
  });

  return (
    <S.TaskBoardLayout>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        {TASK_STATUS.map((status) => (
          <TaskList
            items={items[status.type]}
            selectedTasks={selectedTasks}
            key={status.type}
            status={status}
            selectedStatus={selectedStatus}
            isDisablePlace={isDisablePlace}
            disabled={isDragging}
            onClick={onClick}
          />
        ))}
      </DragDropContext>
    </S.TaskBoardLayout>
  );
};

export default TaskBoard;
