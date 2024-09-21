import { Box, Theme, Typography, useMediaQuery } from "@mui/material";

import { useMemo } from "react";
import Select from "react-select";
import { IconSearch } from "@tabler/icons-react";
import { getCustomStyle } from "utils/react-select";
import { Controller, useForm } from "react-hook-form";

import CustomTextField from "components/OutlineInput";

import SliderAkik from "components/SliderAkik";
import { ReactSelectValueProps } from "types";
import { GetCategoryResponse } from "services/category";
import { useCategories } from "hooks/react-query/useCategory";
import { useProducts } from "hooks/react-query/useProduct";

import menus from "theme/slider.module.css";
import MenusCardProduct from "../MenusCard";
import MenusCardSkeleton from "../MenusCard/MenusCardSkeleton";
import useCart from "hooks/useCart";
import { PickProductState } from "store/apps/CartSlice";

const OldOrNew = [
  {
    label: "Terbaru",
    value: "new",
  },
  {
    label: "Terlama",
    value: "old",
  },
];

const Menus = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();
  const { data: productData, isLoading: isLoadingProduct } = useProducts();

  const { handleIncreaseCart } = useCart();

  const { watch, control } = useForm({
    defaultValues: {
      search: "",
      category: "",
      newOrOld: "",
    },
  });

  const { search } = watch();

  const handleSelectedProduct = (data: PickProductState): void => {
    handleIncreaseCart(data);
  };

  const filteredData = useMemo(() => {
    const searchValue = search?.toLowerCase();

    return productData?.data.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchValue) ||
        product.price_sell.toString().includes(searchValue) ||
        product.stock.toString().includes(searchValue)
      );
    });
  }, [productData?.data, search]);

  return (
    <>
      <SliderAkik />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: mdUp ? "repeat(2, 1fr)" : "1fr",
          gap: "1rem",
          marginBottom: "0.875rem",
          mx: mdUp ? "0" : "1rem",
        }}
      >
        {/* FILTER */}
        <Box
          sx={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "1fr 2fr",
          }}
        >
          <Controller
            name="newOrOld"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Select<ReactSelectValueProps>
                  {...(field as any)}
                  inputId="newOrOld"
                  classNamePrefix="select"
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  options={OldOrNew}
                  placeholder="Sortir"
                  styles={getCustomStyle(error)}
                />
              );
            }}
          />

          <Controller
            name="category"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Select<GetCategoryResponse>
                  {...(field as any)}
                  inputId="search"
                  classNamePrefix="select"
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  options={categoriesData?.data || []}
                  isLoading={isLoadingCategories}
                  isDisabled={isLoadingCategories}
                  placeholder="Jenis Barang"
                  styles={getCustomStyle(error)}
                />
              );
            }}
          />
        </Box>

        {/* SEARCH */}
        <Controller
          name="search"
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Box className="form-control">
                <CustomTextField
                  {...field}
                  fullWidth
                  type="text"
                  error={!!error}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    field.onChange(value.toLowerCase());
                  }}
                  startAdornment={<IconSearch color="#888E99" />}
                  sx={{
                    fontWeight: 600,
                    marginBottom: "4px",
                    px: "10px",
                    userSelect: "none",
                  }}
                  placeholder="CARI AKIK FAVORIT KAMU ..."
                />
              </Box>
            );
          }}
        />
      </Box>

      <Box
        component="div"
        sx={{
          px: "0.25rem",
          height: "100%",
          minHeight: "70vh",
          paddingY: "1rem",
          paddingX: mdUp ? 0 : "1rem",
          paddingRight: "1rem",
          overflowY: (filteredData ?? [])?.length > 3 ? "scroll" : "hidden",
        }}
        className={(filteredData ?? [])?.length > 3 ? menus.Slider : ""}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: mdUp
              ? "repeat(3, 1fr)"
              : smUp
              ? "repeat(2, 1fr)"
              : "1fr",
            gap: "1rem",
          }}
        >
          {isLoadingProduct ? (
            Array(3)
              .fill(3)
              .map((_, index) => {
                return <MenusCardSkeleton key={index} />;
              })
          ) : filteredData ? (
            filteredData?.map((product, index) => {
              return (
                <MenusCardProduct
                  key={index}
                  data={product}
                  handleSelectedProduct={handleSelectedProduct}
                />
              );
            })
          ) : (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", marginTop: "1rem" }}
            >
              Oops, data tidak ditemukan
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Menus;
