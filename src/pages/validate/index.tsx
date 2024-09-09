import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { Box, Typography } from "@mui/material";

import useCookie from "hooks/useCookie";
import { setTokenBearer } from "utils/axios";

type ValidateProps = {
  role: string;
  user_id: string;
};

const Validate = (): JSX.Element => {
  const navigate = useNavigate();
  const { getCurrentCookie, getFromLocalStorage, removeFromCookie } =
    useCookie();

  const token = getCurrentCookie();
  const secureValue = getFromLocalStorage("validate");

  const handleRedirect = (currentToken: string, currentSecureValue: string) => {
    if (!currentToken && !currentSecureValue) {
      toast.error("💀 Hak akses mu ditolak");

      setTokenBearer("");
      removeFromCookie("@key");
      navigate("/masuk", {
        replace: true,
      });
    }

    const currentRole = (currentSecureValue as unknown as ValidateProps)?.role;

    if (["admin", "employee"].includes(currentRole)) {
      navigate("/staff", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (token && secureValue) {
      handleRedirect(token, secureValue);
    }
  }, [token, secureValue, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h5" fontWeight={600}>
        Redirect <br />
        Please wait ...
      </Typography>
    </Box>
  );
};

export default Validate;
