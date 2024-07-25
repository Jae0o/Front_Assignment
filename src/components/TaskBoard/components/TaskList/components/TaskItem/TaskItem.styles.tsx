import styled from "styled-components";

export const TaskItem = styled.li<{
  $isDragging: boolean;
  $isDisablePlace: boolean;
  $isSelected: boolean;
}>`
  width: 100%;
  height: 4rem;
  padding: 0.6rem;

  display: flex;

  align-items: center;

  font-size: 1.2rem;

  background-color: ${({ theme }) => theme.colors.white_500};

  border: 0.2rem solid
    ${({ $isDragging, $isDisablePlace, $isSelected, theme }) => {
      if ($isDragging && $isDisablePlace) {
        return theme.colors.red_700;
      }

      if ($isSelected && $isDisablePlace) {
        return theme.colors.red_700;
      }

      if ($isSelected) {
        return theme.colors.blue_500;
      }

      return theme.colors.gray_400;
    }};
  border-radius: ${({ theme }) => theme.borderRadius.radius8};
`;
