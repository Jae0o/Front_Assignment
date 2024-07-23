export type TaskStatusType = "No Status" | "ToDo" | "In Progress" | "Done";

export interface TaskItemType {
  id: string;
  content: string;
  status: TaskStatusType;
}
