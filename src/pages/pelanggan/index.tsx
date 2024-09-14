import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Pelanggan = (): JSX.Element => {
  return (
    <PageContainer title="Pelanggan - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Pelanggan Terdaftar",
          description:
            "Di sini Anda dapat melihat, menambah, mengedit pelanggan.",
        }}
      />
      <Box marginTop="20px"></Box>
    </PageContainer>
  );
};

export default Pelanggan;
