import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo } from "react";
import loadable from "@loadable/component";
import { Box, Button, Chip, Theme, useMediaQuery } from "@mui/material";

import { useAllGetCoupon } from "hooks/react-query/useCoupon";

import PageLoader from "components/PageLoader";
import { disableCoupon, type GetCouponResponse } from "services/coupon";
import { formatDate, formatPrice } from "utils/helpers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const KuponModule = (): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: kuponData, isLoading } = useAllGetCoupon();

  const handleDisableCoupon = async (id: number): Promise<void> => {
    try {
      queryClient.setQueryData(
        ["coupon-all"],
        (oldData: { data: GetCouponResponse[] }) => {
          return {
            ...oldData,
            data: oldData?.data?.filter(
              (coupon: GetCouponResponse) => coupon.id !== id
            ),
          };
        }
      );

      const result = await disableCoupon(id);

      if (result.success) {
        toast.success("Kupon berhasil dinonaktifkan.");
        queryClient.invalidateQueries({ queryKey: ["coupon-all"] });
      } else {
        toast.error("Menonaktifkan kupon gagal. Coba beberapa saat lagi");
        queryClient.refetchQueries({ queryKey: ["coupon-all"] });
      }
    } catch (error) {
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
        headerName: "Kupon",
        field: "code",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Tanggal Kadaluarsa",
        field: "expired_at",
        filter: true,
      },
      {
        headerName: "Diskon",
        field: "discount",
        filter: true,
        cellRenderer: ({ data }: { data: GetCouponResponse }) => {
          return (
            <>
              {data.type === "fixed"
                ? formatPrice(data.discount)
                : data.discount + "%"}
            </>
          );
        },
      },
      {
        headerName: "Tipe Diskon",
        field: "type",
        filter: true,
        cellRenderer: ({ data }: { data: GetCouponResponse }) => {
          return <>{data.type?.toUpperCase()}</>;
        },
      },
      {
        headerName: "Status",
        field: "status",
        width: 150,
        filter: true,
        cellRenderer: (data: any) => {
          const customChip: Record<string, JSX.Element> = {
            active: (
              <Chip
                label={data.value}
                size="small"
                color="success"
                variant="filled"
                sx={{ textTransform: "uppercase" }}
              />
            ),
            inactive: (
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
        headerName: "Aksi",
        field: "action",
        cellRenderer: ({ data }: { data: GetCouponResponse }) => {
          return (
            <Box display="flex" gap="0.5rem" marginTop="4px">
              <Button
                type="button"
                variant="contained"
                color="error"
                size="small"
                sx={{ fontWeight: 500 }}
                onClick={() => handleDisableCoupon(data.id)}
              >
                <span>Nonaktifkan</span>
              </Button>
            </Box>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (kuponData?.data) {
      return kuponData.data.map((kupon) => ({
        code: kupon.code,
        expired_at: formatDate(kupon.expired_at),
        discount: kupon.discount,
        type: kupon.type,
        status: kupon.status,
        id: kupon.id,
      }));
    }

    return [];
  }, [kuponData?.data]);

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
      <Box marginBottom="20px">
        <Button
          type="button"
          onClick={() => {
            navigate("/staff/kupon/tambah");
          }}
          variant="contained"
          color="primary"
        >
          Tambah Kupon
        </Button>
      </Box>

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
  );
};

export default KuponModule;
