import { Box, styled, Typography } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { OptionProps } from "react-select";
import { type GetShippingCostResponse } from "services/shippingCost";
import { formatPrice } from "utils/helpers";

interface Props extends OptionProps<GetShippingCostResponse> {}

const CustomSelectShippingCost: FC<Props> = (props) => {
  const currentVal = props.getValue();
  const isSelected = currentVal[0]?.service === props.data?.service;

  const CustomBox = styled("div")({
    padding: "5px 12px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: 600,
    color: "#333",
    backgroundColor: isSelected ? "#f3f4f6" : "transparent",
    "&:hover": {
      backgroundColor: "#f3f4f6",
    },
  });

  return (
    <CustomBox
      ref={props.innerRef}
      {...props.innerProps}
      onClick={props.innerProps.onClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "15px", textTransform: "uppercase" }}
        >
          {props.data.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}
        >
          {formatPrice(props.data.cost)}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          marginTop: "5px",
          fontSize: "12px",
          fontWeight: 600,
          color: "#9ca3af",
        }}
        className={clsx(
          isSelected ? "text-white" : "text-main-grayscale-500",
          "text-xs font-vr-demi-bold"
        )}
      >
        Perusahaan:{" "}
        <b style={{ color: "#1f2937" }}>{props.data.code?.toUpperCase()}</b>
      </Typography>
    </CustomBox>
  );
};

export default CustomSelectShippingCost;
