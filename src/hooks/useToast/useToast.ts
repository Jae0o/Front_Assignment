import { useContext } from "react";

import { toastContext } from "@/components/Toast/ToastProvider";

const useToast = () => {
  const { createToast } = useContext(toastContext);

  return createToast;
};

export default useToast;
