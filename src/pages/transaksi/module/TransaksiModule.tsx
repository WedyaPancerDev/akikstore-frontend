import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo, useState } from "react";
import loadable from "@loadable/component";
import {
  Box,
  Button,
  Chip,
  DialogContentText,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import toast from "react-hot-toast";
import { PhotoProvider, PhotoView } from "react-photo-view";

import "react-photo-view/dist/react-photo-view.css";

import PageLoader from "components/PageLoader";
import { useProcessedTransactions } from "hooks/react-query/useOrder";
import { formatDate, formatPrice } from "utils/helpers";
import FormDialog from "components/Dialog";
import {
  updateStatusTransaction,
  UpdateStatusTransactionPayload,
} from "services/orders";
import { useQueryClient } from "@tanstack/react-query";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

type TemporaryOrderNumber = {
  order_number: string;
  title: string;
  banner: string;
  customer_id: number;
};

const TransactionModule = (): JSX.Element => {
  const queryClient = useQueryClient();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: transactionData, isLoading } = useProcessedTransactions();

  const [open, setOpen] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<TemporaryOrderNumber>({
    order_number: "",
    title: "",
    banner: "",
    customer_id: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleOpenDialog = ({
    order_number,
    title,
    banner,
    customer_id,
  }: TemporaryOrderNumber): void => {
    setOpen((prev) => !prev);
    setOrderNumber({
      order_number,
      title,
      banner,
      customer_id,
    });
  };

  const handleCloseDialog = (): void => {
    setOpen((prev) => !prev);
    setOrderNumber({
      order_number: "",
      title: "",
      banner: "",
      customer_id: 0,
    });
  };

  const handleStatusProofing = async (status: string): Promise<void> => {
    const payload: UpdateStatusTransactionPayload = {
      order_id: orderNumber.order_number,
      status: status as "completed" | "cancelled",
      customer_id: orderNumber.customer_id,
    };

    try {
      setIsSubmitting(true);

      const result = await updateStatusTransaction(payload);

      if (result.success) {
        toast.success("Berhasil memproses status bukti pembayaran.");
        queryClient.refetchQueries({ queryKey: ["processed-transactions"] });
        handleCloseDialog();
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });
      toast.error(
        "Gagal memproses status bukti pembayaran. Silahkan coba lagi."
      );
    }
  };

  const columns: ColDef[] | ColGroupDef[] = useMemo(() => {
    return [
      {
        headerName: "No",
        width: 55,
        valueFormatter: (params: ValueFormatterParams) => {
          return `${Number(params.node?.id ?? 0) + 1}`;
        },
      },
      {
        headerName: "Invoice",
        field: "order_number",
        width: 140,
        filter: true,
      },
      {
        headerName: "Nama Barang",
        field: "product_name",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Harga Satuan",
        field: "price_product",
      },
      {
        headerName: "Jumlah",
        field: "quantity",
        width: 80,
      },
      {
        headerName: "Tanggal Order",
        field: "order_date",
        width: 180,
        filter: true,
      },
      {
        headerName: "Tanggal Kadaluarsa",
        field: "order_due_date",
        width: 180,
        filter: true,
      },
      {
        headerName: "Kupon",
        field: "coupon",
        width: 120,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Status",
        field: "status",
        width: 150,
        filter: true,
        cellRenderer: (data: any) => {
          const customChip: Record<string, JSX.Element> = {
            pending: (
              <Chip
                label={data.value}
                size="small"
                color="primary"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
            processing: (
              <Chip
                label={data.value}
                size="small"
                color="warning"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
            shipping: (
              <Chip
                label="Dikirim"
                size="small"
                color="info"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
            completed: (
              <Chip
                label={data.value}
                size="small"
                color="success"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
            cancelled: (
              <Chip
                label={data.value}
                size="small"
                color="error"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
          };
          return <>{customChip[data.value]}</>;
        },
      },
      {
        headerName: "Metode Pembayaran",
        field: "payment_method",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Kurir",
        field: "shipping_name",
        width: 120,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Biaya Kurir",
        field: "shipping_cost",
        width: 120,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Total Harga",
        field: "total_price",
      },
      {
        headerName: "Aksi",
        field: "action",
        width: 190,
        cellRenderer: ({ data }: { data: any }) => {
          return (
            <>
              {!["completed", "cancelled", "shipping"].includes(data.status) ? (
                <Button
                  type="button"
                  variant="contained"
                  color="inherit"
                  size="small"
                  onClick={() =>
                    handleOpenDialog({
                      order_number: data.order_number,
                      title: data.product_name,
                      banner: data.payment_proof,
                      customer_id: data.customer_id,
                    })
                  }
                >
                  Cek Detail Pesanan
                </Button>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, marginTop: "10px" }}
                >
                  {data.status === "completed"
                    ? "Pembayaran Selesai"
                    : data.status === "shipping"
                    ? "Barang sedang dikirim"
                    : "Pembayaran Ditolak"}
                </Typography>
              )}
            </>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (transactionData?.data) {
      return transactionData.data.flatMap((item, index) =>
        item.order_details.map((detail) => ({
          id: `${index}-${item.order_number}`,
          order_number: item.order_number,
          product_name: detail.product_name,
          price_product: formatPrice(detail.price),
          quantity: detail.quantity,
          order_date: formatDate(item.order_date),
          order_due_date: item.due_date ? formatDate(item.due_date) : "-",
          coupon: item.coupon ?? "-",
          status: item.status,
          customer_id: item.customer_id,
          payment_proof: item.payment_proof,
          payment_method: item.payment_method,
          shipping_name: detail.shipping_name?.toUpperCase(),
          shipping_cost: formatPrice(detail.shipping_cost),
          total_price: formatPrice(item.total_price),
          action: "",
        }))
      );
    }

    return [];
  }, [transactionData?.data]);

  return isLoading ? (
    <PageLoader />
  ) : (
    <Box
      component="div"
      position="relative"
      sx={{
        marginX: mdUp ? 0 : "1rem",
      }}
    >
      <TableContainer
        rows={rows || []}
        columns={columns}
        pagination={true}
        paginationPageSize={10}
        rowSelection="multiple"
        suppressColumnVirtualisation={true}
        suppressRowVirtualisation={true}
        paginationPageSizeSelector={[10, 20, 30]}
      />

      {open && (
        <FormDialog
          open={open}
          maxWidth="sm"
          title="Lihat Detail Pesanan"
          handleClose={() => {
            handleCloseDialog();
          }}
        >
          <DialogContentText>{orderNumber.order_number}</DialogContentText>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <PhotoProvider>
              <PhotoView src={orderNumber.banner}>
                <img
                  src={orderNumber.banner}
                  alt={orderNumber.title}
                  loading="lazy"
                  style={{ width: "100%", height: "auto", cursor: "pointer" }}
                />
              </PhotoView>
            </PhotoProvider>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginTop: "20px", gap: "1rem" }}
            >
              <Button
                fullWidth
                type="button"
                color="error"
                size="large"
                variant="contained"
                sx={{ fontWeight: 600 }}
                disabled={isSubmitting}
                onClick={() => {
                  handleStatusProofing("cancelled");
                }}
              >
                Tolak Bukti Pembayaran
              </Button>

              <Button
                fullWidth
                type="button"
                size="large"
                color="success"
                variant="contained"
                sx={{ fontWeight: 600 }}
                disabled={isSubmitting}
                onClick={() => {
                  handleStatusProofing("completed");
                }}
              >
                Terima Bukti Pembayaran
              </Button>
            </Box>

            <Button
              fullWidth
              size="large"
              type="button"
              color="inherit"
              variant="text"
              disabled={isSubmitting}
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                marginTop: "1rem",
              }}
              onClick={() => {
                handleCloseDialog();
              }}
            >
              Kembali
            </Button>
          </Box>
        </FormDialog>
      )}
    </Box>
  );
};

export default TransactionModule;
