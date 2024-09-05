import { Box, Typography } from "@mui/material";
import {
  IconBuildingStore,
  IconCashRegister,
  IconLayoutDashboard,
  IconNotes,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";

import ShinySingle from "components/Svg/ShinySingle";

type ActiveIconProps = Record<string, JSX.Element>;

type BannerTagProps = {
  type:
    | "dashboard"
    | "pelanggan"
    | "transaksi"
    | "produk"
    | "income"
    | "setting"
    | "staff";
};

const activeIcon: ActiveIconProps = {
  dashboard: <IconLayoutDashboard style={{ flexShrink: 0 }} />,
  pelanggan: <IconUsers style={{ flexShrink: 0 }} />,
  transaksi: <IconCashRegister style={{ flexShrink: 0 }} />,
  produk: <IconShoppingCart style={{ flexShrink: 0 }} />,
  income: <IconNotes style={{ flexShrink: 0 }} />,
  setting: <IconBuildingStore style={{ flexShrink: 0 }} />,
  staff: <IconUsers style={{ flexShrink: 0 }} />,
};

const activeTitle: Record<string, string> = {
  dashboard: "Dashboard",
  pelanggan: "Pelanggan",
  transaksi: "Transaksi",
  produk: "Produk & Kategori",
  income: "Pemasukan & Pengeluaran",
  setting: "Setting Toko",
  staff: "Staff",
};

const activeDescription: Record<string, string> = {
  dashboard: "Lihat informasi terkini",
  pelanggan: "Pelanggan Terdaftar",
  transaksi: "Transaksi Pelanggan Terbaru",
  produk: "Informasi Produk & Kategori",
  income: "Laporan mengenai Pemasukan & Pengeluaran",
  setting: "Pengaturan Toko",
  staff: "Informasi Staff",
};

const BannerTag = ({ type }: BannerTagProps): JSX.Element => {
  return (
    <Box
      sx={{
        color: "white",
        background:
          "linear-gradient(-90deg, rgba(93,197,255,1) 0%, rgba(93,135,255,1) 100%)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 20px 0 rgba(0,0,0,.15)",
      }}
    >
      <ShinySingle style={{ position: "absolute", left: 0, zIndex: 0 }} />
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        {activeIcon[type] || <></>}

        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "16px" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            {activeTitle[type] || "-"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              marginTop: "4px",
            }}
          >
            {activeDescription[type] || "-"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerTag;
