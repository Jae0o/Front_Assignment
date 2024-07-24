import { TaskItemListType, TaskItemType, TaskStatusType } from "@/types";
import { Dispatch, SetStateAction, useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { taskMovingValidation } from "../../utils";

interface UseDragEndProps {
  items: TaskItemListType;
  selectedTasks: string[];
  setItems: Dispatch<SetStateAction<TaskItemListType>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setSelectedTasks: Dispatch<SetStateAction<string[]>>;
}

type GetCheckedStatusTypeFunc = (status: string) => TaskStatusType | false;

const useDragEnd = ({
  items,
  setItems,
  selectedTasks,
  setIsDragging,
  setSelectedTasks,
}: UseDragEndProps) => {
  // TODO : 추후 별도 유틸로 분리 고려하기
  const getCheckedStatusType: GetCheckedStatusTypeFunc = useCallback((status) => {
    if (
      status !== "NO_STATUS" &&
      status !== "TODO" &&
      status !== "IN_PROGRESS" &&
      status !== "DONE"
    ) {
      return false;
    }

    return status;
  }, []);

  const moveMultiTasks = useCallback(
    ({
      sourceId,
      destinationId,
      newItems,
      destinationIndex,
    }: {
      sourceId: TaskStatusType;
      destinationId: TaskStatusType;
      newItems: TaskItemListType;
      destinationIndex: number;
    }) => {
      const removeItems: TaskItemType[] = [];
      const filteredItems: TaskItemType[] = [];

      newItems[sourceId].forEach((item) => {
        if (selectedTasks.includes(item.id)) {
          removeItems.push(item);
          return;
        }

        filteredItems.push(item);
      });

      if (sourceId !== destinationId) {
        newItems[sourceId] = filteredItems;
        newItems[destinationId].splice(destinationIndex, 0, ...removeItems);
      }

      if (sourceId === destinationId) {
        let index = destinationIndex;

        while (index >= 0) {
          if (!selectedTasks.includes(newItems[sourceId][index].id)) {
            break;
          }

          index--;
        }

        if (index <= 0) {
          newItems[destinationId] = [...removeItems, ...filteredItems];
        }

        if (index > 0) {
          const endIndex = filteredItems.findIndex(({ id }) => id === newItems[sourceId][index].id);

          filteredItems.splice(endIndex + 1, 0, ...removeItems);
          newItems[destinationId] = filteredItems;
        }
      }
    },
    [selectedTasks]
  );

  const onDragEnd = useCallback(
    ({ destination, source }: DropResult) => {
      setIsDragging(false);

      if (!destination) {
        return;
      }

      const destinationId = getCheckedStatusType(destination.droppableId);
      const sourceId = getCheckedStatusType(source.droppableId);

      if (!destinationId || !sourceId) {
        return;
      }

      if (taskMovingValidation({ start: sourceId, end: destinationId })) {
        // TODO : 추후 알림 추가
        console.log("이동할 수 없습니다.");
        return;
      }

      const newItems: TaskItemListType = JSON.parse(JSON.stringify(items));

      if (selectedTasks.length === 0) {
        const [removed] = newItems[sourceId].splice(source.index, 1);
        newItems[destinationId].splice(destination.index, 0, removed);
      }

      if (selectedTasks.length > 0) {
        moveMultiTasks({
          sourceId,
          destinationId,
          newItems,
          destinationIndex: destination.index,
        });
      }

      setSelectedTasks([]);
      setItems(newItems);
    },
    [items, selectedTasks]
  );

  return onDragEnd;
};

export default useDragEnd;
