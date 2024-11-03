import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import PelangganModule from "./module/PelangganModule";

const Pelanggan = (): JSX.Element => {
  return (
    <PageContainer title="Pelanggan - ANTIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Pelanggan Terdaftar",
          description:
            "Di sini Anda dapat melihat informasi pelanggan.",
        }}
      />

      <Box marginTop="20px">
        <PelangganModule />
      </Box>
    </PageContainer>
  );
};

export default Pelanggan;
