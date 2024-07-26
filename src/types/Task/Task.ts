export type TaskStatusType = "NO_STATUS" | "TODO" | "IN_PROGRESS" | "DONE";

export interface TaskStatusItemType {
  type: TaskStatusType;
  title: string;
}

export interface TaskItemType {
  id: string;
  content: string;
  number: number;
}

export type TaskItemListType = {
  [key in TaskStatusType]: TaskItemType[];
};

export type OnClickItem = (params: {
  itemId: string;
  status: TaskStatusType;
  isSelected: boolean;
}) => void;
