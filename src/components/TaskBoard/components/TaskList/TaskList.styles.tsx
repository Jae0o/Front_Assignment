import styled from "styled-components";

export const TaskListLayout = styled.li<{
  $isDraggingOver: boolean;
  $isDropDisabled: boolean;
  $isDisablePlace: boolean;
}>`
  width: 20rem;
  min-width: 20rem;
  min-height: 50rem;

  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => theme.padding.grid}rem;
  background-color: ${({ theme }) => theme.colors.white_300};

  border-radius: ${({ theme }) => theme.borderRadius.radius12};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};

  border: solid
    ${({ theme, $isDraggingOver, $isDropDisabled, $isDisablePlace }) => {
      if ($isDraggingOver && $isDropDisabled) {
        return `${theme.colors.red_700} 0.2rem`;
      }

      if ($isDraggingOver && $isDisablePlace) {
        return `${theme.colors.red_700} 0.2rem`;
      }

      if ($isDraggingOver) {
        return `${theme.colors.green_500} 0.2rem`;
      }

      return `${theme.colors.gray_400} 0.1rem`;
    }};

  transition: border 0.3s;
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
