import * as yup from "yup";
import { useRef, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";

import CustomFormLabel from "components/FormLabel";
// import CustomTextField from "components/TextField";
import PageContainer from "components/Container/PageContainer";

import { ReactSelectValueProps } from "types";
import { getCustomStyle } from "utils/react-select";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  createShippingCost,
  GetShippingCostResponse,
} from "services/shippingCost";
import { nanoid } from "nanoid";
import { useGetCustomers } from "hooks/react-query/useCustomer";
import { useShippingCost } from "hooks/react-query/useShippingCost";

import OutlinedButton from "components/Button/ButtonOutline";
import { IconPlus } from "@tabler/icons-react";

interface EmptyOptionProps {
  cuid: string;
  product_id: string;
  quantity: string;
}

interface UserSelected {
  id: string;
  fullname: string;
}

const formSchema = yup.object().shape({
  product_id: yup.object().required("Produk diperlukan"),
  quantity: yup
    .string()
    .required("Jumlah produk diperlukan")
    .matches(
      /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi,
      "Format jumlah produk tidak sesuai"
    )
    .min(1, "Jumlah produk minimal 1 digit")
    .max(2, "Jumlah produk maksimal 2 digit"),
});

const formSchemaNew = yup.object().shape({
  products: yup.array().of(formSchema),
  customer: yup.object().required("Pelanggan diperlukan"),
  courier: yup.object().required("Kurir pengiriman diperlukan"),
});

const transactionTypeList = [
  { value: "manual", label: "Transfer Manual" },
  // { value: "automatic", label: "Pembayaran Online" },
];

const getEmptyOption = (index?: number): EmptyOptionProps => {
  return {
    cuid: `${nanoid()}-${index}`,
    product_id: "",
    quantity: "",
  };
};

const CreateSettingKurir = (): JSX.Element => {
  const lastMemberRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const { data: customerData, isLoading: isLoadingCustomer } =
    useGetCustomers();
  const { data: shippingCostData, isLoading: isLoadingShippingCost } =
    useShippingCost();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      courier: "",
      customer: "",
      products: [],
    },
    resolver: yupResolver(formSchemaNew),
  });

  const form = watch();
  const { products: productSection } = form;

  const { fields, remove, append } = useFieldArray({
    control,
    name: "products",
  });

  // ** VARIABLE

  const isDisabled =
    isSubmitting || Object.values(form).some((item) => item === "");

  // ** END VARIABLE

  // ** HOOKS

  // ** END HOOKS

  const handleAddNewSection = (): void => {
    const total = fields.length + 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    append(getEmptyOption(total));

    timeoutRef.current = setTimeout(() => {
      lastMemberRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeleteSection = (index: number): void => {
    remove(index);
  };

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
    <PageContainer title="Kurir Tambah - ANTIKSTORE" description="#">
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
            name="customer"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="customer">
                    Tentukan Pelanggan <span>*</span>
                  </CustomFormLabel>

                  <Select<UserSelected>
                    {...(field as any)}
                    inputId="customer"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.fullname}
                    getOptionValue={(option) => option.id}
                    options={customerData?.data || []}
                    isLoading={isLoadingCustomer}
                    isDisabled={isLoadingCustomer}
                    placeholder="Pilih Pelanggan"
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
            name="courier"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="courier">
                    Tentukan Kurir <span>*</span>
                  </CustomFormLabel>

                  <Select<GetShippingCostResponse>
                    {...(field as any)}
                    inputId="courier"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.name?.toUpperCase()}
                    getOptionValue={(option) => option.id}
                    options={shippingCostData?.data || []}
                    placeholder="Pilih Kurir"
                    isLoading={isLoadingShippingCost}
                    isDisabled={isLoadingShippingCost}
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

          <Box sx={{ marginTop: 4 }}>
            <Typography variant="body1" fontWeight={600}>
              List Barang yang ingin ditambahkan
            </Typography>

            <Box
              component="div"
              className="container-list"
              sx={{
                marginTop: "2rem",
                gridColumn: mdUp ? "span 2 / span 2" : "span 1 / span 1",
              }}
            >
              {productSection?.map((product, index) => {
                const isLast = index === fields.length - 1;

                return (
                  <Box key={index} ref={isLast ? lastMemberRef : null}>
                    <Controller
                      name={`products.${index}.product_id`}
                      control={control}
                      render={({ field, fieldState: { error } }) => {
                        return (
                          <Box className="form-control">
                            <CustomFormLabel
                              htmlFor={`products.${index}.product_id`}
                            >
                              Tentukan Produk <span>*</span>
                            </CustomFormLabel>

                            <Select<ReactSelectValueProps>
                              {...(field as any)}
                              inputId={`products.${index}.product_id`}
                              classNamePrefix="select"
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              placeholder="Pilih Produk"
                              options={[]}
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
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              borderRadius: 0,
              marginTop: "1rem",
              gridColumn: mdUp ? "span 2 / span 2" : "span 1 / span 1",
            }}
          >
            <OutlinedButton
              fullWidth
              size="large"
              type="button"
              color="inherit"
              onClick={() => {
                handleAddNewSection();
              }}
              disabled={isSubmitting}
              sx={{
                paddingY: "8px",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                border: "1px dashed #000",
                gap: "4px",
              }}
            >
              <IconPlus size={20} />
              <span>Tambah Barang</span>
            </OutlinedButton>
          </Box>

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
