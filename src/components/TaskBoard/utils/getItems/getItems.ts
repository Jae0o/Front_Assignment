import { TaskItemType } from "@/types";

type GetItems = (count: number) => TaskItemType[];

const getItems: GetItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
    number: k,
  }));

export default getItems;
