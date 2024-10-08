import { useLocation } from "react-router-dom";
import type { ValidateProps } from "types";
import { Box, List, type Theme, useMediaQuery } from "@mui/material";

import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup/NavGroup";
import { AdminMenuItems, CustomerMenuItems } from "./MenuItems";
import { useDispatch, useSelector, type AppState } from "store/Store";
import { setToggleMobileSidebar } from "store/customizer/CustomizerSlice";
import useCookie from "hooks/useCookie";

const SidebarItems = (): JSX.Element => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));

  const { getFromLocalStorage } = useCookie();

  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const dispatch = useDispatch();

  const secureValue = getFromLocalStorage("validate");
  const currentRole = (secureValue as unknown as ValidateProps)?.role;

  return (
    <Box sx={{ px: 2.5 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {(["admin", "employee"].includes(currentRole)
          ? AdminMenuItems
          : CustomerMenuItems
        )?.map((item) => {
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() =>
                  dispatch(setToggleMobileSidebar(!customizer.isMobileSidebar))
                }
              />
            );
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() =>
                  dispatch(setToggleMobileSidebar(!customizer.isMobileSidebar))
                }
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
