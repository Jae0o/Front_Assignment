import { useCallback, useState } from "react";

import { DragUpdate } from "react-beautiful-dnd";

import { getCheckedStatusType, taskMovingValidation } from "../../utils";
import { TaskItemListType } from "@/types";

interface UseDragUpdateProps {
  items: TaskItemListType;
}

const useDragUpdate = ({ items }: UseDragUpdateProps) => {
  const [isDisablePlace, setIsDisablePlace] = useState(false);

  const onDragUpdate = useCallback(
    ({ source, destination }: DragUpdate) => {
      if (!destination) {
        return setIsDisablePlace(false);
      }

      const sourceId = getCheckedStatusType(source.droppableId);
      const destinationId = getCheckedStatusType(destination.droppableId);

      if (!sourceId || !destinationId) {
        return setIsDisablePlace(false);
      }

      const destinationLength = items[destinationId].length;
      if (items[sourceId][source.index].number % 2 === 0 && items[destinationId].length) {
        const sourceIndex = source.index;
        let destinationIndex = destination.index;
        if (sourceId === destinationId && sourceIndex === destinationIndex) {
          return setIsDisablePlace(false);
        }

        if (sourceIndex < destinationIndex) {
          destinationIndex++;
        }

        if (destinationLength === destinationIndex) {
          return setIsDisablePlace(false);
        }

        if (items[destinationId][destinationIndex].number % 2 !== 0) {
          return setIsDisablePlace(false);
        }

        console.log("source");
        console.log(items[sourceId][sourceIndex], source.index);
        console.log("des");
        console.log(items[destinationId][destinationIndex], destination.index);
        return setIsDisablePlace(true);
      }

      if (taskMovingValidation({ start: sourceId, end: destinationId })) {
        return setIsDisablePlace(true);
      }

      return setIsDisablePlace(false);
    },
    [items]
  );

  return {
    onDragUpdate,
    isDisablePlace,
  };
};

export default useDragUpdate;
