import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Produk = (): JSX.Element => {
  return (
    <PageContainer title="Produk - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "List Produk",
          description:
            "Di sini Anda dapat melihat, menambah, mengedit, dan menghapus data produk.",
        }}
      />
      <Box marginTop="20px"></Box>
    </PageContainer>
  );
};

export default Produk;
