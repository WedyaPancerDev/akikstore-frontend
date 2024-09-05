import {
  Box,
  Avatar,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";

import { type AppState, useSelector } from "store/Store";

export const Profile = (): JSX.Element => {
  const { profile } = useSelector((state: AppState) => state.dashboard);
  const customizer = useSelector((state: AppState) => state.customizer);

  const currentUser = ["admin", "employee"].includes(profile?.role ?? "")
    ? profile?.employees
    : profile?.customers;

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Default Avatar"
            src={
              currentUser?.avatar || "/assets/images/avatar/default-avatar.svg"
            }
          />

          <Box component="div" className="profile-container">
            {!profile ? (
              <>
                <Skeleton sx={{ height: "30px", width: "100px" }} />
                <Skeleton sx={{ height: "20px", width: "50px" }} />
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    width: "80px",
                    marginY: "2px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentUser?.fullname ?? "No Name"}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ textTransform: "uppercase" }}
                >
                  {profile?.role ?? "💀"}
                </Typography>
              </>
            )}
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
