import { useCallback, useState } from "react";

import { DragUpdate } from "react-beautiful-dnd";

import { getValidationMessage } from "../../utils";
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

      const hasValidationMessage = !!getValidationMessage({ source, destination, items });

      return setIsDisablePlace(hasValidationMessage);
    },
    [items]
  );

  return {
    onDragUpdate,
    isDisablePlace,
  };
};

export default useDragUpdate;
