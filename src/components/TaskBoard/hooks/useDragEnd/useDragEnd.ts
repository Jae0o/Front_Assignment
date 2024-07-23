import { TaskItemListType, TaskStatusType } from "@/types";
import { Dispatch, SetStateAction, useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";

interface UseDragEndProps {
  items: TaskItemListType;
  setItems: Dispatch<SetStateAction<TaskItemListType>>;
}

type GetCheckedStatusTypeFunc = (status: string) => TaskStatusType | false;

const useDragEnd = ({ items, setItems }: UseDragEndProps) => {
  // TODO : 추후 별도 유틸로 분리 고려하기
  const getCheckedStatusType: GetCheckedStatusTypeFunc = useCallback(
    (status) => {
      if (
        status !== "NO_STATUS" &&
        status !== "TODO" &&
        status !== "IN_PROGRESS" &&
        status !== "DONE"
      ) {
        return false;
      }

      return status;
    },
    []
  );

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

      const [removed] = newItems[sourceId].splice(source.index, 1);
      newItems[destinationId].splice(destination.index, 0, removed);

      setItems(newItems);
    },
    [items]
  );

  return onDragEnd;
};

export default useDragEnd;
