import { toastContext } from "@/components/Toast/ToastProvider";
import { useContext } from "react";

const useToast = () => {
  const { createToast } = useContext(toastContext);

  return createToast;
};

export default useToast;
