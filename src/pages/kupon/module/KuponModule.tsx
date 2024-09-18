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
import { type GetCouponResponse } from "services/coupon";
import { formatDate, formatPrice } from "utils/helpers";
import { useNavigate } from "react-router-dom";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const KuponModule = (): JSX.Element => {
  const navigate = useNavigate();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: kuponData, isLoading } = useAllGetCoupon();

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
        width: 180,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Tanggal Kadaluarsa",
        field: "expired_at",
        width: 180,
        filter: true,
      },
      {
        headerName: "Diskon",
        field: "discount",
        width: 180,
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
        width: 180,
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
        width: 190,
        cellRenderer: () => {
          return (
            <Box display="flex" gap="0.5rem" marginTop="4px">
              <Button
                type="button"
                variant="contained"
                color="warning"
                size="small"
                sx={{ fontWeight: 500 }}
              >
                <span>Edit</span>
              </Button>

              <Button
                type="button"
                variant="contained"
                color="error"
                size="small"
                sx={{ fontWeight: 500 }}
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
