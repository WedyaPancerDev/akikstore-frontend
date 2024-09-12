import { Box } from "@mui/material";
import PageContainer from "components/Container/PageContainer";
import FinalStep from "./module/FinalStep";

const TransactionSuccess = () => {
  return (
    <PageContainer title="AKIKSTORE - Pembayaran" description="#">
      <Box sx={{ marginTop: "20px" }}>
        <FinalStep />
      </Box>
    </PageContainer>
  );
};

export default TransactionSuccess;
