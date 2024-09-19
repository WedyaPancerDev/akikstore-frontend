import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo } from "react";
import loadable from "@loadable/component";
import { useNavigate } from "react-router-dom";
import { IconEdit } from "@tabler/icons-react";
import { Box, Button, Theme, useMediaQuery } from "@mui/material";

import PageLoader from "components/PageLoader";
import { formatPrice } from "utils/helpers";
import { useShippingCost } from "hooks/react-query/useShippingCost";
import { GetShippingCostResponse } from "services/shippingCost";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const SettingKurirModule = (): JSX.Element => {
  const navigate = useNavigate();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: shippingCostData, isLoading } = useShippingCost();

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
        headerName: "Kode Kurir",
        field: "shipping_code",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Nama Kurir",
        field: "name",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Provinsi Pengiriman",
        field: "area",
        filter: true,
      },
      {
        headerName: "Kota Pengiriman",
        field: "city",
        filter: true,
      },
      {
        headerName: "Tujuan Provinsi Pengiriman",
        field: "area_destination",
        filter: true,
      },
      {
        headerName: "Tujuan Kota Pengiriman",
        field: "city_destination",
        filter: true,
      },
      {
        headerName: "Harga Pengiriman",
        field: "cost",
        filter: true,
      },
      {
        headerName: "Aksi",
        field: "action",
        cellRenderer: ({ data }: { data: GetShippingCostResponse }) => {
          return (
            <Box display="flex" gap="0.5rem" marginTop="4px">
              <Button
                type="button"
                variant="contained"
                color="warning"
                size="small"
                sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}
              >
                <IconEdit size={20} style={{ marginRight: "4px" }} />
                <span>Edit Kurir</span>
              </Button>
            </Box>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (shippingCostData?.data) {
      return shippingCostData.data.map((shipping) => ({
        id: shipping.id,
        shipping_code: shipping.shipping_code,
        name: shipping.name?.toUpperCase(),
        city: shipping.city,
        cost: formatPrice(shipping.cost),
        area: shipping.area?.toUpperCase(),
        area_destination: shipping.area_destination?.toUpperCase(),
        city_destination: shipping.city_destination,
      }));
    }

    return [];
  }, [shippingCostData?.data]);

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
            navigate("/staff/setting-kurir/tambah");
          }}
          variant="contained"
          color="primary"
        >
          Tambah Kurir
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

export default SettingKurirModule;
