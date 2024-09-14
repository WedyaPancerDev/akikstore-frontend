import { Box } from "@mui/material";

import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

import KuponModule from "./module/KuponModule";

const Kupon = (): JSX.Element => {
  return (
    <PageContainer title="Kupon - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Kupon",
          description:
            "Kupon adalah fitur yang memungkinkan Anda untuk memberikan diskon kepada pelanggan. Anda dapat membuat kupon dengan berbagai jenis diskon, seperti diskon persentase, dan diskon nominal",
        }}
      />

      <Box marginTop="20px">
        <KuponModule />
      </Box>
    </PageContainer>
  );
};

export default Kupon;
