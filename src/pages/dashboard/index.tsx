import { Box } from "@mui/material";

import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import SlimCard from "components/SlimCard";

import { useDashboardAdmin } from "hooks/react-query/useDashboard";

const Dashboard = (): JSX.Element => {
  const { data: dashboardData, isLoading } = useDashboardAdmin();
  const dashboard = dashboardData?.data;

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
      <Box
        gap="1rem"
        display="grid"
        marginTop="20px"
        component="section"
        gridTemplateColumns="repeat(3, 1fr)"
      >
        <SlimCard
          type="customer"
          title="Total Pelanggan"
          isLoading={isLoading}
          value={dashboard?.customer || 0}
        />

        <SlimCard
          type="product"
          title="Total Produk"
          isLoading={isLoading}
          value={dashboard?.product || 0}
        />

        <SlimCard
          type="kurir"
          title="Total Kurir"
          isLoading={isLoading}
          value={dashboard?.courier || 0}
        />

        <SlimCard
          type="order"
          title="Total Pesanan Selesai"
          isLoading={isLoading}
          value={dashboard?.order || 0}
        />
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
