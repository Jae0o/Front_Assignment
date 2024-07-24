import { useState } from "react";

import * as S from "./TaskBoard.styles";

import { DragDropContext, DragStart } from "react-beautiful-dnd";

import { TaskList } from "./components";
import { TaskItemType, TaskItemListType, TaskStatusType } from "@/types";
import { useDragEnd } from "./hooks";

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

  const [draggingId, setDraggingId] = useState("");

  const onDragEnd = useDragEnd({ items, setItems });

  const onDragStart = (start: DragStart) => {
    setDraggingId(start.source.droppableId);
  };

  return (
    <S.TaskBoardLayout>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {TASK_STATUS.map((status) => (
          <TaskList
            key={status}
            items={items[status]}
            status={status}
            draggingId={draggingId}
          />
        ))}
      </DragDropContext>
    </S.TaskBoardLayout>
  );
};

export default TaskBoard;
