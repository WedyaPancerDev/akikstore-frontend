import { Fragment } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const FinalStep = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box
        p={3}
        my={3}
        textAlign="center"
        sx={{ minHeight: "65vh", height: "100%", maxHeight: "65vh" }}
      >
        <Typography variant="h5">Terima kasih sudah berbelanja 🎉</Typography>
        <Typography variant="h6" mt={1} mb={4} color="primary">
          Nomor Invoice kamu: 3fa7-69e1-79b4-dbe0d35f5f5d
        </Typography>

        <Typography variant="body1" maxWidth="40%" marginInline="auto">
          Kamu bisa melihat status pesanan kamu di halaman{" "}
          <b style={{ textDecoration: "underline" }}>Riwayat Transaksi</b> di
          dashboard kamu.
        </Typography>
      </Box>

      <Box sx={{ margin: "0 auto", width: "50%" }}>
        <Button
          fullWidth
          size="large"
          type="button"
          variant="contained"
          sx={{ fontWeight: 600, fontSize: "16px", marginBottom: "10px" }}
          onClick={() =>
            navigate("/pelanggan/dashboard", {
              replace: true,
            })
          }
        >
          Lanjut Ke Dashboard Saya
        </Button>
      </Box>
    </Fragment>
  );
};

export default FinalStep;
