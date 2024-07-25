import { OnClickItem } from "@/types";
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
  const onClick: OnClickItem = useCallback(
    ({ itemId, status, isSelected }) => {
      if (isSelected) {
        setSelectedTasks((prevTasks) => prevTasks.filter((id) => id !== itemId));
        return;
      }

      if (status !== selectedStatus) {
        setSelectedStatus(status);
        setSelectedTasks([itemId]);
        return;
      }

      setSelectedTasks((prevTasks) => [...prevTasks, itemId]);
    },
    [selectedStatus]
  );

  useEffect(() => {
    const handleAwayClick = ({ target }: MouseEvent | TouchEvent) => {
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
    window.addEventListener("touchstart", handleAwayClick);

    return () => {
      window.removeEventListener("click", handleAwayClick);
      window.removeEventListener("touchstart", handleAwayClick);
    };
  }, [isDragging]);

  return onClick;
};

export default useOnClick;
