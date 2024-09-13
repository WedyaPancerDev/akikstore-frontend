import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";

import Logo from "components/Logo";
import { ApiResponse, ErrorPayload } from "types/response";
import { type RegisterPayload, authRegister } from "services/auth";
import { city, country } from "utils/constant";
import { getCustomStyle } from "utils/react-select";
import { ReactSelectValueProps } from "types";

const formSchema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
  confirmation_password: yup
    .string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([yup.ref("password")], "Password tidak sama"),
  fullname: yup
    .string()
    .required("Nama lengkap wajib diisi")
    .matches(/^[ a-zA-Z]+$/, "Nama lengkap hanya boleh berisi huruf"),
  city: yup.object().required("Kota wajib diisi"),
  country: yup.object().required("Negara wajib diisi"),
  postal_code: yup
    .string()
    .required("Kode pos wajib diisi")
    .matches(
      /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi,
      "Format nomor Kode Pos tidak sesuai"
    )
    .max(6, "Maksimal 6 karakter"),
  phone: yup
    .string()
    .required("No WhatsApp harus diisi")
    .matches(
      /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi,
      "Format nomor Whatsapp tidak sesuai"
    )
    .min(10, "Minimal 10 karakter")
    .max(15, "Maksimal 15 karakter"),
});

const AuthRegister = (): JSX.Element => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { handleSubmit, watch, control, setValue, getValues, setError } =
    useForm({
      defaultValues: {
        email: "",
        password: "",
        confirmation_password: "",
        city: "",
        country: "",
        fullname: "",
        phone: "",
        postal_code: "",
      },

      resolver: yupResolver(formSchema),
    });

  const form = watch();

  const clearForm = (): void => {
    setValue("email", "");
    setValue("password", "");
    setValue("confirmation_password", "");
    setValue("city", "");
    setValue("country", "");
    setValue("fullname", "");
    setValue("postal_code", "");
    setValue("phone", "");
  };

  const getPayload = (): RegisterPayload => {
    const values = getValues();

    return {
      email: values.email,
      password: values.password,
      confirmation_password: values.confirmation_password,
      city: (values.city as ReactSelectValueProps).value,
      country: (values.country as ReactSelectValueProps).value,
      fullname: values.fullname,
      phone: values.phone,
      postal_code: values.postal_code,
    };
  };

  const onSubmit = async (): Promise<void> => {
    const payload = getPayload();

    try {
      setIsSubmitting(true);

      const result = await authRegister(payload);

      if (result?.success) {
        clearForm();
        toast.success("Yey! Akun berhasil dibuat. Silahkan masuk sekarang");
        navigate("/masuk", { replace: true });

        setIsSubmitting(false);
        return;
      }

      toast.error(result.message);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);

      const newError = (error as AxiosError).response
        ?.data as ApiResponse<ErrorPayload>;

      if (!newError?.success && Array.isArray(newError?.data?.errors)) {
        const errors = newError?.data.errors;

        errors.forEach((err) => {
          setError(err.field as "email" | "password", {
            type: "manual",
            message: err.messages,
          });
        });
      } else {
        setError("password", {
          type: "manual",
          message: newError.message,
        });
      }

      toast.error(
        newError.message ??
          "Oops! Terjadi kesalahan saat melakukan login. Silahkan coba lagi!"
      );
    }
  };

  const isDisabled =
    form.email === "" || form.password === "" || form.password.length < 8;

  return (
    <Fragment>
      <Box mt={3}>
        <Box marginY="14px" display="flex" justifyContent="center">
          <Logo />
        </Box>

        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="body1"
            fontWeight="600"
            position="relative"
            px={2}
          >
            Daftar Akun Baru
          </Typography>
        </Divider>
      </Box>

      <Box
        component="form"
        method="POST"
        maxHeight="500px"
        height="100%"
        sx={{
          position: "relative",
          overflowY: "scroll",
          px: 1.5,
          boxShadow: "inset 0px -4px 10px -6px rgba(0, 0, 0, 0.2)",
        }}
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Stack>
          <Controller
            name="fullname"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="fullname">
                    Masukan Nama Lengkap
                  </CustomFormLabel>

                  <CustomTextField
                    {...field}
                    fullWidth
                    autoComplete="name"
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    id="fullname"
                    placeholder="contoh: Patriot Santosa"
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
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="email">
                    Masukan Email
                  </CustomFormLabel>
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="email"
                    id="email"
                    error={!!error}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      field.onChange(value.toLowerCase());
                    }}
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    autoComplete="email"
                    disabled={isSubmitting}
                    placeholder="contoh: made@akikstore.com"
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

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="password">
                    Masukan Password
                  </CustomFormLabel>

                  <CustomTextField
                    {...field}
                    fullWidth
                    autoComplete="new-password"
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    endAdornment={
                      <IconButton
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <IconEyeOff size={24} color="#9ca3af" />
                        ) : (
                          <IconEye size={24} color="#9ca3af" />
                        )}
                      </IconButton>
                    }
                    id="password"
                    placeholder="****"
                    disabled={isSubmitting}
                    type={showPassword ? "text" : "password"}
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
                      Kata sandi minimal 8 karakter
                    </Typography>
                  )}
                </Box>
              );
            }}
          />

          <Controller
            name="confirmation_password"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="confirmation_password">
                    Masukan Ulang Password
                  </CustomFormLabel>

                  <CustomTextField
                    {...field}
                    fullWidth
                    autoComplete="new-password"
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    endAdornment={
                      <IconButton
                        onClick={() => {
                          setShowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <IconEyeOff size={24} color="#9ca3af" />
                        ) : (
                          <IconEye size={24} color="#9ca3af" />
                        )}
                      </IconButton>
                    }
                    id="confirmation_password"
                    placeholder="****"
                    disabled={isSubmitting}
                    type={showPassword ? "text" : "password"}
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
                      Kata sandi minimal 8 karakter
                    </Typography>
                  )}
                </Box>
              );
            }}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ...rest } = field;

              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="phone">
                    Masukan Nomor Telepon
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
                    autoComplete="tel"
                    value={value}
                    inputProps={{
                      maxLength: 15,
                    }}
                    id="phone"
                    placeholder="contoh: 089777344332"
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
            name="country"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="country">
                    Pilih Negara
                  </CustomFormLabel>

                  <Select<ReactSelectValueProps>
                    {...(field as any)}
                    inputId="country"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    options={country}
                    placeholder="Pilih Negara"
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
            name="city"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="city">Pilih Kota</CustomFormLabel>

                  <Select<ReactSelectValueProps>
                    {...(field as any)}
                    inputId="city"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    options={city}
                    menuPlacement="top"
                    placeholder="Pilih Kota"
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
            name="postal_code"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ...rest } = field;

              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="postal_code">
                    Masukan Kode Pos
                  </CustomFormLabel>

                  <CustomTextField
                    {...rest}
                    fullWidth
                    autoComplete="tel"
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;

                      if (!/[^0-9]/.test(value)) {
                        onChange(value.replace(/[^0-9]/, ""));
                      }
                    }}
                    inputProps={{
                      maxLength: 6,
                    }}
                    value={value}
                    id="postal_code"
                    placeholder="contoh: 80112"
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
        </Stack>
        <Box mt={3} mb={2}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            sx={{ fontWeight: 600 }}
            disabled={isSubmitting || isDisabled}
          >
            {isSubmitting ? "Memproses..." : "Daftar Akun Baru"}
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt="10px"
      >
        <Typography variant="caption" fontWeight={600}>
          @{new Date().getFullYear()} - AKIKSTORE
        </Typography>

        <Typography variant="caption" fontWeight={600}>
          Sudah punya akun?{" "}
          <Box
            component={Link}
            to="/masuk"
            sx={{
              "&:hover": { textDecoration: "none" },
              textDecoration: "underline",
              color: "#3b82f6",
            }}
          >
            Masuk sekarang!
          </Box>
        </Typography>
      </Box>
    </Fragment>
  );
};

export default AuthRegister;
