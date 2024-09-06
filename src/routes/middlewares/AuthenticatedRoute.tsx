import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import useCookie from "hooks/useCookie";
import { setTokenBearer } from "utils/axios";
import PageLoader from "components/PageLoader";
import { setProfile } from "store/apps/DashboardSlice";
import { useProfileUser } from "hooks/react-query/useAuth";
import { AppState, useDispatch, useSelector } from "store/Store";
import { ERROR_CODE_UNAUTHENTICATED } from "utils/http";
import type { ValidateProps } from "types";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
};

const AuthenticatedRoute = ({
  children,
}: AuthenticatedRouteProps): JSX.Element => {
  const { getCurrentCookie, removeFromCookie, getFromLocalStorage } =
    useCookie();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: profileUserData,
    isLoading: isLoadingProfile,
    error,
  } = useProfileUser();
  const { profile } = useSelector((state: AppState) => state.dashboard);

  const token = getCurrentCookie();
  const secureValue = getFromLocalStorage(
    "validate"
  ) as unknown as ValidateProps;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleUnauthenticated = () => {
    removeFromCookie("@key");
    setTokenBearer("");
    navigate("/masuk", { replace: true });
    setIsAuthenticated(false);
  };

  const handleSessionExpired = () => {
    removeFromCookie("@key");
    setTokenBearer("");
    navigate("/masuk", { replace: true });
    toast.error("Sesi Anda telah berakhir, silahkan login kembali");
  };

  useEffect(() => {
    if (secureValue?.status === "signin") {
      const currentRole = secureValue.role;

      if (["admin", "employee"].includes(currentRole)) {
        navigate("/staff", { replace: true });
      } else {
        navigate("/pelanggan", { replace: true });
      }
    }
  }, [secureValue?.status]);

  useEffect(() => {
    if (!token || !secureValue) {
      handleUnauthenticated();
    } else {
      setIsAuthenticated(true);

      if (!profile && profileUserData?.data) {
        dispatch(setProfile(profileUserData.data));
      }
    }
  }, [token, profile, profileUserData, dispatch, secureValue]);

  useEffect(() => {
    if (
      error &&
      (error as AxiosError)?.response?.status === ERROR_CODE_UNAUTHENTICATED
    ) {
      handleSessionExpired();
    }
  }, [error]);

  if (!isAuthenticated || isLoadingProfile) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
