import {
  Avatar,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { NewPayload } from "hooks/useCart";
import useCookie from "hooks/useCookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { processOrder, ProcessOrderPayload } from "services/orders";
import { setCartProduct } from "store/apps/CartSlice";
import { setNextStep, setPrevStep } from "store/apps/StepperSlice";
import { AppState, useDispatch, useSelector } from "store/Store";
import menus from "theme/slider.module.css";
import { formatPrice } from "utils/helpers";
import { ERROR_CODE_SERVER } from "utils/http";

type CalculateAllTransactionProps = {
  subTotalPriceProduct: number;
  discountPrice: number;
  shippingCost: number;
  totalPrice: number;
};

const ThirdStep = (): JSX.Element => {
  const dispatch = useDispatch();
  const { cartProduct } = useSelector((state: AppState) => state.cart);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { getFromLocalStorage, removeFromLocalStorage } = useCookie();
  const secureValue = getFromLocalStorage(
    "transactions"
  ) as unknown as NewPayload;
  const validate = getFromLocalStorage("validate") as any;

  const calculateAllTransaction = (): CalculateAllTransactionProps => {
    const subTotalPriceProduct = cartProduct?.products?.reduce(
      (acc, curr) => acc + curr.price_sell * curr.stock,
      0
    );

    const discountPrice =
      secureValue?.coupon && secureValue?.coupon?.type === "fixed"
        ? secureValue?.coupon?.discount
        : (subTotalPriceProduct * (secureValue?.coupon?.discount ?? 0)) / 100;
    const shippingCost = secureValue?.shippingCost?.cost ?? 0;

    const totalPrice = subTotalPriceProduct - discountPrice + shippingCost;

    return {
      subTotalPriceProduct,
      discountPrice,
      shippingCost,
      totalPrice,
    };
  };

  const { discountPrice, shippingCost, subTotalPriceProduct, totalPrice } =
    calculateAllTransaction();

  const clearCartAndTransactions = (): void => {
    removeFromLocalStorage("cart");
    removeFromLocalStorage("transactions");
    dispatch(
      setCartProduct({
        customer_id: null,
        products: [],
      })
    );
  };

  const handleTransactions = async (): Promise<void> => {
    const payload = {
      customer_id: validate?.person,
      coupon_id: secureValue?.coupon?.code ?? null,
      purchase_items: secureValue?.products?.map((product) => ({
        product_id: product.id,
        quantity: product.stock,
        shipping_cost_id: secureValue?.shippingCost?.id as number,
      })),
    } as ProcessOrderPayload;

    try {
      setIsSubmitting(true);

      const type = secureValue?.transaction_type as "manual" | "automatic";
      const result = await processOrder(payload, type);

      if (result?.success) {
        const typeMessage =
          type === "automatic"
            ? "Yey! Pesanan mu berhasil dibuat 🎉"
            : "Pesanan mu berhasil dibuat. Silahkan ikuti langkah selanjutnya 😁";

        toast.success(typeMessage, {
          duration: 8000,
        });
        clearCartAndTransactions();
        dispatch(setNextStep());
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });

      if (
        error &&
        (error as AxiosError)?.response?.status === ERROR_CODE_SERVER
      ) {
        const data = (error as AxiosError)?.response?.data;
        const message =
          (data as { message: string })?.message ??
          "Terjadi kesalahan saat memproses pesanan 😭";

        toast.error(message);
      }
    }
  };

  return (
    <Box component="section" sx={{ marginTop: "20px" }}>
      <Box sx={{ minHeight: "65vh", height: "100%", maxHeight: "65vh" }}>
        <TableContainer
          className={menus.Slider}
          sx={{
            minWidth: 350,
            height: "100%",
            maxHeight: "310px",
            minHeight: "310px",
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
            <Typography variant="h6">
              {formatPrice(subTotalPriceProduct)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography variant="h6" fontWeight={400} sx={{ color: "#16a34a" }}>
              Diskon Kupon
            </Typography>
            <Typography variant="h6" sx={{ color: "#16a34a" }}>
              - {formatPrice(discountPrice)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography variant="h6" fontWeight={400}>
              Kurir Pengiriman
            </Typography>
            <Typography variant="h6">
              <b
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                }}
              >
                {secureValue?.shippingCost?.name ?? "-"}
              </b>{" "}
              - {formatPrice(shippingCost)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h5" color="success" sx={{ fontWeight: 600 }}>
              {formatPrice(totalPrice)}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ margin: "0 auto", width: "50%" }}>
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          disabled={isSubmitting}
          sx={{ fontWeight: 600, fontSize: "16px", marginBottom: "10px" }}
          onClick={() => {
            handleTransactions();
          }}
        >
          {isSubmitting ? "Diproses ..." : "Proses Pesanan"}
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
          onClick={() => {
            dispatch(setPrevStep());
          }}
        >
          Kembali
        </Button>
      </Box>
    </Box>
  );
};

export default ThirdStep;
