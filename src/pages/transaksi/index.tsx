import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

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
      <Box marginTop="20px"></Box>
    </PageContainer>
  );
};

export default Transaksi;
