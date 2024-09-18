import moment from "moment";
import { IconBasket, IconInfoCircle } from "@tabler/icons-react";
import {
  Box,
  CardContent,
  Fab,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import BlankCard from "components/BlankCard";
import { type GetProductsResponse } from "services/products";
import { formatPrice } from "utils/helpers";
import { type PickProductState } from "store/apps/CartSlice";
import toast from "react-hot-toast";

type MenusCardProductProps = {
  data: GetProductsResponse;
  handleSelectedProduct: (data: PickProductState) => void;
};

const MenusCardProduct = ({
  data,
  handleSelectedProduct,
}: MenusCardProductProps): JSX.Element => {
  return (
    <BlankCard sx={{ userSelect: "none", position: "relative" }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          variant="body1"
          sx={{
            letterSpacing: "-0.03em",
            position: "absolute",
            backgroundColor: "#fff",
            paddingX: 1,
            left: 0,
            top: 0,
            zIndex: 1,
            fontSize: "12px",
          }}
        >
          Stok <b>{data.stock === 0 ? "Habis" : data.stock}</b>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            letterSpacing: "-0.03em",
            position: "absolute",
            backgroundColor: "#fff",
            paddingX: 1,
            right: 0,
            top: 0,
            zIndex: 1,
          }}
        >
          <b>{moment(data.created_at).fromNow() ?? "-"}</b>
        </Typography>
      </Box>
      <Box sx={{ overflow: "hidden" }}>
        {data?.images ? (
          <img
            src={data?.images ?? ""}
            alt={data.title}
            width="100%"
            loading="lazy"
            className="hoverImage"
            style={{ minHeight: "18.5rem", objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              minHeight: "18.5rem",
              borderRadius: 0,
              backgroundColor: "#d1d5db",
            }}
          />
        )}
      </Box>
      <Tooltip title="Tambah Ke Keranjang">
        <Fab
          size="medium"
          color="primary"
          disabled={data.stock === 0}
          sx={{
            bottom: "75px",
            right: "15px",
            position: "absolute",
          }}
          onClick={() => {
            data.stock > 0
              ? handleSelectedProduct({
                  stock: 1,
                  id: data?.id,
                  images: data?.images,
                  price_sell: data?.price_sell,
                  product_code: data?.product_code,
                  max_stock: data?.stock,
                  title: data?.title,
                  category: data?.category_name,
                })
              : toast.error("Stok Habis");
          }}
        >
          <IconBasket size="26" />
        </Fab>
      </Tooltip>

      <CardContent sx={{ p: 3, pt: 2, userSelect: "none" }}>
        <Typography
          variant="h6"
          sx={{ fontSize: "18px", fontWeight: 700, color: "#374151" }}
        >
          {data.title ?? "-"}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Typography variant="body1" sx={{ letterSpacing: "-0.03em" }}>
            {data.price_sell ? formatPrice(data.price_sell) : "-"}
          </Typography>

          <Box display="flex" alignItems="center">
            <Typography
              variant="body1"
              sx={{ letterSpacing: "-0.03em", marginRight: "5px" }}
            >
              <b>{data.category_name ?? "-"}</b>
            </Typography>

            <Tooltip title={data.description}>
              <IconInfoCircle size={16} style={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </BlankCard>
  );
};

export default MenusCardProduct;
