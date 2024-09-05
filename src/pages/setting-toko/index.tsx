import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const SettingToko = (): JSX.Element => {
  return (
    <PageContainer title="SettingToko - AKIKSTORE" description="#">
      <BannerTag type="setting" />
      <Box></Box>
    </PageContainer>
  );
};

export default SettingToko;
