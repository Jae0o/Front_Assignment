import { TaskItemType, TaskStatusType } from "@/types";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface UseOnClickProps {
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  setSelectedTasks: Dispatch<SetStateAction<TaskItemType[]>>;
  selectedStatus: string;
}

const useOnClick = ({
  setSelectedStatus,
  setSelectedTasks,
  selectedStatus,
}: UseOnClickProps) => {
  const onClick = useCallback(
    ({ item, status }: { item: TaskItemType; status: TaskStatusType }) => {
      if (status !== selectedStatus) {
        setSelectedStatus(status);
        setSelectedTasks([item]);
        return;
      }

      setSelectedStatus(status);
      setSelectedTasks((prevTasks) => [...prevTasks, item]);
    },
    [setSelectedStatus, setSelectedTasks, selectedStatus]
  );

  useEffect(() => {
    const handleAwayClick = ({ target }: MouseEvent) => {
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
