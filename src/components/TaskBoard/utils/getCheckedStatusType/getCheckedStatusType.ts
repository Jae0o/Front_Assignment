import { TaskStatusType } from "@/types";

type GetCheckedStatusTypeFunc = (status: string) => TaskStatusType | false;

const getCheckedStatusType: GetCheckedStatusTypeFunc = (status) => {
  if (
    status !== "NO_STATUS" &&
    status !== "TODO" &&
    status !== "IN_PROGRESS" &&
    status !== "DONE"
  ) {
    return false;
  }

  return status;
};

export default getCheckedStatusType;
