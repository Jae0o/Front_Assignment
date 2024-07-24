import { createContext, useCallback, useState } from "react";
import * as S from "./ToastProvider.styles";
import { ToastItem } from "./components";

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastItemType {
  message: string;
  id: string;
}

const DELETE_TIME = 3000;

export const toastContext = createContext({
  createToast: (message: string) => {},
});

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastList, setToastList] = useState<ToastItemType[]>([]);

  const removeToast = useCallback((id: string) => {
    setToastList((toastList) => toastList.filter((toast) => toast.id !== id));
  }, []);

  const createToast = useCallback(
    (message: string) => {
      const id = `${Math.random()}${new Date()}`;

      setTimeout(() => removeToast(id), DELETE_TIME);

      setToastList((toastList) => [...toastList, { id, message }]);
    },
    [DELETE_TIME]
  );

  return (
    <toastContext.Provider value={{ createToast }}>
      {children}
      <S.ToastContainer>
        {toastList.map(({ message, id }) => (
          <ToastItem
            key={id}
            message={message}
            onClick={() => removeToast(id)}
          />
        ))}
      </S.ToastContainer>
    </toastContext.Provider>
  );
};

export default ToastProvider;
