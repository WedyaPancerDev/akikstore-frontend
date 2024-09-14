import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Dashboard = (): JSX.Element => {
  return (
    <PageContainer title="Dashboard - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Dashboard",
          description:
            "Selamat datang di dashboard AKIKSTORE. Di sini Anda dapat mengelola produk, pesanan, pelanggan, dan lainnya.",
        }}
      />
      <Box marginTop="20px"></Box>
    </PageContainer>
  );
};

export default Dashboard;
