import { TaskItemType, TaskStatusType } from "@/types";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface UseOnClickProps {
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  setSelectedTasks: Dispatch<SetStateAction<string[]>>;
  selectedStatus: string;
  isDragging: boolean;
}

const useOnClick = ({
  setSelectedStatus,
  setSelectedTasks,
  selectedStatus,
  isDragging,
}: UseOnClickProps) => {
  const onClick = useCallback(
    ({ itemId, status }: { itemId: string; status: TaskStatusType }) => {
      if (status !== selectedStatus) {
        setSelectedStatus(status);
        setSelectedTasks([itemId]);
        return;
      }

      setSelectedStatus(status);
      setSelectedTasks((prevTasks) => [...prevTasks, itemId]);
    },
    [setSelectedStatus, setSelectedTasks, selectedStatus]
  );

  useEffect(() => {
    const handleAwayClick = ({ target }: MouseEvent) => {
      if (isDragging) {
        return;
      }

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

  return onClick;
};

export default useOnClick;
