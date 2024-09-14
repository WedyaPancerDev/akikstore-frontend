import { Box, Typography } from "@mui/material";
import {
  IconBuildingStore,
  IconCashRegister,
  IconGiftCard,
  IconLayoutDashboard,
  IconNotes,
  IconShoppingCart,
  IconTicket,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

import ShinySingle from "components/Svg/ShinySingle";
import moment from "moment";
import { type CSSProperties } from "react";
import { GetCouponResponse } from "services/coupon";
import { formatPrice } from "utils/helpers";

type DashboardProps = {
  title: string;
  description: string;
};

type BannerTagProps = {
  dataDashboard?: DashboardProps;
  data?: GetCouponResponse;
  sx?: CSSProperties;
  type: "dashboard" | "landing";
};

const iconBanner: Record<string, JSX.Element> = {
  Dashboard: <IconLayoutDashboard style={{ flexShrink: 0 }} />,
  "Pelanggan Terdaftar": <IconUsers style={{ flexShrink: 0 }} />,
  "Riwayat Transaksi": <IconCashRegister style={{ flexShrink: 0 }} />,
  Transaksi: <IconCashRegister style={{ flexShrink: 0 }} />,
  "List Produk & Kategori": <IconShoppingCart style={{ flexShrink: 0 }} />,
  "Pemasukan & Pengeluaran": <IconNotes style={{ flexShrink: 0 }} />,
  "Setting Toko": <IconBuildingStore style={{ flexShrink: 0 }} />,
  Kupon: <IconGiftCard style={{ flexShrink: 0 }} />,
  "Manajemen Staff": <IconUser style={{ flexShrink: 0 }} />,
};

const BannerTag = ({
  dataDashboard,
  data,
  type = "landing",
  sx,
}: BannerTagProps): JSX.Element => {
  const formatDueDate = data?.expired_at
    ? moment(data?.expired_at).format("DD MMMM YYYY")
    : null;

  return (
    <Box
      sx={{
        color: "white",
        background:
          "linear-gradient(-90deg, rgba(93,197,255,1) 0%, rgba(93,135,255,1) 100%)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 10px 20px 0 rgba(0,0,0,.15)",
        ...sx,
      }}
    >
      <ShinySingle
        style={{ position: "absolute", left: 0, top: 0, zIndex: 0 }}
      />
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        {type === "landing" ? (
          <IconTicket />
        ) : (
          iconBanner[dataDashboard?.title ?? ""] || null
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "16px",
            width: "100%",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.035em",
              }}
            >
              {type === "landing"
                ? data?.code ?? "Tidak ada kupon 😭"
                : dataDashboard?.title ?? "-"}
            </Typography>

            {data?.type && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                }}
              >
                Diskon{" "}
                {data?.type === "fixed"
                  ? formatPrice(data.discount)
                  : `${data?.discount}%`}
              </Typography>
            )}
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              marginTop: "4px",
            }}
          >
            {type === "landing"
              ? `Berlaku hingga ${formatDueDate ?? "-"}`
              : dataDashboard?.description ?? "-"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerTag;
