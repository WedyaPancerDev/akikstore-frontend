import { Box } from "@mui/material";
import HeaderLandingCustomer from "components/Customers/Header";

const CustomerLanding = (): JSX.Element => {
  return (
    <Box
      component="section"
      sx={{
        maxWidth: "1080px",
        width: "100%",
        margin: "0 auto",
        border: "1px solid #000",
      }}
    >
      <HeaderLandingCustomer />
    </Box>
  );
};

export default CustomerLanding;
