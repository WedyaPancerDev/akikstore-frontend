import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCookie from "hooks/useCookie";
import { setTokenBearer } from "utils/axios";
import PageLoader from "components/PageLoader";
import { useStatusToken } from "hooks/react-query/useAuth";
import { ERROR_CODE_UNAUTHENTICATED } from "utils/http";
import type { ValidateProps } from "types";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

const AuthenticatedRoute = ({
  children,
}: AuthenticatedRouteProps): JSX.Element => {
  const navigate = useNavigate();
  const {
    getCurrentCookie,
    removeFromCookie,
    getFromLocalStorage,
    removeFromLocalStorage,
  } = useCookie();

  const token = getCurrentCookie();
  const secureValue = getFromLocalStorage(
    "validate"
  ) as unknown as ValidateProps;
  const { error } = useStatusToken(token || "");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleUnauthenticated = () => {
    setTokenBearer("");
    removeFromCookie("@key");
    removeFromLocalStorage("validate");
    navigate("/", { replace: true });
    setIsAuthenticated(false);
    toast.error("Hak akses ditolak, silahkan login kembali");
  };

  const handleSessionExpired = () => {
    setTokenBearer("");
    removeFromCookie("@key");
    navigate("/", { replace: true });
    removeFromLocalStorage("validate");
    setIsAuthenticated(false);
    toast.error("Sesi Anda telah berakhir, silahkan login kembali");
  };

  useEffect(() => {
    if (!token || !secureValue) {
      handleUnauthenticated();
    } else {
      setIsAuthenticated(true);
    }
  }, [token, secureValue]);

  useEffect(() => {
    if (
      error &&
      (error as AxiosError)?.response?.status === ERROR_CODE_UNAUTHENTICATED
    ) {
      handleSessionExpired();
    }
  }, [error]);

  if (!isAuthenticated) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
