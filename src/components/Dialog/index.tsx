import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
} from "@mui/material";

type FormDialogProps = {
  title: string;
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
  bottomAction?: React.ReactNode;
  maxWidth?: DialogProps["maxWidth"];
};

const FormDialog = ({
  title,
  open,
  handleClose,
  children,
  bottomAction,
  maxWidth = "md",
}: FormDialogProps) => {
  return (
    <>
      <Dialog
        fullWidth
        open={open}
        sx={{ width: "100%" }}
        maxWidth={maxWidth}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{bottomAction}</DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
