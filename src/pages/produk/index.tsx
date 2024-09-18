import { Box } from "@mui/material";

import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

import ProdukModule from "./module/ProdukModule";

const Produk = (): JSX.Element => {
  return (
    <PageContainer title="Produk - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "List Produk",
          description:
            "Di sini Anda dapat melihat, menambah, mengedit data produk.",
        }}
      />
      <Box marginTop="20px">
        <ProdukModule />
      </Box>
    </PageContainer>
  );
};

export default Produk;
