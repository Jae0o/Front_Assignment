import styled from "styled-components";

export const TaskItem = styled.li<{
  $isDragging: boolean;
  $isDisablePlace: boolean;
  $isSelected: boolean;
  $disabled: boolean;
}>`
  width: 100%;
  height: 4rem;
  padding: 0.6rem;

  display: flex;

  align-items: center;

  font-size: 1.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  filter: ${({ $disabled, $isSelected, $isDragging }) =>
    (($disabled && $isSelected) || $isDragging) && "brightness(85%)"};

  border: solid
    ${({ $isDragging, $isDisablePlace, $isSelected, theme }) => {
      if ($isDragging && $isDisablePlace) {
        return `${theme.colors.red} 0.2rem`;
      }

      if ($isSelected && $isDisablePlace) {
        return `${theme.colors.red} 0.2rem`;
      }

      if ($isSelected) {
        return `${theme.colors.blue} 0.2rem`;
      }

      return `${theme.colors.gray} 0.1rem`;
    }};
  border-radius: ${({ theme }) => theme.borderRadius.radius8};
`;
