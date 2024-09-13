import {
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Stack,
  Avatar,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { IconTrash } from "@tabler/icons-react";

import useCart from "hooks/useCart";
import { formatPrice } from "utils/helpers";
import { AppState, useDispatch, useSelector } from "store/Store";

import menus from "theme/slider.module.css";
import { setNextStep } from "store/apps/StepperSlice";

const FirstStep = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const { handleDeleteItem } = useCart();

  const { cartProduct } = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch();

  const handleNextStep = (): void => {
    dispatch(setNextStep());
  };

  const totalCartPrice = useMemo(() => {
    return cartProduct?.products?.reduce(
      (acc, curr) => acc + curr.price_sell * curr.stock,
      0
    );
  }, [cartProduct]);

  return (
    <Box component="section">
      <Box
        sx={{
          height: "100%",
        }}
      >
        <TableContainer
          className={menus.Slider}
          sx={{
            minWidth: 350,
            height: "100%",
            maxHeight: "400px",
            minHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Table>
            {/* TABLE HEADER */}
            <TableHead>
              <TableRow>
                <TableCell>Barang</TableCell>
                <TableCell align="center">Kuantitas</TableCell>
                <TableCell align="right">Harga</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartProduct?.products?.length > 0 ? (
                cartProduct?.products?.map((product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={2}>
                          <Avatar
                            src={product?.images ?? ""}
                            alt={product.title}
                            sx={{
                              borderRadius: "10px",
                              height: "80px",
                              width: "90px",
                            }}
                          />
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 600,
                                fontSize: "1rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "250px",
                              }}
                            >
                              {product.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                marginY: "4px",
                                fontSize: "0.875rem",
                                color: "#6B7280",
                              }}
                            >
                              {product.category}
                            </Typography>

                            <IconButton
                              type="button"
                              size="small"
                              color="error"
                              onClick={() => {
                                handleDeleteItem(product.product_code);
                              }}
                            >
                              <IconTrash size="1rem" />
                            </IconButton>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell align="center">
                        <Typography variant="body2" fontSize="14px">
                          <b>{product?.stock}</b> x
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">
                          {formatPrice(product.price_sell * product.stock)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          marginBottom: "10px",
                          marginTop: "20px",
                          fontSize: "0.875rem",
                          textAlign: "center",
                          color: "#9ca3af",
                        }}
                      >
                        😭 Keranjang Kosong
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box p={2} marginTop="12px" sx={{ border: "1px solid #e5e7eb" }}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            Ringkasan Belanja
          </Typography>

          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography variant="h6" fontWeight={400}>
              Sub Total
            </Typography>
            <Typography variant="h6">{formatPrice(totalCartPrice)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h5" color="success" sx={{ fontWeight: 600 }}>
              {formatPrice(totalCartPrice)}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          margin: "0 auto",
          marginTop: "40px",
          width: mdUp ? "50%" : "100%",
        }}
      >
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          sx={{ fontWeight: 600, fontSize: "16px", marginBottom: "10px" }}
          onClick={handleNextStep}
        >
          Selanjutnya
        </Button>
        <Button
          fullWidth
          size="large"
          type="button"
          variant="text"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
          }}
          color="inherit"
          onClick={() => navigate("/")}
        >
          Kembali
        </Button>
      </Box>
    </Box>
  );
};

export default FirstStep;
