import { Grid, Box, Typography } from "@mui/material";

import PageContainer from "components/Container/PageContainer";
import Logo from "components/Logo";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const AuthLayout = ({
  title,
  description,
  children,
}: AuthLayoutProps): JSX.Element => {
  return (
    <PageContainer title={`${title} - AKIKSTORE`} description={description}>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Box position="relative">
            <Box px={3} marginTop="14px">
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={"calc(100vh - 75px)"}
              flexDirection="column"
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <img
                src={"/assets/images/backgrounds/welcome-auth.svg"}
                alt="bg"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                }}
                loading="lazy"
              />

              <Box sx={{ maxWidth: "450px", margin: "0 auto" }}>
                <Typography
                  variant="h2"
                  textAlign="center"
                  color="textPrimary"
                  sx={{ marginTop: 5 }}
                >
                  Jual Beli Batu Akik dan Pusaka Terpercaya
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={2} width="75%" marginInline="auto">
            {children}
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AuthLayout;
