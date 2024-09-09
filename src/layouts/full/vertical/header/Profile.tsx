import { useState } from "react";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
  Skeleton,
} from "@mui/material";
import { IconMail } from "@tabler/icons-react";
import { useSelector } from "react-redux";

import { AppState } from "store/Store";
import useLogout from "hooks/useLogout";

const Profile = (): JSX.Element => {
  const { profile } = useSelector((state: AppState) => state.dashboard);
  const { handleLogout, isLoadingLogout } = useLogout();

  const currentUser = ["admin", "employee"].includes(profile?.role ?? "")
    ? profile?.employees
    : profile?.customers;

  const [anchorEl2, setAnchorEl2] = useState<any | null>(null);
  const handleClick2 = (event: React.SyntheticEvent<EventTarget>): void => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = (): void => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={
            currentUser?.avatar || "/assets/images/avatar/default-avatar.svg"
          }
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={
              currentUser?.avatar || "/assets/images/avatar/default-avatar.svg"
            }
            alt="Default Avatar"
            sx={{ width: 65, height: 65 }}
          />

          <Box component="div" className="profile-container">
            {!profile ? (
              <>
                <Skeleton sx={{ height: "30px", width: "120px" }} />
                <Skeleton sx={{ height: "25px", width: "80px" }} />
              </>
            ) : (
              <>
                <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  fontWeight={600}
                  sx={{
                    width: "120px",
                    marginY: "4px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {currentUser?.fullname ?? "No Name"}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  textTransform="uppercase"
                >
                  {profile?.role ?? "💀"}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "150px",
                    marginTop: "8px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontWeight: 500,
                  }}
                  gap={1}
                >
                  <IconMail width={15} height={15} style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {profile?.email ?? "Tidak ada email"}
                  </span>
                </Typography>
              </>
            )}
          </Box>
        </Stack>
        <Divider />
        <Box mt={2}>
          <Button
            fullWidth
            type="button"
            color="primary"
            variant="outlined"
            disabled={isLoadingLogout}
            onClick={() => {
              handleLogout();
            }}
          >
            {isLoadingLogout ? "Sedang Diproses..." : "Logout"}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
