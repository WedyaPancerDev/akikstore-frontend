import * as yup from "yup";
import { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "react-photo-view/dist/react-photo-view.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";
import PageContainer from "components/Container/PageContainer";

import { type GetCategoryResponse } from "services/category";
import { type ProductPayload, updateProduct } from "services/products";
import { uploadFile, UploadFileResponse } from "services/upload";

import { getCustomStyle } from "utils/react-select";
import { useCategories } from "hooks/react-query/useCategory";
import { useProductByCodeAdmin } from "hooks/react-query/useProduct";
import PageLoaderTwo from "components/PageLoaderTwo";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
);

const formSchema = yup.object().shape({
  title: yup
    .string()
    .required("Nama Produk harus diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(255, "Nama maksimal 255 karakter")
    .matches(/^[ a-zA-Z]+$/, "Nama produk hanya boleh berisi huruf"),
  description: yup
    .string()
    .required("Deskripsi harus diisi")
    .min(3, "Deskripsi minimal 3 karakter")
    .max(255, "Deskripsi maksimal 255 karakter"),
  price_buy: yup
    .string()
    .required("Harga beli wajib diisi")
    .matches(
      /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi,
      "Format harga beli tidak sesuai"
    )
    .max(12, "Maksimal 12 karakter"),
  price_sell: yup
    .string()
    .required("Harga jual wajib diisi")
    .matches(
      /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi,
      "Format harga jual tidak sesuai"
    )
    .max(12, "Maksimal 12 karakter"),
  stock: yup
    .string()
    .required("Stok wajib diisi")
    .matches(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi, "Format stok tidak sesuai")
    .max(4, "Maksimal 4 karakter"),
  category_id: yup.object().required("Kategori harus diisi"),
  images: yup.array().optional(),
});

const EditProduk = (): JSX.Element => {
  const { code = "" } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const {
    data: productByCodeData,
    isLoading: isLoadingGetProductByCode,
    isError,
  } = useProductByCodeAdmin(code as string);
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();

  const productByCode = productByCodeData?.data;
  const categories = categoriesData?.data ?? [];

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      images: [],
      category_id: "",
      price_buy: "",
      price_sell: "",
      stock: "",
    },
    resolver: yupResolver(formSchema),
  });

  const form = watch();

  const clearForm = (): void => {
    setValue("title", "");
    setValue("description", "");
    setValue("images", []);
    setValue("category_id", "");
    setValue("price_buy", "");
    setValue("price_sell", "");
    setValue("stock", "");
  };

  const fetchUploadFile = async () => {
    const formData = new FormData();
    const images = form.images;

    if (!images?.length) {
      toast.error("File is required");

      return null;
    }

    try {
      formData.append("file", images[0] as File);
      const res = await uploadFile(formData, "product");

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

  const getPayload = (
    additionalPayload: Pick<ProductPayload, "images">
  ): ProductPayload => {
    return {
      title: form.title,
      description: form.description,
      category_id: (form.category_id as unknown as GetCategoryResponse).id,
      price_buy: Number(form.price_buy),
      price_sell: Number(form.price_sell),
      stock: Number(form.stock),
      ...additionalPayload,
    };
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const url =
        form.images?.length !== 0
          ? await fetchUploadFile()
          : productByCode?.images;
      const payload = getPayload({ images: url ?? "" });

      const result = await updateProduct(payload, code as string);

      if (result.success) {
        toast.success(
          "Produk berhasil diubah. Silahkan cek di halaman list produk"
        );
        clearForm();
        setIsSubmitting(false);
        queryClient.refetchQueries({ queryKey: ["products-admin"] });
        navigate("/staff/list-produk", { replace: true });

        return;
      }

      toast.error("Oops, Gagal mengubah produk. Coba beberapa saat lagi");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });
      toast.error("Oops, Terjadi kesalahan. Coba beberapa saat lagi");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Produk tidak ditemukan");
      navigate("/staff/list-produk", { replace: true });
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (productByCode) {
      setValue("title", productByCode.title);
      setValue("description", productByCode.description);
      setValue("price_buy", String(productByCode.price_buy));
      setValue("price_sell", String(productByCode.price_sell));
      setValue("stock", String(productByCode.stock));
      setValue(
        "category_id",
        categories?.find((c) => c.id === productByCode.category_id) as any
      );
    }
  }, [productByCode, categories, setValue]);

  return (
    <PageContainer title="Edit Produk - AKIKSTORE" description="#">
      {isLoadingGetProductByCode ? (
        <PageLoaderTwo />
      ) : (
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: lgUp ? "800px" : "100%",
            marginBottom: "2rem",
          }}
        >
          <Box display="flex" flexDirection="column">
            <Typography
              variant="h2"
              fontSize="28px"
              fontWeight={700}
              letterSpacing="-0.01em"
              mb={1}
            >
              Edit Produk Baru
            </Typography>

            <Box
              component="form"
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
              marginTop="2rem"
            >
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="title">
                        Masukan Nama Produk
                      </CustomFormLabel>

                      <CustomTextField
                        {...field}
                        fullWidth
                        sx={{ fontWeight: 600, marginBottom: "4px" }}
                        id="title"
                        placeholder="contoh: Batu Permata"
                        disabled={isSubmitting}
                        type="text"
                      />

                      {error && (
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          fontWeight={600}
                          color="red"
                        >
                          {error.message}
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />

              <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="description">
                        Deskripsi Produk
                      </CustomFormLabel>

                      <CustomTextField
                        {...field}
                        fullWidth
                        type="text"
                        id="description"
                        error={!!error}
                        sx={{ fontWeight: 600 }}
                        multiline
                        rows={6}
                        placeholder='Contoh: "Batu permata asli dari pegunungan"'
                      />

                      {error && (
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          fontWeight={600}
                          color="red"
                        >
                          {error.message}
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />

              <Controller
                name="images"
                control={control}
                render={({ field }) => {
                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="image_proofing">
                        Bukti Transfer
                      </CustomFormLabel>

                      <PhotoProvider>
                        <PhotoView src={productByCodeData?.data.images ?? ""}>
                          <img
                            src={productByCodeData?.data.images ?? ""}
                            alt={productByCodeData?.data.title}
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

                      <Box marginTop={1} />
                      <FilePond
                        name="images"
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
                        labelIdle="Ubah gambar produk. Max 3 MB"
                        credits={false}
                        maxFileSize="3MB"
                      />

                      <Typography
                        variant="caption"
                        fontSize="12px"
                        fontWeight={600}
                        color="gray"
                      >
                        Jika tidak ingin mengubah gambar, kosongkan saja!
                      </Typography>
                    </Box>
                  );
                }}
              />

              <Controller
                name="category_id"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="title">
                        Pilih Kategori Produk
                      </CustomFormLabel>

                      <Select<GetCategoryResponse>
                        {...(field as any)}
                        inputId="search"
                        classNamePrefix="select"
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        options={categoriesData?.data || []}
                        isLoading={isLoadingCategories}
                        isDisabled={isLoadingCategories || isSubmitting}
                        placeholder="Kategori Produk"
                        styles={getCustomStyle(error)}
                      />

                      {error && (
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          fontWeight={600}
                          color="red"
                        >
                          {error.message}
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />

              <Controller
                name="price_buy"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const { onChange, value, ...rest } = field;

                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="price_buy">
                        Harga Beli (Rp)
                      </CustomFormLabel>

                      <CustomTextField
                        {...rest}
                        fullWidth
                        sx={{ fontWeight: 600, marginBottom: "4px" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;

                          if (!/[^0-9]/.test(value)) {
                            onChange(value.replace(/[^0-9]/, ""));
                          }
                        }}
                        value={value}
                        id="price_buy"
                        inputMode="numeric"
                        placeholder="contoh: 100000"
                        disabled={isSubmitting}
                        type="text"
                      />

                      {error && (
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          fontWeight={600}
                          color="red"
                        >
                          {error.message}
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />

              <Controller
                name="price_sell"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const { onChange, value, ...rest } = field;

                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="price_sell">
                        Harga Jual (Rp)
                      </CustomFormLabel>

                      <CustomTextField
                        {...rest}
                        fullWidth
                        sx={{ fontWeight: 600, marginBottom: "4px" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;

                          if (!/[^0-9]/.test(value)) {
                            onChange(value.replace(/[^0-9]/, ""));
                          }
                        }}
                        value={value}
                        id="price_sell"
                        inputMode="numeric"
                        placeholder="contoh: 150000"
                        disabled={isSubmitting}
                        type="text"
                      />

                      {error && (
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          fontWeight={600}
                          color="red"
                        >
                          {error.message}
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />

              <Controller
                name="stock"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const { onChange, value, ...rest } = field;

                  return (
                    <Box className="form-control">
                      <CustomFormLabel htmlFor="stock">
                        Total Stok
                      </CustomFormLabel>

                      <CustomTextField
                        {...rest}
                        fullWidth
                        sx={{ fontWeight: 600, marginBottom: "4px" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;

                          if (!/[^0-9]/.test(value)) {
                            onChange(value.replace(/[^0-9]/, ""));
                          }
                        }}
                        value={value}
                        inputProps={{
                          maxLength: 4,
                        }}
                        id="stock"
                        inputMode="numeric"
                        placeholder="contoh: 10"
                        disabled={isSubmitting}
                        type="text"
                      />

                      {error && (
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          fontWeight={600}
                          color="red"
                        >
                          {error.message}
                        </Typography>
                      )}
                    </Box>
                  );
                }}
              />

              <Box
                marginTop={3}
                gap="12px"
                display="grid"
                gridTemplateColumns="1fr"
              >
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  color="warning"
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengubah..." : "Edit Produk Baru"}
                </Button>
                <Button
                  fullWidth
                  size="large"
                  type="button"
                  color="inherit"
                  variant="text"
                  disabled={isSubmitting}
                  onClick={() => {
                    navigate("/staff/list-produk", { replace: true });
                  }}
                  sx={{
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  Kembali
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </PageContainer>
  );
};

export default EditProduk;
