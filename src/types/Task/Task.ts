export type TaskStatusType = "NO_STATUS" | "TODO" | "IN_PROGRESS" | "DONE";

export interface TaskItemType {
  id: string;
  content: string;
}

export type TaskItemListType = {
  [key in TaskStatusType]: TaskItemType[];
};
