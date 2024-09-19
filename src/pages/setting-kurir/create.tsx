import * as yup from "yup";
import { useCallback, useEffect, useState } from "react";
import Select, {
  components,
  ControlProps,
  DropdownIndicatorProps,
} from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";

import CustomFormLabel from "components/FormLabel";
import CustomTextField from "components/TextField";
import PageContainer from "components/Container/PageContainer";

import { ReactSelectValueProps } from "types";
import { getCustomStyle } from "utils/react-select";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  CourierCostResponse,
  CourierPayload,
  createShippingCost,
  getCost,
  RajaOngkirCityResponse,
  RajaOngkirProvinceResponse,
  ShippingCostPayload,
} from "services/shippingCost";
import {
  useGetCourier,
  useShippingCity,
  useShippingProvince,
} from "hooks/react-query/useShippingCost";
import toast from "react-hot-toast";
import { IconBike, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import CustomSelectShippingCost from "components/CustomSelect/CustomSelectShippingCost";

const formSchema = yup.object().shape({
  name: yup.object().required("Nama kurir diperlukan"),
  area: yup.object().required("Provinsi pengiriman diperlukan"),
  city: yup.object().required("Kota pengiriman diperlukan"),
  area_destination: yup
    .object()
    .required("Provinsi tujuan pengiriman diperlukan"),
  city_destination: yup.object().required("Kota tujuan pengiriman diperlukan"),
  cost: yup.object().required("Harga diperlukan"),
  weight: yup
    .string()
    .matches(/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi, "Format berat tidak valid")
    .required("Berat diperlukan"),
});

const Control = ({ children, ...props }: ControlProps<false>): any => {
  return (
    <components.Control {...props}>
      <IconBike />
      {children}
    </components.Control>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps<true>): any => {
  const {
    selectProps: { menuIsOpen },
  } = props;
  return (
    <components.DropdownIndicator {...props}>
      {menuIsOpen ? <IconChevronDown /> : <IconChevronUp />}
    </components.DropdownIndicator>
  );
};

const CreateSettingKurir = (): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isSubmittingCheckCost, setIsSubmittingCheckCost] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [shippingCostData, setShippingCostData] = useState<
    CourierCostResponse[]
  >([]);

  const { control, watch, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      area: "",
      city: "",
      cost: "",
      name: "",
      area_destination: "",
      city_destination: "",
      weight: "",
    },
    resolver: yupResolver(formSchema),
  });

  const form = watch();

  // ** VARIABLE
  const provinceId = (form.area as unknown as RajaOngkirProvinceResponse)
    ?.province_id;
  const provinceDestionationId = (
    form.area_destination as unknown as RajaOngkirProvinceResponse
  )?.province_id;

  const cityId = (form.city as unknown as RajaOngkirCityResponse)?.city_id;
  const cityDestinationId = (
    form.city_destination as unknown as RajaOngkirCityResponse
  )?.city_id;

  const isDisabled =
    isSubmitting || Object.values(form).some((item) => item === "");

  const isDisabledCheckCost =
    !form.name ||
    !form.area ||
    !form.city ||
    !form.weight ||
    form.weight.length < 4 ||
    !form.area_destination ||
    !form.city_destination;
  // ** END VARIABLE

  // ** HOOKS
  const { data: provinceData, isLoading: isLoadingProvince } =
    useShippingProvince();

  const { data: cityData, isLoading: isLoadingCity } = useShippingCity(
    provinceId ? Number(provinceId) : 0
  );
  const { data: cityDestinationData, isLoading: isLoadingCityDestination } =
    useShippingCity(
      provinceDestionationId ? Number(provinceDestionationId) : 0
    );

  const { data: courierData, isLoading: isLoadingCourier } = useGetCourier(
    cityId !== undefined && cityDestinationId !== undefined
  );
  // ** END HOOKS

  const getPayloadCourier = (): CourierPayload => {
    const { city, city_destination, weight, name } = getValues();

    return {
      origin: (city as RajaOngkirCityResponse).city_id || "",
      destination: (city_destination as RajaOngkirCityResponse).city_id || "",
      weight: weight !== undefined ? Number(weight) : "",
      courier: (name as unknown as ReactSelectValueProps).value,
    };
  };

  const handleCheckCourierCost = useCallback(async () => {
    const payload = getPayloadCourier();

    try {
      setIsSubmittingCheckCost(true);

      const result = await getCost(payload);

      if (result.success) {
        const data = result.data;

        setShippingCostData(data);
        setIsChecking((prev) => !prev);
        toast.success("Berhasil mengecek ongkir");
      }

      setIsSubmittingCheckCost(false);
    } catch (error) {
      console.error({ error });
      setIsChecking((prev) => !prev);
      setIsSubmittingCheckCost(false);
      toast.error("Gagal mengecek ongkir. Rute pengiriman tidak ditemukan");
    }
  }, []);

  const checkingCourierCost = async () => {
    setIsChecking((prev) => !prev);
  };

  const resetForm = () => {
    setValue("area", "");
    setValue("city", "");
    setValue("cost", "");
    setValue("name", "");
    setValue("area_destination", "");
    setValue("city_destination", "");
    setValue("weight", "");
  };

  const onSubmit = async () => {
    const payload: ShippingCostPayload = {
      area: (form.area as RajaOngkirProvinceResponse).province,
      city: (form.city as RajaOngkirCityResponse).city_name,
      area_destination: (form.area_destination as RajaOngkirProvinceResponse)
        .province,
      city_destination: (form.city_destination as RajaOngkirCityResponse)
        .city_name,
      cost: Number((form.cost as unknown as CourierCostResponse)?.cost),
      name: (form.name as ReactSelectValueProps).value,
    };

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

  useEffect(() => {
    if (isChecking) {
      handleCheckCourierCost();
    }
  }, [isChecking]);

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
            Tambah Kurir Baru
          </Typography>
          <Typography
            variant="body1"
            fontSize="16px"
            fontWeight={400}
            color="text.secondary"
            mb={3}
            lineHeight={1.5}
          >
            List Kurir Pengiriman diambil dari{" "}
            <a
              href="https://rajaongkir.com"
              target="_blank"
              style={{ fontWeight: 600 }}
            >
              RajaOngkir
            </a>
            .
            <br />
            Sehingga informasi mengenai kurir pengiriman akan selalu up to date
            dari Pusat.
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
          <Box sx={{ marginBottom: "3rem" }}>
            <Typography variant="h3" fontSize="20px" fontWeight={600}>
              Kota Awal Pengiriman
            </Typography>

            <Controller
              name="area"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="province">
                      Provinsi Pengiriman
                    </CustomFormLabel>

                    <Select<RajaOngkirProvinceResponse>
                      {...(field as any)}
                      inputId="province"
                      classNamePrefix="select"
                      getOptionLabel={(option) => option.province}
                      getOptionValue={(option) => option.province_id}
                      options={provinceData?.data || []}
                      isLoading={isLoadingProvince}
                      isDisabled={isLoadingProvince}
                      placeholder="Pilih Provinsi"
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
                    <CustomFormLabel htmlFor="city">
                      Kota Pengiriman
                    </CustomFormLabel>

                    <Select<RajaOngkirCityResponse>
                      {...(field as any)}
                      inputId="city"
                      classNamePrefix="select"
                      getOptionLabel={(option) => option.city_name}
                      getOptionValue={(option) => option.city_id}
                      options={cityData?.data || []}
                      isLoading={isLoadingCity}
                      isDisabled={isLoadingCity || provinceId === undefined}
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
          </Box>

          <Box sx={{ marginBottom: "3rem" }}>
            <Typography variant="h3" fontSize="20px" fontWeight={600}>
              Kota Tujuan Pengiriman
            </Typography>

            <Controller
              name="area_destination"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="area_destination">
                      Provinsi Tujuan Pengiriman
                    </CustomFormLabel>

                    <Select<RajaOngkirProvinceResponse>
                      {...(field as any)}
                      inputId="area_destination"
                      classNamePrefix="select"
                      getOptionLabel={(option) => option.province}
                      getOptionValue={(option) => option.province_id}
                      options={provinceData?.data || []}
                      isLoading={isLoadingProvince}
                      isDisabled={isLoadingProvince}
                      placeholder="Pilih Provinsi Tujuan"
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
              name="city_destination"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="city_destination">
                      Kota Tujuan Pengiriman
                    </CustomFormLabel>

                    <Select<RajaOngkirCityResponse>
                      {...(field as any)}
                      inputId="city_destination"
                      classNamePrefix="select"
                      getOptionLabel={(option) => option.city_name}
                      getOptionValue={(option) => option.city_id}
                      options={cityDestinationData?.data || []}
                      isLoading={isLoadingCityDestination}
                      isDisabled={
                        isLoadingCityDestination ||
                        provinceDestionationId === undefined
                      }
                      placeholder="Pilih Kota Tujuan"
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

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="city">
                    Nama Kurir Pengiriman
                  </CustomFormLabel>

                  <Select<ReactSelectValueProps>
                    {...(field as any)}
                    inputId="city"
                    classNamePrefix="select"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    options={courierData?.data || []}
                    placeholder="Pilih Kurir Pengiriman"
                    isLoading={isLoadingCourier}
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
            name="weight"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ...rest } = field;

              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="weight">
                    Masukan Berat Pengiriman (gram)
                  </CustomFormLabel>

                  <CustomTextField
                    {...rest}
                    fullWidth
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newValue = e.target.value;

                      if (!/[^0-9]/.test(newValue)) {
                        field.onChange(newValue.replace(/[^0-9]/, ""));
                      }
                    }}
                    inputProps={{
                      maxLength: 4,
                    }}
                    value={value}
                    id="weight"
                    placeholder="contoh: 1500"
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
            name="cost"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="cost">
                    Harga Pengiriman (Rp)
                  </CustomFormLabel>

                  <Box display="flex" alignItems="center">
                    <Box flex={1} marginRight={2}>
                      <Select<CourierCostResponse>
                        {...(field as any)}
                        inputId="cost"
                        classNamePrefix="select"
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.name}
                        options={shippingCostData || []}
                        components={{
                          Control,
                          DropdownIndicator,
                          Option: CustomSelectShippingCost,
                        }}
                        menuPlacement="top"
                        isDisabled={isChecking}
                        isLoading={isChecking || isSubmittingCheckCost}
                        placeholder="Pilih Harga Pengiriman"
                        styles={getCustomStyle(error)}
                      />
                    </Box>

                    <Button
                      type="button"
                      size="large"
                      color="primary"
                      variant="contained"
                      sx={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                        fontSize: 14,
                      }}
                      disabled={isDisabledCheckCost || isChecking}
                      onClick={checkingCourierCost}
                    >
                      Cek Ongkir
                    </Button>
                  </Box>

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
              Tambah Kurir Baru
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
