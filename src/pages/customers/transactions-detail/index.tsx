import { Box } from "@mui/material";

import TransactionDetailModule from "./module/TransactionDetailModule";
import PageContainer from "components/Container/PageContainer";

const TransactionsDetail = () => {
  return (
    <PageContainer title="AKIKSTORE - Riwayat Transaksi Pelanggan" description="#">
      <Box>
        <TransactionDetailModule />
      </Box>
    </PageContainer>
  );
};

export default TransactionsDetail;
