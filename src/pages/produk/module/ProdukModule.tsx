import {
  type ColGroupDef,
  type ColDef,
  type ValueFormatterParams,
} from "ag-grid-community";
import { useMemo, useState } from "react";
import loadable from "@loadable/component";
import { Box, Button, Theme, useMediaQuery } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";

import "react-photo-view/dist/react-photo-view.css";

import PageLoader from "components/PageLoader";
import { useProductsAdmin } from "hooks/react-query/useProduct";
import { formatPrice } from "utils/helpers";
import FormDialog from "components/Dialog";
import { IconEdit } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { GetProductsAdminResponse } from "services/products";

const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

type SelectedRows = {
  id: number;
  title: string;
  product_code: string;
  price_buy: number;
  price_sell: number;
  stock: number;
  images: string | null;
  category_name: string;
  category_id: number;
};

const ProdukModule = (): JSX.Element => {
  const navigate = useNavigate();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: productData, isLoading } = useProductsAdmin();

  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<SelectedRows | null>(null);

  const handleOpenImages = (payload: SelectedRows): void => {
    setSelectedRows(payload);
    setIsShowImage((prev) => !prev);
  };

  const handleCloseImages = (): void => {
    setSelectedRows(null);
    setIsShowImage(false);
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
        headerName: "Nama Produk",
        field: "title",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Kode Produk",
        field: "product_code",
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Harga Beli",
        field: "price_buy",
        width: 180,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Harga Jual",
        field: "price_sell",
        width: 180,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Stok",
        field: "stock",
        width: 130,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Gambar Produk",
        field: "images",
        width: 180,
        cellRenderer: ({ data }: { data: SelectedRows }) => {
          return (
            <Button
              type="button"
              variant="text"
              color="primary"
              size="small"
              onClick={() => {
                handleOpenImages(data);
              }}
              sx={{ marginBottom: "4px", fontWeight: 600 }}
            >
              Lihat Gambar
            </Button>
          );
        },
      },
      {
        headerName: "Kategori",
        field: "category_name",
        width: 180,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Dibuat Oleh",
        field: "created_by",
        width: 180,
        filter: "agTextColumnFilter",
        floatingFilter: true,
      },
      {
        headerName: "Aksi",
        field: "action",
        width: 190,
        cellRenderer: ({ data }: { data: GetProductsAdminResponse }) => {
          return (
            <Box display="flex" gap="0.5rem" marginTop="4px">
              <Button
                type="button"
                variant="contained"
                color="warning"
                size="small"
                sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}
                onClick={() => {
                  navigate(`/staff/list-produk/update/${data.product_code}`);
                }}
              >
                <IconEdit size={20} style={{ marginRight: "4px" }} />
                <span>Edit Produk</span>
              </Button>
            </Box>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (productData?.data) {
      return productData.data.map((product) => ({
        title: product.title,
        product_code: product.product_code,
        price_buy: formatPrice(product.price_buy),
        price_sell: formatPrice(product.price_sell),
        stock: product.stock,
        images: product.images,
        category_name: product.category_name,
        category_id: product.category_id,
        created_by: product.created_by,
      }));
    }

    return [];
  }, [productData?.data]);

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
          variant="contained"
          color="primary"
          sx={{ fontWeight: 600 }}
          onClick={() => {
            navigate("/staff/list-produk/tambah");
          }}
        >
          Tambah Produk
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

      {isShowImage && selectedRows && (
        <FormDialog
          open={isShowImage}
          maxWidth="sm"
          title="Gambar Produk"
          handleClose={() => {
            handleCloseImages();
          }}
        >
          <PhotoProvider>
            <PhotoView src={selectedRows?.images ?? ""}>
              <img
                src={selectedRows?.images ?? ""}
                alt={selectedRows?.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </PhotoView>
          </PhotoProvider>
        </FormDialog>
      )}
    </Box>
  );
};

export default ProdukModule;
