import { useCallback, useState } from "react";

import * as S from "./TaskBoard.styles";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { TaskList } from "./components";
import { TaskItemType, TaskItemListType, TaskStatusType } from "@/types";
import useDragEnd from "./hooks/useDragEnd/useDragEnd";

export const TASK_STATUS: TaskStatusType[] = [
  "NO_STATUS",
  "TODO",
  "IN_PROGRESS",
  "DONE",
];

const TaskBoard = () => {
  const getItems = (count: number): TaskItemType[] =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
      status: "NO_STATUS",
    }));

  const [items, setItems] = useState<TaskItemListType>({
    NO_STATUS: getItems(10),
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  });

  const onDragEnd = useDragEnd({ items, setItems });

  return (
    <S.TaskBoardLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        {TASK_STATUS.map((status) => (
          <TaskList key={status} items={items[status]} status={status} />
        ))}
      </DragDropContext>
    </S.TaskBoardLayout>
  );
};

export default TaskBoard;
