import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Produk = (): JSX.Element => {
  return (
    <PageContainer title="Produk - AKIKSTORE" description="#">
      <BannerTag type="produk" />
      <Box></Box>
    </PageContainer>
  );
};

export default Produk;
