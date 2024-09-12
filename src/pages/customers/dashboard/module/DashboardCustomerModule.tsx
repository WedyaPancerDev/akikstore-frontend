import { Box, Theme, useMediaQuery } from "@mui/material";
import BannerTag from "components/BannerTag";

const DashboardCustomerModule = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <Box
      component="div"
      position="relative"
      sx={{
        padding: "10px 16px",
        marginX: mdUp ? 0 : "1rem",
      }}
    >
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Dashboard",
          description: "Dashboard pelanggan Akikstore",
        }}
      />
    </Box>
  );
};

export default DashboardCustomerModule;
