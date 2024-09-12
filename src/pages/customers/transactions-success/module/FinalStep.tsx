import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { decryptText } from "utils/helpers";

const FinalStep = () => {
  const { transactionId = "" } = useParams();
  const navigate = useNavigate();

  const decryptTransactionId = decryptText(transactionId);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "65vh", height: "100%", maxHeight: "65vh" }}
    >
      <Box p={3} my={3} textAlign="center">
        <Typography variant="h3">Terima kasih sudah berbelanja 🎉</Typography>
        <Typography variant="h5" mt={1} mb={4} color="primary">
          Nomor Invoice kamu: {decryptTransactionId ?? ""}
        </Typography>

        <Typography variant="body1" maxWidth="60%" marginInline="auto">
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
    </Box>
  );
};

export default FinalStep;
