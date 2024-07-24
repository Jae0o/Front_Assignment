import { useEffect, useState } from "react";

import * as S from "./TaskBoard.styles";

import { DragDropContext, DragStart } from "react-beautiful-dnd";

import { TaskList } from "./components";
import { TaskItemListType, TaskItemType, TaskStatusType } from "@/types";
import { useDragEnd } from "./hooks";
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
  const [selectedTasks, setSelectedTasks] = useState<TaskItemType[]>([]);

  const onDragEnd = useDragEnd({ items, setItems });

  const onDragStart = ({ source }: DragStart) => {
    if (selectedStatus === source.droppableId) {
      return;
    }

    setSelectedTasks([]);
    setSelectedStatus(source.droppableId);
  };

  const onClick = ({
    item,
    status,
  }: {
    item: TaskItemType;
    status: TaskStatusType;
  }) => {
    if (status !== selectedStatus) {
      setSelectedStatus(status);
      setSelectedTasks([item]);
      return;
    }

    setSelectedStatus(status);
    setSelectedTasks((prevTasks) => [...prevTasks, item]);
  };

  useEffect(() => {
    const handleAwayClick = ({ target }: MouseEvent) => {
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.className.includes("task_item")) {
        return;
      }

      setSelectedTasks([]);
      setSelectedStatus("");
    };

    window.addEventListener("click", handleAwayClick);

    return () => {
      window.removeEventListener("click", handleAwayClick);
    };
  });

  return (
    <S.TaskBoardLayout>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        {TASK_STATUS.map((status) => (
          <TaskList
            items={items[status]}
            selectedTasks={selectedTasks}
            key={status}
            status={status}
            selectedStatus={selectedStatus}
            onClick={onClick}
          />
        ))}
      </DragDropContext>
    </S.TaskBoardLayout>
  );
};

export default TaskBoard;
