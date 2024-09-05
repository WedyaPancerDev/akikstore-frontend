import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Dashboard = (): JSX.Element => {
  return (
    <PageContainer
      title="Dashboard - AKIKSTORE"
      description="#"
    >
      <BannerTag type="dashboard" />
      <Box></Box>
    </PageContainer>
  );
};

export default Dashboard;
