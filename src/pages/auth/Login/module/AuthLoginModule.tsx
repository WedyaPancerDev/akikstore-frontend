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
import { useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";

import useCookie from "hooks/useCookie";
import { setTokenBearer } from "utils/axios";
import { type LoginPayload, authLogin } from "services/auth";
import { ApiResponse, ErrorPayload } from "types/response";
import Logo from "components/Logo";

const formSchema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

const AuthLogin = (): JSX.Element => {
  const { saveCookie, saveToLocalStorage } = useCookie();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { handleSubmit, watch, control, setValue, getValues, setError } =
    useForm({
      defaultValues: {
        email: "",
        password: "",
      },

      resolver: yupResolver(formSchema),
    });

  const form = watch();

  const clearForm = (): void => {
    setValue("email", "");
    setValue("password", "");
  };

  const getPayload = (): LoginPayload => {
    const values = getValues();

    return {
      email: values.email,
      password: values.password,
    };
  };

  const onSubmit = async (): Promise<void> => {
    const payload = getPayload();

    try {
      setIsSubmitting(true);

      const result = await authLogin(payload);

      if (result?.success) {
        const data = result?.data;

        const valueSecure = {
          role: data?.role,
          user_id: data?.user_id,
          status: 'signin'
        };

        saveToLocalStorage("validate", JSON.stringify(valueSecure));
        setTokenBearer(data?.token);
        saveCookie({
          token: data?.token,
          exp: data?.exp,
        });

        clearForm();
        toast.success("Hi! Selamat datang di sistem 😉");
        navigate("/validate", { replace: true });

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
            Masuk ke Akun anda
          </Typography>
        </Divider>
      </Box>

      <Box
        component="form"
        method="POST"
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <Stack>
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
                    placeholder="Contoh: made@akikstore.com"
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
            {isSubmitting ? "Memproses..." : "Masuk"}
          </Button>
        </Box>
      </Box>

      <Typography variant="caption" fontWeight={600}>
        @{new Date().getFullYear()} - AKIKSTORE
      </Typography>
    </Fragment>
  );
};

export default AuthLogin;
