import { Box } from "@mui/material";
import HeaderLandingCustomer from "components/Customers/Header";
import { Outlet } from "react-router-dom";

const UserLandingLayout = () => {
  return (
    <Box
      component="main"
      sx={{
        maxWidth: "950px",
        width: "100%",
        marginInline: "auto",
        paddingTop: "1.5rem",
      }}
    >
      <HeaderLandingCustomer />
      <Outlet />
    </Box>
  );
};

export default UserLandingLayout;
