import { useState } from "react";

import { DragUpdate } from "react-beautiful-dnd";

import { taskMovingValidation } from "../../utils";

const useDragUpdate = () => {
  const [isDisablePlace, setIsDisablePlace] = useState(false);

  const onDragUpdate = ({ source, destination }: DragUpdate) => {
    if (!destination) {
      return setIsDisablePlace(false);
    }

    if (
      taskMovingValidation({
        start: source.droppableId,
        end: destination?.droppableId,
      })
    ) {
      return setIsDisablePlace(true);
    }

    return setIsDisablePlace(false);
  };

  return {
    onDragUpdate,
    isDisablePlace,
  };
};

export default useDragUpdate;
