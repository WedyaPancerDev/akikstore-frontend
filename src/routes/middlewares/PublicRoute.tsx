import useCookie from "hooks/useCookie";
import { useEffect } from "react";
import { useNavigate } from "react-router";

type PublicRouteProps = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps): JSX.Element => {
  const { getCurrentCookie } = useCookie();
  const navigate = useNavigate();

  const token = getCurrentCookie();

  useEffect(() => {
    if (token) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [token]);

  return <>{children}</>;
};

export default PublicRoute;
