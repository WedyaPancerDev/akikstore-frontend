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
  DialogContentText,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as yup from "yup";
import toast from "react-hot-toast";
import { IconEdit } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";

import { useCategories } from "hooks/react-query/useCategory";

import { addCategory, updateCategory } from "services/category";

import FormDialog from "components/Dialog";
import PageLoader from "components/PageLoader";
import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";
const TableContainer = loadable(() => import("components/TableContainer"), {
  fallback: <p>...</p>,
});

const formSchema = yup.object().shape({
  name: yup.string().required("Nama kategori wajib diisi"),
});

type FormPayload = {
  name: string;
  id: number;
};

const CategoryModule = (): JSX.Element => {
  const queryClient = useQueryClient();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: categoryData, isLoading } = useCategories();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [saveIdCategory, setSaveIdCategory] = useState<FormPayload>({
    id: 0,
    name: "",
  });

  const { control, watch, handleSubmit, setValue } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleOpenEdit = (payload: FormPayload) => {
    setIsOpenEdit((prev) => !prev);
    setSaveIdCategory({
      id: payload.id,
      name: payload.name,
    });
  };

  const handleCloseEdit = (): void => {
    setIsOpenEdit((prev) => !prev);
    setSaveIdCategory({
      id: 0,
      name: "",
    });
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
        headerName: "Nama Kategori",
        field: "name",
        filter: "agTextColumnFilter",
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Aksi",
        field: "action",
        width: 190,
        cellRenderer: ({ data }: { data: FormPayload }) => {
          return (
            <Box display="flex" gap="0.5rem" marginTop="4px">
              <Button
                type="button"
                variant="contained"
                color="warning"
                size="small"
                sx={{ fontWeight: 500, display: "flex", alignItems: "center" }}
                onClick={() => {
                  handleOpenEdit({
                    id: data.id,
                    name: data.name,
                  });
                }}
              >
                <IconEdit size={20} style={{ marginRight: "4px" }} />
                <span>Edit Kategori</span>
              </Button>
            </Box>
          );
        },
      },
    ];
  }, []);

  const rows = useMemo(() => {
    if (categoryData?.data) {
      return categoryData?.data.map((category) => ({
        name: category.name,
        id: category.id,
      }));
    }

    return [];
  }, [categoryData?.data]);

  const isNotEmptyCategory = Object.values(saveIdCategory).some(
    (val) => val !== ""
  );

  useEffect(() => {
    if (isNotEmptyCategory) {
      setValue("name", saveIdCategory.name);
    }
  }, [saveIdCategory.id, saveIdCategory.name, isNotEmptyCategory, setValue]);

  const onSubmit = async (): Promise<void> => {
    const payload = {
      name: watch("name"),
    };

    try {
      setIsSubmitting(true);

      const result = isNotEmptyCategory
        ? await updateCategory(payload, saveIdCategory.id)
        : await addCategory(payload);

      if (result.success) {
        const message = isNotEmptyCategory
          ? "Berhasil mengubah kategori"
          : "Berhasil menambahkan kategori";

        toast.success(message);
        setValue("name", "");

        if (isNotEmptyCategory) {
          handleCloseEdit();
        } else {
          setIsOpen(false);
        }

        queryClient.refetchQueries({ queryKey: ["categories"] });
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });
      const message = isNotEmptyCategory
        ? "Gagal mengubah kategori"
        : "Gagal menambahkan kategori";

      toast.error(message);
    }
  };

  return isLoading ? (
    <PageLoader />
  ) : (
    <Box
      component="div"
      position="relative"
      display="grid"
      gap="1rem"
      gridTemplateColumns={mdUp ? "2fr" : "1fr"}
      sx={{
        marginX: mdUp ? 0 : "1rem",
      }}
    >
      <Box marginBottom="20px">
        <Button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          variant="contained"
          color="primary"
        >
          Tambah Kategori
        </Button>

        {isOpen && (
          <FormDialog
            open={isOpen}
            maxWidth="sm"
            title="Kategori"
            handleClose={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <DialogContentText>
              Tambahkan kategori baru untuk produk Anda.
            </DialogContentText>

            <Box
              onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
              }}
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="name">
                        Nama Kategori
                      </CustomFormLabel>

                      <CustomTextField
                        {...field}
                        fullWidth
                        type="text"
                        id="name"
                        sx={{ fontWeight: 600, marginBottom: "4px" }}
                        placeholder="contoh: Ruby"
                      />

                      {error && (
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          fontWeight={600}
                          color="red"
                          paddingTop="10px"
                        >
                          {error.message}
                        </Typography>
                      )}
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
              >
                {isSubmitting ? "Sedang diproses..." : "Tambah Kategori"}
              </Button>
            </Box>
          </FormDialog>
        )}
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

      {isOpenEdit && (
        <FormDialog
          open={isOpenEdit}
          maxWidth="sm"
          title="Ubah Kategori"
          handleClose={() => {
            handleCloseEdit();
          }}
        >
          <DialogContentText>
            Ubah kategori baru untuk produk Anda.
          </DialogContentText>

          <Box
            onSubmit={(e) => {
              handleSubmit(onSubmit)(e);
            }}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="name">
                      Nama Kategori
                    </CustomFormLabel>

                    <CustomTextField
                      {...field}
                      fullWidth
                      type="text"
                      id="name"
                      sx={{ fontWeight: 600, marginBottom: "4px" }}
                      placeholder="contoh: Ruby"
                    />

                    {error && (
                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="red"
                        paddingTop="10px"
                      >
                        {error.message}
                      </Typography>
                    )}
                  </Box>
                );
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="warning"
              size="medium"
              sx={{ marginTop: "20px" }}
            >
              {isSubmitting ? "Sedang diproses..." : "Ubah Kategori"}
            </Button>
          </Box>
        </FormDialog>
      )}
    </Box>
  );
};

export default CategoryModule;
