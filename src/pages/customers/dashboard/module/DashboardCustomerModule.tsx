import { Box, Theme, useMediaQuery } from "@mui/material";
import BannerTag from "components/BannerTag";
import SlimCard from "components/SlimCard";
import { useHistoryTransactionCustomerCount } from "hooks/react-query/useOrder";
import { type AppState, useSelector } from "store/Store";

const DashboardCustomerModule = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { profile } = useSelector((state: AppState) => state.dashboard);

  const { data: transactionHistoryCountData, isLoading } =
    useHistoryTransactionCustomerCount(profile?.customers?.id as number);

  return (
    <Box
      component="div"
      position="relative"
      sx={{
        padding: "10px 16px",
        marginX: mdUp ? 0 : "1rem",
      }}
    >
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Dashboard",
          description: "Dashboard pelanggan Akikstore",
        }}
      />

      <Box
        marginTop="20px"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="1rem"
      >
        <SlimCard
          type="unpaid"
          title="Transaksi Dibatalkan"
          isLoading={isLoading}
          value={transactionHistoryCountData?.data.unpaid || 0}
        />

        <SlimCard
          type="paid"
          title="Transaksi Dibayar"
          isLoading={isLoading}
          value={transactionHistoryCountData?.data.paid || 0}
        />

        <SlimCard
          type="progress"
          title="Total Transaksi Belum Dibayar"
          isLoading={isLoading}
          value={transactionHistoryCountData?.data.canceled || 0}
        />
      </Box>
    </Box>
  );
};

export default DashboardCustomerModule;
