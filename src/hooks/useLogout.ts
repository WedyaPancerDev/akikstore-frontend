import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { authLogout } from "services/auth";
import useCookie from "hooks/useCookie";
import { AxiosError } from "axios";
import { ERROR_CODE_UNAUTHENTICATED } from "utils/http";
import { setTokenBearer } from "utils/axios";
import { useDispatch } from "store/Store";
import { setProfile } from "store/apps/DashboardSlice";

interface ILogoutHookReturn {
  handleLogout: (url: string) => Promise<void>;
  isLoadingLogout: boolean;
}

type LogoutProps = Partial<string>;

const useLogout = (): ILogoutHookReturn => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { removeFromCookie, removeFromLocalStorage } = useCookie();

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const resetAndRedirect = (url: string): void => {
    setTokenBearer("");
    removeFromCookie("@key");
    removeFromLocalStorage("validate");
    dispatch(setProfile(null));

    navigate(url, {
      replace: true,
    });
  };

  const handleLogout = async (url: LogoutProps = "/masuk"): Promise<void> => {
    try {
      setIsLoadingLogout(true);
      const response = await authLogout();

      if (response?.success) {
        resetAndRedirect(url);

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
      resetAndRedirect(url);

      if (status === ERROR_CODE_UNAUTHENTICATED) {
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
