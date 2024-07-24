import { TaskStatusType } from "@/types";
import styled from "styled-components";

export const TaskListLayout = styled.li<{
  $isDraggingOver: boolean;
  $isDropDisabled: boolean;
  $status: TaskStatusType;
}>`
  width: 20rem;
  min-width: 20rem;
  min-height: 50rem;

  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => theme.padding.grid}rem;
  background-color: ${({
    $isDraggingOver,
    $isDropDisabled,
    theme,
    $status,
  }) => {
    if ($isDraggingOver && $isDropDisabled) {
      return "red";
    }

    return theme.colors.gray;
  }};

  border-radius: ${({ theme }) => theme.borderRadius.radius12};

  user-select: none;
`;

export const TaskListContainer = styled.ul`
  width: 100%;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.grid}rem;
`;

export const TaskListTitle = styled.h1`
  width: 100%;

  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  text-align: center;
`;

export const TaskItem = styled.li<{
  $isDragging: boolean;
}>`
  width: 100%;
  height: 4rem;
  padding: 0.6rem;

  display: flex;

  align-items: center;

  font-size: 1.2rem;

  background-color: white;

  border: 0.2rem solid gray;
  border-radius: ${({ theme }) => theme.borderRadius.radius8};
`;
