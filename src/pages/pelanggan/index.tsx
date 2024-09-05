import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Pelanggan = (): JSX.Element => {
  return (
    <PageContainer title="Pelanggan - AKIKSTORE" description="#">
      <BannerTag type="pelanggan" />
      <Box></Box>
    </PageContainer>
  );
};

export default Pelanggan;
