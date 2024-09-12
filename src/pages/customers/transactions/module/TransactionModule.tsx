import { Box, Theme, useMediaQuery } from "@mui/material";

import StepperComponents from "components/HorizontalStepper";
import { AppState, useSelector } from "store/Store";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

const moduleList: Record<number, JSX.Element> = {
  0: <FirstStep />,
  1: <SecondStep />,
  2: <ThirdStep />,
};

const TransactionModule = (): JSX.Element => {
  const { stepperActive } = useSelector((state: AppState) => state.stepper);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <Box
      component="div"
      position="relative"
      sx={{
        minHeight: "75vh",
        padding: "10px 16px",
        marginX: mdUp ? 0 : "1rem",
      }}
    >
      <StepperComponents activeStep={stepperActive} />
      {moduleList[stepperActive]}
    </Box>
  );
};

export default TransactionModule;
