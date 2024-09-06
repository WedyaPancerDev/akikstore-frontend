import { useMediaQuery, Box, Drawer, useTheme, Theme } from "@mui/material";
import SidebarItems from "./SidebarItems";
// import Logo from "components/Logo";
import { useSelector, useDispatch, type AppState } from "store/Store";
import {
  hoverSidebar,
  setToggleMobileSidebar,
} from "store/customizer/CustomizerSlice";
import Scrollbar from "components/Scrollbar";
import { Profile } from "./SidebarProfile/Profile";
import Logo from "components/Logo";

const Sidebar = (): JSX.Element => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const customizer = useSelector((state: AppState) => state.customizer);

  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const onHoverEnter = (): void => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true));
    }
  };

  const onHoverLeave = (): void => {
    dispatch(hoverSidebar(false));
  };

  if (lgUp) {
    return (
      <Box
        component="aside"
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: "absolute",
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
              px={3}
              marginTop={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Logo />
            </Box>
            <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Scrollbar>
            <Profile />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      // component="aside"
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() =>
        dispatch(setToggleMobileSidebar(!customizer.isMobileSidebar))
      }
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,

          // backgroundColor:
          //   customizer.activeMode === 'dark'
          //     ? customizer.darkBackground900
          //     : customizer.activeSidebarBg,
          // color: customizer.activeSidebarBg === '#ffffff' ? '' : 'white',
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box p={2}>
        <img
          src={"/assets/images/backgrounds/pekka.png"}
          alt="bg"
          style={{
            width: "100%",
            maxWidth: "70px",
            objectFit: "cover",
          }}
          loading="lazy"
        />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
