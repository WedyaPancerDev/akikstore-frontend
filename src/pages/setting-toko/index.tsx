import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const SettingToko = (): JSX.Element => {
  return (
    <PageContainer title="SettingToko - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Setting Toko",
          description: "Di sini Anda dapat mengelola data toko Anda.",
        }}
      />

      <Box marginTop="20px"></Box>
    </PageContainer>
  );
};

export default SettingToko;
