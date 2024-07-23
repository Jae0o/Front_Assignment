import styled from "styled-components";

export const TaskListContainer = styled.ul<{ $isDraggingOver: boolean }>`
  width: 20rem;

  padding: ${({ theme }) => theme.padding.grid}rem;

  background-color: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "lightblue" : "lightgrey"};
`;

export const TaskItem = styled.li<{
  $isDragging: boolean;
}>`
  padding: ${({ theme }) => theme.padding.grid * 2}rem;
  margin-bottom: ${({ theme }) => theme.padding.grid}rem;

  background-color: ${({ $isDragging }) =>
    $isDragging ? "lightgreen" : "grey"};

  user-select: none;
`;
