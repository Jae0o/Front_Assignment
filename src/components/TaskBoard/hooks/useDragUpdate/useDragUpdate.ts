import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { DragUpdate } from "react-beautiful-dnd";

import { getValidationMessage } from "../../utils";
import { TaskItemListType } from "@/types";

interface UseDragUpdateProps {
  selectedTasks: string[];
  items: TaskItemListType;
  setIsDisablePlace: Dispatch<SetStateAction<boolean>>;
}

const useDragUpdate = ({ items, selectedTasks, setIsDisablePlace }: UseDragUpdateProps) => {
  const onDragUpdate = useCallback(
    ({ source, destination }: DragUpdate) => {
      if (!destination) {
        return setIsDisablePlace(false);
      }

      const hasValidationMessage = !!getValidationMessage({
        source,
        destination,
        items,
        selectedTasks,
      });

      return setIsDisablePlace(hasValidationMessage);
    },
    [items, selectedTasks]
  );

  return {
    onDragUpdate,
  };
};

export default useDragUpdate;
