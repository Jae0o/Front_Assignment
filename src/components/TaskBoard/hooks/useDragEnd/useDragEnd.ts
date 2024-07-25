import { Dispatch, SetStateAction, useCallback } from "react";

import { DropResult } from "react-beautiful-dnd";

import { getCheckedStatusType, getValidationMessage } from "../../utils";
import { useToast } from "@/hooks";
import { TaskItemListType, TaskItemType, TaskStatusType } from "@/types";

interface UseDragEndProps {
  items: TaskItemListType;
  selectedTasks: string[];
  setItems: Dispatch<SetStateAction<TaskItemListType>>;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setSelectedTasks: Dispatch<SetStateAction<string[]>>;
  setIsDisablePlace: Dispatch<SetStateAction<boolean>>;
}

const useDragEnd = ({
  items,
  setItems,
  selectedTasks,
  setIsDragging,
  setSelectedTasks,
  setIsDisablePlace,
}: UseDragEndProps) => {
  const createToast = useToast();

  const moveTasks = useCallback(
    ({
      sourceId,
      destinationId,
      newItems,
      destinationIndex,
      sourceIndex,
    }: {
      sourceId: TaskStatusType;
      destinationId: TaskStatusType;
      newItems: TaskItemListType;
      destinationIndex: number;
      sourceIndex: number;
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
        return;
      }

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

        if (sourceIndex < destinationIndex) {
          filteredItems.splice(endIndex + 1, 0, ...removeItems);
        }

        if (sourceIndex > destinationIndex) {
          filteredItems.splice(endIndex, 0, ...removeItems);
        }

        newItems[destinationId] = filteredItems;
      }
    },
    [selectedTasks]
  );

  const onDragEnd = useCallback(
    ({ destination, source }: DropResult) => {
      setIsDragging(false);
      setIsDisablePlace(false);

      if (!destination) {
        return;
      }

      const destinationId = getCheckedStatusType(destination.droppableId);
      const sourceId = getCheckedStatusType(source.droppableId);

      if (!destinationId || !sourceId) {
        return;
      }

      const validationMessage = getValidationMessage({ source, destination, items, selectedTasks });

      if (validationMessage) {
        createToast(validationMessage);
        setSelectedTasks([]);
        return;
      }

      const newItems: TaskItemListType = JSON.parse(JSON.stringify(items));

      moveTasks({
        sourceId,
        destinationId,
        newItems,
        destinationIndex: destination.index,
        sourceIndex: source.index,
      });

      setSelectedTasks([]);
      setItems(newItems);
    },
    [items, selectedTasks]
  );

  return onDragEnd;
};

export default useDragEnd;
