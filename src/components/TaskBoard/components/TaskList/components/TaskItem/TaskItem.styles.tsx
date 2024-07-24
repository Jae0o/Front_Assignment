import styled from "styled-components";

export const TaskItem = styled.li<{
  $isDragging: boolean;
  $isSelected: boolean;
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
  background-color: ${({ $isSelected }) => $isSelected && "red"};
`;
