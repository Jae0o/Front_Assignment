import styled from "styled-components";

export const TaskListContainer = styled.ul<{ $isDraggingOver: boolean }>`
  width: 20rem;
  min-width: 20rem;
  min-height: 50rem;
  padding: ${({ theme }) => theme.padding.grid}rem;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.padding.grid}rem;

  background-color: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "lightblue" : "lightgrey"};
  border-radius: ${({ theme }) => theme.borderRadius.radius12};
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

  border: 0.2rem solid ${({ $isDragging }) => ($isDragging ? "red" : "gray")};
  border-radius: ${({ theme }) => theme.borderRadius.radius8};

  user-select: none;
`;
