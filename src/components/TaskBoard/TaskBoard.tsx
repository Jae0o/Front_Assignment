import { useCallback, useState } from "react";

import * as S from "./TaskBoard.styles";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { TaskList } from "./components";
import { TaskItemType, TaskItemListType, TaskStatusType } from "@/types";

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

  const reorder = ({
    list,
    sourceId,
    destinationId,
    startIndex,
    endIndex,
  }: {
    list: TaskItemListType;
    sourceId: TaskStatusType;
    destinationId: TaskStatusType;
    startIndex: number;
    endIndex: number;
  }) => {
    const [removed] = list[sourceId].splice(startIndex, 1);
    list[destinationId].splice(endIndex, 0, removed);
  };

  const getCheckedStatusType = (status: string): TaskStatusType | false => {
    if (
      status !== "NO_STATUS" &&
      status !== "TODO" &&
      status !== "IN_PROGRESS" &&
      status !== "DONE"
    ) {
      return false;
    }

    return status;
  };

  const onDragEnd = useCallback(
    ({ destination, source }: DropResult) => {
      if (!destination) {
        return;
      }

      const destinationId = getCheckedStatusType(destination.droppableId);
      const sourceId = getCheckedStatusType(source.droppableId);

      if (!destinationId || !sourceId) {
        return;
      }

      const newItems: TaskItemListType = JSON.parse(JSON.stringify(items));

      reorder({
        list: newItems,
        sourceId: sourceId,
        destinationId: destinationId,
        startIndex: source.index,
        endIndex: destination.index,
      });

      setItems(newItems);
    },
    [items]
  );

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
