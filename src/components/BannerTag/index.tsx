import { Box, Typography } from "@mui/material";
import { IconTicket } from "@tabler/icons-react";

import ShinySingle from "components/Svg/ShinySingle";
import moment from "moment";
import { type CSSProperties } from "react";
import { GetCouponResponse } from "services/coupon";
import { formatPrice } from "utils/helpers";

type BannerTagProps = {
  data?: GetCouponResponse;
  sx?: CSSProperties;
};

const BannerTag = ({ data }: BannerTagProps): JSX.Element => {
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
        <IconTicket />

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
              {data?.code ?? "Tidak ada kupon 😭"}
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
            Berlaku hingga {formatDueDate ?? "-"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BannerTag;
