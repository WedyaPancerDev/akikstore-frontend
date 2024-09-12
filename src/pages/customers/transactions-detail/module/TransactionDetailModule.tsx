import { Box, Theme, useMediaQuery } from "@mui/material";
import BannerTag from "components/BannerTag";
import { useHistoryTransactionCustomer } from "hooks/react-query/useOrder";
import { AppState, useSelector } from "store/Store";

const TransactionDetailModule = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { profile } = useSelector((state: AppState) => state.dashboard);

  const { data: transactionHistoryData, isLoading } =
    useHistoryTransactionCustomer(profile?.customers?.id as number);

  console.log({ 2: transactionHistoryData?.data });

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
          title: "Riwayat Transaksi",
          description: "Detail transaksi pelanggan",
        }}
      />

      <Box sx={{ marginTop: "20px" }}>2</Box>
    </Box>
  );
};

export default TransactionDetailModule;
