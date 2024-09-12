import Step from "@mui/material/Step";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import { type Theme, styled } from "@mui/material/styles";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import type { StepIconProps } from "@mui/material/StepIcon";

import { IconCheck } from "@tabler/icons-react";
import { useMediaQuery } from "@mui/material";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#5D87FF",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#5D87FF",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorLabel = styled(StepLabel)(() => {
  return {
    "& .MuiStepLabel-label": {
      fontSize: "14px",
      fontWeight: 600,
      color: "#ccc",

      "&.Mui-active": {
        color: "#5D87FF",
        fontWeight: 700,
      },

      "&.Mui-completed": {
        color: "#5D87FF",
        fontWeight: 700,
      },
    },
  };
});

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: 700,
  ...(ownerState.active && {
    backgroundColor: "#5D87FF",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#5D87FF",
  }),
}));

const ColorlibStepIcon = (props: StepIconProps): JSX.Element => {
  const { active, completed, className } = props;

  const numberStepper: Record<number, number> = {
    1: 1,
    2: 2,
    3: 3,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <IconCheck /> : numberStepper[props.icon as number]}
    </ColorlibStepIconRoot>
  );
};

const steps = ["Rincian Pesanan", "Metode Pengiriman", "Pembayaran"];

interface IStepperComponentsProps {
  activeStep: number;
}

const StepperComponents = ({
  activeStep = 0,
}: IStepperComponentsProps): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <ColorLabel StepIconComponent={ColorlibStepIcon}>
              {mdUp ? label : ""}
            </ColorLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default StepperComponents;
