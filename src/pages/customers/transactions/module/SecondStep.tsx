import Select, {
  components,
  ControlProps,
  DropdownIndicatorProps,
} from "react-select";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import { useShippingCost } from "hooks/react-query/useShippingCost";

import { setNextStep, setPrevStep } from "store/apps/StepperSlice";
import { useDispatch } from "store/Store";
import { getCustomStyle } from "utils/react-select";
import { GetShippingCostResponse } from "services/shippingCost";
import { IconBike, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import CustomSelect from "components/CustomSelect";
import useCart, { NewPayload } from "hooks/useCart";
import { useEffect, useState } from "react";
import CustomTextField from "components/OutlineInput";
import { ReactSelectValueProps } from "types";
import CustomFormLabel from "components/FormLabel";
import BannerTag from "components/BannerTag";
import { useGetCouponFirst } from "hooks/react-query/useCoupon";
import toast from "react-hot-toast";
import { GetCouponResponse, validateCoupon } from "services/coupon";
import useCookie from "hooks/useCookie";

type FormatSaveCoupon = {
  coupon: string;
  coupon_id: number;
};

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

const formSchema = object().shape({
  shippingCost: object().required("Kurir Pengiriman harus diisi"),
  transactionType: object().required("Metode Pembayaran harus diisi"),
  coupon: string()
    .nullable()
    .matches(/^[A-Z0-9]*$/, "Kupon hanya boleh berisi huruf kapital dan angka"),
});

const transactionTypeList = [
  { value: "manual", label: "Transfer Manual" },
  { value: "automatic", label: "Pembayaran Online" },
];

const SecondStep = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const dispatch = useDispatch();

  const { savePayload } = useCart();

  const [isProcessCoupon, setIsProcessCoupon] = useState<boolean>(false);
  const [saveValidateCouponId, setSaveValidateCouponId] =
    useState<FormatSaveCoupon | null>(null);

  const { data: shippingCostData, isLoading: isLoadingShippingCost } =
    useShippingCost();
  const { data: couponData, isLoading: isLoadingCoupon } = useGetCouponFirst();
  const { getFromLocalStorage } = useCookie();

  const secureValue = getFromLocalStorage(
    "transactions"
  ) as unknown as NewPayload;

  const couponItem = couponData?.data;

  const { control, watch, setValue } = useForm({
    defaultValues: {
      shippingCost: "",
      transactionType: "",
      coupon: "",
    },
    resolver: yupResolver(formSchema),
  });

  const { shippingCost, transactionType, coupon: couponForm } = watch();

  const handleNextStep = (): void => {
    savePayload({
      shippingCost: shippingCost as unknown as GetShippingCostResponse,
      transaction_type: (transactionType as unknown as ReactSelectValueProps)
        ?.value,
      coupon: (couponItem?.code === saveValidateCouponId?.coupon
        ? couponItem
        : null) as unknown as GetCouponResponse | null,
    });

    dispatch(setNextStep());
  };

  const handlePrevStep = (): void => {
    dispatch(setPrevStep());
  };

  const handleValidateCoupon = async (): Promise<void> => {
    const coupon = watch("coupon");
    if (!coupon) return;

    if (saveValidateCouponId?.coupon === coupon) {
      toast.error("Kode kupon sudah diterapkan");

      return;
    }

    try {
      setIsProcessCoupon(true);

      const result = await validateCoupon(coupon);

      if (result?.success && couponItem) {
        setSaveValidateCouponId({
          coupon: couponItem?.code,
          coupon_id: couponItem?.id,
        });

        toast.success("Kode kupon berhasil diterapkan");
      }

      setIsProcessCoupon(false);
    } catch (error) {
      console.error({ error });
      setIsProcessCoupon(false);
      toast.error("Kode kupon yang kamu masukkan tidak valid");
    }
  };

  useEffect(() => {
    if (secureValue) {
      setValue("shippingCost", secureValue.shippingCost as any);
      setValue(
        "transactionType",
        transactionTypeList?.find(
          (item) => item.value === secureValue.transaction_type
        ) as any
      );
      setValue("coupon", secureValue.coupon?.code ?? "");
    }
  }, []);

  return (
    <Box component="section">
      <Box
        display="flex"
        maxWidth={mdUp ? "60%" : "100%"}
        paddingTop="20px"
        marginInline="auto"
        flexDirection="column"
        sx={{ minHeight: "65vh", height: "100%", maxHeight: "65vh" }}
      >
        {!isLoadingCoupon && <BannerTag data={couponItem} type="landing" />}

        <Box>
          <Controller
            name="transactionType"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="transactionType">
                    Metode Pembayaran
                  </CustomFormLabel>

                  <Select<ReactSelectValueProps>
                    {...(field as any)}
                    inputId="transactionType"
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

          <Controller
            name="shippingCost"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="transactionType">
                    Kurir Pengiriman
                  </CustomFormLabel>

                  <Select<GetShippingCostResponse>
                    {...(field as any)}
                    inputId="country"
                    classNamePrefix="select"
                    components={{
                      Control,
                      DropdownIndicator,
                      Option: CustomSelect,
                    }}
                    getOptionLabel={(option) => option.name?.toUpperCase()}
                    getOptionValue={(option) => option.id}
                    options={shippingCostData?.data || []}
                    isLoading={isLoadingShippingCost}
                    isDisabled={isLoadingShippingCost}
                    placeholder="Pilih Kurir Pengiriman"
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
            name="coupon"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box
                  className="form-control"
                  sx={{
                    marginTop: "2.5rem",
                  }}
                >
                  <CustomFormLabel htmlFor="transactionType">
                    Kode Kupon (Opsional)
                  </CustomFormLabel>

                  <CustomTextField
                    {...field}
                    fullWidth
                    type="email"
                    id="email"
                    error={!!error}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.toUpperCase();
                      const regex = /^[A-Z0-9]*$/;

                      if (regex.test(value)) {
                        field.onChange(value);
                      }
                    }}
                    endAdornment={
                      <Button
                        type="button"
                        variant="text"
                        sx={{ fontSize: "14px", fontWeight: 600 }}
                        onClick={() => {
                          handleValidateCoupon();
                        }}
                        disabled={isProcessCoupon || !couponForm}
                      >
                        Gunakan
                      </Button>
                    }
                    sx={{ fontWeight: 600, marginBottom: "4px" }}
                    disabled={isProcessCoupon}
                    placeholder="Contoh: KUPONAKIK"
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
      </Box>

      <Box sx={{ margin: "0 auto", width: mdUp ? "50%" : "100%" }}>
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          sx={{ fontWeight: 600, fontSize: "16px", marginBottom: "10px" }}
          onClick={handleNextStep}
          disabled={shippingCost === "" || transactionType === ""}
        >
          Berikutnya
        </Button>
        <Button
          fullWidth
          size="large"
          type="button"
          variant="text"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
          }}
          color="inherit"
          onClick={() => handlePrevStep()}
        >
          Kembali
        </Button>
      </Box>
    </Box>
  );
};

export default SecondStep;
