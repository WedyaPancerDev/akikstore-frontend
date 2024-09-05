import { Outlet, useNavigation } from "react-router-dom";
import { styled, useTheme, Box } from "@mui/material";

import { useSelector, type AppState } from "store/Store";
import Header from "./vertical/header/Header";
import Sidebar from "./vertical/sidebar/Sidebar";
import Navigation from "../full/horizontal/navbar/Navigation";
import HorizontalHeader from "../full/horizontal/header/Header";
import PageLoader from "components/PageLoader";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

const FullLayout: React.FC = (): JSX.Element => {
  const navigation = useNavigation();

  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();

  return (
    <MainWrapper>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? "" : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* PageContent */}
        {customizer.isHorizontal ? <Navigation /> : ""}
        <Box
          sx={{
            maxWidth: theme.breakpoints.up("lg") ? "1280px" : "100%",
            width: "100%",
            marginInline: "auto",
          }}
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box
            component="main"
            sx={{ padding: theme.breakpoints.up("lg") ? "0 20px" : "0 16px" }}
          >
            {navigation.state === "loading" && (
              <>
                <PageLoader />
              </>
            )}
            <Outlet />
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Box>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
