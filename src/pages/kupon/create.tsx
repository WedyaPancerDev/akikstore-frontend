import * as yup from "yup";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";

import CustomFormLabel from "components/FormLabel";
import CustomOutlinedInput from "components/OutlineInput";
import CustomTextField from "components/TextField";
import PageContainer from "components/Container/PageContainer";

import { ReactSelectValueProps } from "types";
import { getCustomStyle } from "utils/react-select";
import { useState } from "react";
import {
  createCoupon,
  CreateCouponPayload,
  getGenerateCoupon,
  GetGenerateCouponResponse,
} from "services/coupon";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ApiResponse, ErrorPayload } from "types/response";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = yup.object().shape({
  code: yup.string().optional(),
  type: yup.object().required("Tipe diskon diperlukan"),
  discount: yup
    .string()
    .matches(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi, "Format diskon tidak valid")
    .min(1, "Diskon minimal 1")
    .max(6, "Diskon maksimal 6")
    .required("Diskon diperlukan"),
  description: yup
    .string()
    .min(3, "Deskripsi diperlukan minimal 3 karakter")
    .required("Deskripsi diperlukan"),
  expired_at: yup.string().required("Tanggal kadaluarsa diperlukan"),
});

const ItemType = [
  {
    value: "percent",
    label: "Persentase",
  },
  {
    value: "fixed",
    label: "Nominal",
  },
];

const CreateKupon = (): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { control, watch, handleSubmit, setError, setValue } = useForm({
    defaultValues: {
      code: "",
      type: "",
      discount: "",
      description: "",
      expired_at: "",
    },
    resolver: yupResolver(formSchema),
  });

  const form = watch();
  const isDisabled =
    form.type === "" ||
    form.discount === "" ||
    form.description === "" ||
    form.expired_at === "";

  const generateCode = async (): Promise<
    GetGenerateCouponResponse["coupon"] | undefined
  > => {
    try {
      const result = await getGenerateCoupon();

      if (result?.success) {
        const data = result?.data;

        return data?.coupon;
      }

      return "";
    } catch (error) {
      console.error({ error });
    }
  };

  const clearForm = () => {
    setValue("code", "");
    setValue("type", "");
    setValue("discount", "");
    setValue("description", "");
    setValue("expired_at", "");
  };

  const onSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      const newCode = form.code === "" ? await generateCode() : form.code;

      const newPayload: CreateCouponPayload = {
        code: newCode ?? "",
        type: (form.type as ReactSelectValueProps)?.value ?? "",
        discount: Number(form.discount),
        description: form.description,
        expired_at: form.expired_at,
      };

      const result = await createCoupon(newPayload);

      if (result?.success) {
        navigate("/staff/kupon", { replace: true });
        toast.success("Kupon berhasil ditambahkan");
        queryClient.refetchQueries({ queryKey: ["coupon-all"] });
        clearForm();
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });

      const newError = (error as AxiosError).response
        ?.data as ApiResponse<ErrorPayload>;

      if (!newError?.success && Array.isArray(newError?.data?.errors)) {
        const errors = newError?.data.errors;

        errors.forEach((err) => {
          setError(err.field as "code" | "type" | "discount" | "description", {
            type: "manual",
            message: err.messages,
          });
        });
      } else {
        setError("code", {
          type: "manual",
          message: newError.message,
        });
      }

      toast.error(
        newError.message ?? "Oops! Gagal menambahkan kupon, silahkan coba lagi"
      );
    }
  };

  return (
    <PageContainer title="Kupon Tambah - AKIKSTORE" description="#">
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: lgUp ? "800px" : "100%",
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
            Tambah Kupon Baru
          </Typography>
        </Box>

        <Box
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e);
          }}
          method="POST"
          component="form"
          marginTop={6}
        >
          <Controller
            name="code"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="code">Kode Kupon</CustomFormLabel>

                  <CustomOutlinedInput
                    {...field}
                    fullWidth
                    id="code"
                    type="text"
                    error={!!error}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      field.onChange(value.toUpperCase());
                    }}
                    inputProps={{ maxLength: 10 }}
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    placeholder="Contoh: AKIKSTORE"
                  />

                  {error ? (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      {error.message}
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="gray"
                    >
                      Kode kupon akan di generate otomatis jika inputan kosong
                    </Typography>
                  )}
                </Box>
              );
            }}
          />

          <Controller
            name="expired_at"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="expired_at">
                    Tanggal Kadaluarsa
                  </CustomFormLabel>

                  <CustomOutlinedInput
                    {...field}
                    fullWidth
                    id="expired_at"
                    type="datetime-local"
                    error={!!error}
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
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
            name="type"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="type">Tipe Diskon</CustomFormLabel>

                  <Select<ReactSelectValueProps>
                    {...(field as any)}
                    inputId="country"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    options={ItemType}
                    placeholder="Pilih Tipe Diskon"
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
            name="discount"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="discount">
                    Diskon (Persentase/Nominal)
                  </CustomFormLabel>

                  <CustomOutlinedInput
                    {...field}
                    fullWidth
                    id="discount"
                    type="text"
                    error={!!error}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;

                      if (!/[^0-9]/.test(value)) {
                        field.onChange(value.replace(/[^0-9]/, ""));
                      }
                    }}
                    inputProps={{
                      maxLength:
                        (form.type as ReactSelectValueProps)?.value === "fixed"
                          ? 6
                          : 3,
                    }}
                    disabled={
                      (form.type as ReactSelectValueProps)?.value === "" ||
                      !form.type
                    }
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    placeholder="Contoh: 10"
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
                    Deskripsi Kupon
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
                    placeholder='Contoh: "Diskon 10% untuk pembelian minimal 100.000"'
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
              color="primary"
              variant="contained"
              disabled={isDisabled || isSubmitting}
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                fontSize: 14,
              }}
            >
              Tambah Kupon Baru
            </Button>
            <Button
              fullWidth
              size="large"
              type="button"
              color="inherit"
              variant="text"
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
                fontSize: 14,
              }}
            >
              Kembali
            </Button>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default CreateKupon;
