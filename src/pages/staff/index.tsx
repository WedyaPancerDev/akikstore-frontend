import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Staff = (): JSX.Element => {
  return (
    <PageContainer title="Staff - AKIKSTORE" description="#">
      <BannerTag type="staff" />
      <Box></Box>
    </PageContainer>
  );
};

export default Staff;
