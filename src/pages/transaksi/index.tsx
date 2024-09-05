import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Transaksi = (): JSX.Element => {
  return (
    <PageContainer title="Transaksi - AKIKSTORE" description="#">
      <BannerTag type="transaksi" />
      <Box></Box>
    </PageContainer>
  );
};

export default Transaksi;
