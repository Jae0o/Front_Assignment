import { DraggableLocation } from "react-beautiful-dnd";

import getCheckedStatusType from "../getCheckedStatusType/getCheckedStatusType";
import { TaskItemListType } from "@/types";

type TaskMovingValidation = (params: {
  selectedTasks: string[];
  source: DraggableLocation;
  destination: DraggableLocation;
  items: TaskItemListType;
}) => string | false;

const getValidationMessage: TaskMovingValidation = ({
  source,
  destination,
  items,
  selectedTasks,
}) => {
  const sourceId = getCheckedStatusType(source.droppableId);
  const destinationId = getCheckedStatusType(destination.droppableId);

  if (!sourceId || !destinationId) {
    return "이동이 불가능합니다.";
  }

  if (sourceId === "NO_STATUS" && destinationId === "IN_PROGRESS") {
    return "1번에서 3번으로 이동은 불가능합니다.";
  }

  // if (start === "TODO" && end === "DONE") {
  //   return "2번에서 4번으로 이동은 불가능합니다.";
  // }

  // if (start === "DONE" && end === "TODO") {
  //   return "4번에서 2번으로 이동은 불가능합니다.";
  // }

  const destinationLength = items[destinationId].length;
  if (items[sourceId][source.index].number % 2 === 0 && items[destinationId].length) {
    const sourceIndex = source.index;
    let destinationIndex = destination.index;

    if (sourceId === destinationId && sourceIndex === destinationIndex) {
      return false;
    }

    if (sourceId === destinationId && sourceIndex < destinationIndex) {
      destinationIndex++;
    }

    if (destinationLength === destinationIndex) {
      return false;
    }

    const destinationItem = items[destinationId][destinationIndex];
    if (selectedTasks.includes(destinationItem.id)) {
      return false;
    }

    if (destinationItem.number % 2 !== 0) {
      return false;
    }

    return "짝수 아이템은 짝수 아이템앞으로 이동할 수 없습니다.";
  }

  return false;
};

export default getValidationMessage;
