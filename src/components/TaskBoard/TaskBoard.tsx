import { useCallback, useState } from "react";

import * as S from "./TaskBoard.styles";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { TaskList } from "./components";
import { TaskItemType, TaskStatusType } from "@/types";

export const TASK_STATUS: TaskStatusType[] = [
  "No Status",
  "ToDo",
  "In Progress",
  "Done",
];

const TaskBoard = () => {
  const getItems = (count: number): TaskItemType[] =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
      status: "No Status",
    }));

  const [items, setItems] = useState<TaskItemType[]>(getItems(10));

  const reorder = (
    list: TaskItemType[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      console.log(result);

      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );

      setItems(newItems);
    },
    [items]
  );

  return (
    <S.TaskBoardLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        {TASK_STATUS.map((status) => (
          <TaskList
            key={status}
            items={items.filter((item) => status === item.status)}
            status={status}
          />
        ))}
      </DragDropContext>
    </S.TaskBoardLayout>
  );
};

export default TaskBoard;
