import { Box } from "@mui/material";

import DashboardCustomerModule from "./module/DashboardCustomerModule";
import PageContainer from "components/Container/PageContainer";

const Transactions = () => {
  return (
    <PageContainer title="ANTIKSTORE - Dashboard Pelanggan" description="#">
      <Box component="div" className="page-container">
        <DashboardCustomerModule />
      </Box>
    </PageContainer>
  );
};

export default Transactions;
