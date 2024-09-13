import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo } from "react";
import loadable from "@loadable/component";
import { Box, Button, Chip, Theme, useMediaQuery } from "@mui/material";

import { AppState, useSelector } from "store/Store";
import { useHistoryTransactionCustomer } from "hooks/react-query/useOrder";

import { formatDate, formatPrice } from "utils/helpers";

import BannerTag from "components/BannerTag";
import PageLoader from "components/PageLoader";
import { TransactionHistoryCustomerResponse } from "services/orders";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const TransactionDetailModule = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { profile } = useSelector((state: AppState) => state.dashboard);

  const { data: transactionHistoryData, isLoading } =
    useHistoryTransactionCustomer(profile?.customers?.id as number);

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
                label="primary"
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
        cellRenderer: ({
          data,
        }: {
          data: TransactionHistoryCustomerResponse;
        }) => {
          return (
            <>
              {data.status === "processing" ? (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Selesaikan Pesanan
                </Button>
              ) : (
                <>-</>
              )}
            </>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (transactionHistoryData?.data) {
      return transactionHistoryData.data.flatMap((item, index) =>
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
          payment_method: item.payment_method,
          shipping_name: detail.shipping_name?.toUpperCase(),
          shipping_cost: formatPrice(detail.shipping_cost),
          total_price: formatPrice(item.total_price),
          action: "",
        }))
      );
    }

    return [];
  }, [transactionHistoryData?.data]);

  return isLoading ? (
    <PageLoader />
  ) : (
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

      <Box sx={{ marginTop: "20px" }}>
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
      </Box>
    </Box>
  );
};

export default TransactionDetailModule;
