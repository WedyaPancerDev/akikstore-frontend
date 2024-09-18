import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import { TextField, type TextFieldProps } from "@mui/material";

const InputTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return <TextField ref={ref} {...props} />;
  }
);

const StyledInputTextField = styled(InputTextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "0.8",
  },
  "& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder": {
    color: theme.palette.text.secondary,
    opacity: "1",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[200],
  },
  "& .MuiOutlinedInput-input": {
    fontWeight: 600,
  },
}));

InputTextField.displayName = "InputTextField";

export default StyledInputTextField;
