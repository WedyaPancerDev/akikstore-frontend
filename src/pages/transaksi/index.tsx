import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import TransactionModule from "./module/TransaksiModule";

const Transaksi = (): JSX.Element => {
  return (
    <PageContainer title="Transaksi - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Transaksi",
          description:
            "Di sini Anda dapat melihat, menambah, mengedit, dan menghapus data transaksi.",
        }}
      />
      <Box marginTop="20px">
        <TransactionModule />
      </Box>
    </PageContainer>
  );
};

export default Transaksi;
