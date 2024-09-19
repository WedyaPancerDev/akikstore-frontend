import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import SettingKurirModule from "./module/SettingKurir";

const SettingKurir = (): JSX.Element => {
  return (
    <PageContainer title="SettingKurir - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Setting Kurir",
          description: "Di sini Anda dapat mengelola data kurir Anda.",
        }}
      />

      <Box marginTop="20px">
        <SettingKurirModule />
      </Box>
    </PageContainer>
  );
};

export default SettingKurir;
