import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { authLogout } from "services/auth";
import useCookie from "hooks/useCookie";
import { AxiosError } from "axios";
import { ERROR_CODE_UNAUTHENTICATED } from "utils/http";
import { setTokenBearer } from "utils/axios";

interface ILogoutHookReturn {
  handleLogout: () => Promise<void>;
  isLoadingLogout: boolean;
}

const useLogout = (): ILogoutHookReturn => {
  const navigate = useNavigate();
  const { removeFromCookie, removeFromLocalStorage } = useCookie();

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const resetAndRedirect = (): void => {
    setTokenBearer("");
    removeFromCookie("@key");
    removeFromLocalStorage("validate");

    navigate("/masuk", {
      replace: true,
    });
  };

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoadingLogout(true);
      const response = await authLogout();

      if (response?.success) {
        resetAndRedirect();

        toast.success("Berhasil logout!");
        setIsLoadingLogout(false);
        return;
      }

      console.error({ response });
      toast.error("Gagal logout, silahkan coba lagi!");
      setIsLoadingLogout(false);
    } catch (error) {
      const status = (error as AxiosError)?.response?.status;
      console.error({ error });

      setIsLoadingLogout(false);
      if (status === ERROR_CODE_UNAUTHENTICATED) {
        resetAndRedirect();

        window.location.reload();
        toast.error("Sesi Anda telah berakhir, silahkan login kembali");
      } else {
        toast.error("Gagal logout, silahkan coba lagi!");
      }
    }
  };

  return { handleLogout, isLoadingLogout };
};

export default useLogout;
