import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo } from "react";
import loadable from "@loadable/component";
import { Box, Chip, Theme, useMediaQuery } from "@mui/material";

import { useGetCustomers } from "hooks/react-query/useCustomer";

import PageLoader from "components/PageLoader";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const PelangganModule = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: customerData, isLoading } = useGetCustomers();

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
        headerName: "Nama Lengkap",
        field: "fullname",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Nomor Telepon",
        field: "phone",
        width: 180,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Email",
        field: "email",
        width: 180,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Status",
        field: "account_status",
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
        headerName: "Negara",
        field: "country",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Kota",
        field: "city",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (customerData?.data) {
      return customerData.data.map((user) => ({
        fullname: user?.fullname ?? "-",
        phone: user?.phone ?? "-",
        email: user.users?.email ?? "-",
        country: user?.country ?? "-",
        city: user?.city ?? "-",
        account_status: user.users?.account_status,
      }));
    }

    return [];
  }, [customerData?.data]);

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
    </Box>
  );
};

export default PelangganModule;
