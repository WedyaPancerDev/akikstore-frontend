import { useLocation } from "react-router-dom";
import { Box, List, type Theme, useMediaQuery } from "@mui/material";

import Menudata from "../Menudata";
import NavItem from "../NavItem/NavItem";
import NavCollapse from "../NavCollapse/NavCollapse";
import { useSelector, type AppState } from "store/Store";

const NavListing = (): JSX.Element => {
  const { pathname } = useLocation();

  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  return (
    <Box>
      <List sx={{ p: 0, display: "flex", gap: "3px", zIndex: "100" }}>
        {Menudata.map((item) => {
          if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default NavListing;
