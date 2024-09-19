import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

import IncomeModule from "./module/IncomeModule";

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
      <Box marginTop="20px" component="section">
        <IncomeModule />
      </Box>
    </PageContainer>
  );
};

export default Income;
