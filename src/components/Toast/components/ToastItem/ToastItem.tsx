import * as S from "./ToastItem.styles";

import { CloseIcon } from "@/components";

interface ToastItemProps {
  message: string;
  onClick: () => void;
}

const ToastItem = ({ message, onClick }: ToastItemProps) => {
  return (
    <S.ToastItemLayout>
      <S.CloseButton onClick={onClick}>
        <CloseIcon size={"2rem"} />
      </S.CloseButton>

      <S.ToastItemContent>{message}</S.ToastItemContent>

      <S.ProgressBarContainer>
        <S.ProgressBar />
      </S.ProgressBarContainer>
    </S.ToastItemLayout>
  );
};

export default ToastItem;
