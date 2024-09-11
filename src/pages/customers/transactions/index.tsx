import { Box } from "@mui/material";

import TransactionModule from "./module/TransactionModule";
import PageContainer from "components/Container/PageContainer";

const Transactions = () => {
  return (
    <PageContainer title="AKIKSTORE - Pembayaran" description="#">
      <Box sx={{ marginTop: "20px" }}>
        <TransactionModule />
      </Box>
    </PageContainer>
  );
};

export default Transactions;
