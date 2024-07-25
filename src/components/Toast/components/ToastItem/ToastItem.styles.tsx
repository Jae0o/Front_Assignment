import styled, { keyframes } from "styled-components";

export const ToastItemLayout = styled.li`
  width: 24rem;
  height: 8rem;

  position: relative;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.radius12};
  box-shadow: ${({ theme }) => theme.boxShadow.small};

  overflow: hidden;
`;

export const ToastItemContent = styled.p`
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
  padding-top: 2.4rem;

  font-size: 1.4rem;

  word-break: keep-all;
`;

export const CloseButton = styled.button`
  width: 2rem;
  height: 2rem;

  position: absolute;
  top: 0.4rem;
  right: 0.4rem;

  cursor: pointer;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 1rem;

  position: relative;

  background-color: ${({ theme }) => theme.colors.semi_white};
`;

const progressMove = keyframes`
  0%{
    translate: -100%;
  }

  100%{
    translate: 0%;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.red_700};

  translate: -100%;

  animation: ${progressMove} 3s linear;
`;
