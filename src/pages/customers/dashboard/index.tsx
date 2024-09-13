import { Box } from "@mui/material";

import DashboardCustomerModule from "./module/DashboardCustomerModule";
import PageContainer from "components/Container/PageContainer";

const Transactions = () => {
  return (
    <PageContainer title="AKIKSTORE - Dashboard Pelanggan" description="#">
      <Box component="div" className="page-container">
        <DashboardCustomerModule />
      </Box>
    </PageContainer>
  );
};

export default Transactions;
