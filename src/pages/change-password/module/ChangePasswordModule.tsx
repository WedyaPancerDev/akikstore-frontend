import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

import { changePassword } from "services/auth";
import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/OutlineInput";
import { ApiResponse, ErrorPayload } from "types/response";
import { useNavigate } from "react-router-dom";
import { ValidateProps } from "types";
import useCookie from "hooks/useCookie";

const formSchema = yup.object().shape({
  current_password: yup.string().required("Password saat ini wajib diisi"),
  new_password: yup.string().required("Password baru wajib diisi"),
});

type ChangePasswordForm = {
  current_password: string;
  new_password: string;
};

const ChangePasswordModule = (): JSX.Element => {
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const { handleSubmit, watch, control, setValue, setError } = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
    },

    resolver: yupResolver(formSchema),
  });

  const { getFromLocalStorage } = useCookie();

  const form = watch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const secureValue = getFromLocalStorage(
    "validate"
  ) as unknown as ValidateProps;

  const clearForm = (): void => {
    setValue("current_password", "");
    setValue("new_password", "");
  };

  const getPayload = (): ChangePasswordForm => {
    return {
      current_password: form.current_password,
      new_password: form.new_password,
    };
  };

  const onSubmit = async (): Promise<void> => {
    const payload = getPayload();

    try {
      setIsSubmitting(true);

      const result = await changePassword(payload);

      if (result?.success) {
        clearForm();

        toast.success("Berhasil mengubah password!");
        setIsSubmitting(false);

        const currentRole = secureValue.role;

        if (["admin", "employee"].includes(currentRole)) {
          navigate("/staff/dashboard", { replace: true });
        } else {
          navigate("/pelanggan/dashboard", { replace: true });
        }
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
          setError(err.field as "current_password" | "new_password", {
            type: "manual",
            message: err.messages,
          });
        });
      } else {
        setError("current_password", {
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

  const isDisabled = form.current_password === "" || form.new_password === "";

  return (
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
          Ubah Password
        </Typography>

        <Box
          component="form"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
        >
          <Controller
            name="current_password"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="current_password">
                    Masukan Password Saat Ini
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
                    id="current_password"
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
                      Kata sandi minimal 8 karakter (Gunakan kombinasi huruf,
                      angka, dan simbol)
                    </Typography>
                  )}
                </Box>
              );
            }}
          />

          <Controller
            name="new_password"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="new_password">
                    Masukan Password Baru
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
                    id="new_password"
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
                      Kata sandi minimal 8 karakter (Gunakan kombinasi huruf,
                      angka, dan simbol)
                    </Typography>
                  )}
                </Box>
              );
            }}
          />

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
              {isSubmitting ? "Memproses..." : "Ubah Password"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePasswordModule;
