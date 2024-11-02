import * as yup from "yup";
import { useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";

import CustomFormLabel from "components/FormLabel";
// import CustomTextField from "components/TextField";
import PageContainer from "components/Container/PageContainer";

import { ReactSelectValueProps } from "types";
import { getCustomStyle } from "utils/react-select";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { createShippingCost } from "services/shippingCost";

const formSchema = yup.object().shape({
  products: yup.object().required("Produk diperlukan"),
  payment_method: yup.object().required("Metode pembayaran diperlukan"),
  courier: yup.object().required("Kurir pengiriman diperlukan"),
});

const transactionTypeList = [
  { value: "manual", label: "Transfer Manual" },
  // { value: "automatic", label: "Pembayaran Online" },
];

const CreateSettingKurir = (): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      courier: "",
      payment_method: "",
      products: "",
    },
    resolver: yupResolver(formSchema),
  });

  const form = watch();

  // ** VARIABLE

  const isDisabled =
    isSubmitting || Object.values(form).some((item) => item === "");

  // ** END VARIABLE

  // ** HOOKS

  // ** END HOOKS

  const resetForm = () => {};

  const onSubmit = async () => {
    const payload = {};

    try {
      setIsSubmitting(true);

      const result = await createShippingCost(payload);

      if (result.success) {
        resetForm();
        navigate("/staff/setting-kurir", { replace: true });
        queryClient.refetchQueries({ queryKey: ["shipping-cost"] });
        toast.success("Berhasil menambahkan kurir pengiriman");
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error({ error });
      toast.error("Gagal menambahkan kurir pengiriman");
    }
  };

  return (
    <PageContainer title="Kurir Tambah - AKIKSTORE" description="#">
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
            Transaksi Manual
          </Typography>
        </Box>

        <Box
          method="POST"
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          marginTop={6}
          marginBottom={4}
        >
          <Controller
            name="products"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="product">
                    Tentukan Produk <span>*</span>
                  </CustomFormLabel>

                  <Select<ReactSelectValueProps>
                    {...(field as any)}
                    inputId="product"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    options={[]}
                    isMulti
                    placeholder="Pilih Produk"
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
            name="payment_method"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="payment_method">
                    Tentukan Metode Pembayaran <span>*</span>
                  </CustomFormLabel>

                  <Select<ReactSelectValueProps>
                    {...(field as any)}
                    inputId="payment_method"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    options={transactionTypeList || []}
                    placeholder="Pilih Metode Pembayaran"
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
              Tambah Transaksi Manual
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
              onClick={() => {
                navigate("/staff/setting-kurir", { replace: true });
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

export default CreateSettingKurir;
