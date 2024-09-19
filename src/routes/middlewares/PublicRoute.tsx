import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { ValidateProps } from "types";
import useCookie from "hooks/useCookie";

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const { getCurrentCookie, getFromLocalStorage } = useCookie();
  const navigate = useNavigate();

  const token = getCurrentCookie();
  const secureValue = getFromLocalStorage(
    "validate"
  ) as unknown as ValidateProps;

  useEffect(() => {
    if (token && secureValue?.status === "signin") {
      const currentRole = (secureValue as unknown as ValidateProps)?.role;

      if (["admin", "employee"].includes(currentRole)) {
        navigate("/staff", { replace: true });
      } else {
        navigate("/pelanggan", { replace: true });
      }
    }
  }, [token, secureValue?.status]);

  return <>{children}</>;
};

export default PublicRoute;
