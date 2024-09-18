import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useEffect, useMemo, useState } from "react";
import loadable from "@loadable/component";
import {
  Box,
  Button,
  Chip,
  DialogContentText,
  Theme,
  useMediaQuery,
} from "@mui/material";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import { AppState, useSelector } from "store/Store";
import { useHistoryTransactionCustomer } from "hooks/react-query/useOrder";

import { formatDate, formatPrice } from "utils/helpers";

import FormDialog from "components/Dialog";
import BannerTag from "components/BannerTag";
import PageLoader from "components/PageLoader";
import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";

import {
  TransactionHistoryCustomerResponse,
  uploadTransactionProofing,
  UploadTransactionProofingPayload,
} from "services/orders";
import { uploadFile, UploadFileResponse } from "services/upload";
import { useQueryClient } from "@tanstack/react-query";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
);

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const formSchema = yup.object().shape({
  order_id: yup.string().required("Order ID is required"),
  customer_id: yup.string().required("Customer ID is required"),
  file: yup
    .array()
    .min(1, "File is required")
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return;

      return value?.length > 0 && value[0].size <= 3000000;
    }),
});

const TransactionDetailModule = (): JSX.Element => {
  const queryClient = useQueryClient();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { profile } = useSelector((state: AppState) => state.dashboard);

  const [open, setOpen] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: transactionHistoryData, isLoading } =
    useHistoryTransactionCustomer(profile?.customers?.id as number);

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      order_id: "",
      customer_id: "",
      file: [],
    },
    resolver: yupResolver(formSchema),
  });

  const { file: fileForm } = watch();

  const handleOpenDialog = (orderNumber: string): void => {
    setOpen((prev) => !prev);
    setOrderNumber(orderNumber);
  };

  const handleCloseDialog = (): void => {
    setOpen((prev) => !prev);
    setOrderNumber("");
    setValue("file", []);
  };

  const fetchUploadFile = async () => {
    const formData = new FormData();

    if (!fileForm?.length) {
      toast.error("File is required");

      return null;
    }

    try {
      formData.append("file", fileForm[0] as File);
      const res = await uploadFile(formData, "customer-proofing");

      if (res.success) {
        const { url } = res.data as UploadFileResponse;
        return url;
      }

      toast.error(res.message ?? "Oops, Gagal mengunggah file");
      return null;
    } catch (error) {
      toast.error("Oops, Terjadi kesalahan saat mengunggah file");
      return null;
    }
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const url = await fetchUploadFile();

      const payload: UploadTransactionProofingPayload = {
        customer_id: profile?.customers?.id as number,
        image_proofing: url ?? "",
        order_id: orderNumber,
      };

      const result = await uploadTransactionProofing(payload);

      if (result?.success) {
        toast.success(
          "Bukti transfer berhasil diunggah. Tunggu konfirmasi dari admin"
        );
        handleCloseDialog();
        queryClient.refetchQueries({ queryKey: ["history-transaction"] });
        setIsSubmitting(false);

        return;
      }

      setIsSubmitting(false);
      toast.error("Oops, Gagal mengunggah bukti transfer");
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });
      toast.error("Oops, Terjadi kesalahan. Coba beberapa saat lagi");
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
              {data.status === "pending" ? (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleOpenDialog(data.order_number)}
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

  useEffect(() => {
    if (orderNumber !== "" || profile?.customers?.fullname) {
      setValue("order_id", orderNumber);
      setValue("customer_id", profile?.customers?.fullname as string);
    }
  }, [orderNumber, profile]);

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

      {open && (
        <FormDialog
          open={open}
          maxWidth="sm"
          title="Upload Bukti Transfer"
          handleClose={() => {
            handleCloseDialog();
          }}
        >
          <DialogContentText>
            Silahkan upload bukti transfer untuk menyelesaikan pesanan kamu!
          </DialogContentText>

          <Box
            component="form"
            onSubmit={(e) => {
              handleSubmit(onSubmit)(e);
            }}
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Controller
              name="order_id"
              control={control}
              render={({ field }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="order_id">
                      Order ID
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      type="text"
                      id="order_id"
                      readOnly
                      disabled
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                    />
                  </Box>
                );
              }}
            />

            <Controller
              name="customer_id"
              control={control}
              render={({ field }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="customer_id">
                      Nama Pelanggan
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      type="text"
                      id="customer_id"
                      readOnly
                      disabled
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                    />
                  </Box>
                );
              }}
            />

            <Controller
              name="file"
              control={control}
              render={({ field }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="image_proofing">
                      Bukti Transfer
                    </CustomFormLabel>

                    <FilePond
                      name="file"
                      disabled={isSubmitting}
                      acceptedFileTypes={[
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                      ]}
                      files={field.value as unknown as File[]}
                      onupdatefiles={(fileItems) =>
                        field.onChange(
                          fileItems.map((fileItem) => fileItem.file) as File[]
                        )
                      }
                      labelIdle="Upload bukti transfer, maksimal 3MB"
                      credits={false}
                      maxFileSize="3MB"
                    />
                  </Box>
                );
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              sx={{ marginTop: "20px" }}
              disabled={isSubmitting || fileForm?.length === 0}
            >
              {isSubmitting ? "Sedang mengunggah..." : "Upload Bukti Transfer"}
            </Button>
          </Box>
        </FormDialog>
      )}
    </Box>
  );
};

export default TransactionDetailModule;
