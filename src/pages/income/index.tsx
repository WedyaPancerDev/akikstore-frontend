import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Income = (): JSX.Element => {
  return (
    <PageContainer title="Income - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Pemasukan & Pengeluaran",
          description:
            "Di sini Anda dapat melihat pemasukan dan pengeluaran toko Anda.",
        }}
      />
      <Box marginTop="20px"></Box>
    </PageContainer>
  );
};

export default Income;
