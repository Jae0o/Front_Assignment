export type TaskStatusType = "NO_STATUS" | "TODO" | "IN_PROGRESS" | "DONE";

export interface TaskItemType {
  id: string;
  content: string;
  status: TaskStatusType;
}

export interface TaskItemListType {
  NO_STATUS: TaskItemType[];
  TODO: TaskItemType[];
  IN_PROGRESS: TaskItemType[];
  DONE: TaskItemType[];
}
