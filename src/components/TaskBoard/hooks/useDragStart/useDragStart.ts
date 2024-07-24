import { Dispatch, SetStateAction, useCallback } from "react";
import { DragStart } from "react-beautiful-dnd";

interface UseDragStartProps {
  selectedStatus: string;
  selectedTasks: string[];
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setSelectedTasks: Dispatch<SetStateAction<string[]>>;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
}

const useDragStart = ({
  selectedStatus,
  selectedTasks,
  setIsDragging,
  setSelectedTasks,
  setSelectedStatus,
}: UseDragStartProps) => {
  const onDragStart = useCallback(
    ({ source, draggableId }: DragStart) => {
      setIsDragging(true);

      if (selectedStatus !== source.droppableId) {
        setSelectedTasks([]);
        setSelectedStatus(source.droppableId);
        return;
      }

      if (!selectedTasks.includes(draggableId)) {
        setSelectedTasks((prevTasks) => [...prevTasks, draggableId]);
        return;
      }
    },
    [selectedStatus, selectedTasks]
  );

  return onDragStart;
};

export default useDragStart;
