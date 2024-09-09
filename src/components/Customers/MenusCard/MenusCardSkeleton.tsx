import {
  Skeleton,
  Typography,
  Stack,
  Tooltip,
  CardContent,
} from "@mui/material";

import BlankCard from "components/BlankCard";

const MenusCardSkeleton = () => {
  return (
    <BlankCard sx={{ userSelect: "none", position: "relative" }}>
      <Typography sx={{ overflow: "hidden" }}>
        <Skeleton variant="rectangular" width="100%" height="18.5rem" />
      </Typography>

      <Tooltip title="Tambah Ke Keranjang">
        <Skeleton
          variant="circular"
          width="50px"
          height="50px"
          sx={{ bottom: "75px", right: "15px", position: "absolute" }}
        />
      </Tooltip>

      <CardContent sx={{ p: 3, pt: 2, userSelect: "none" }}>
        <Skeleton variant="text" width="60%" height={24} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="30%" height={20} />
        </Stack>
      </CardContent>
    </BlankCard>
  );
};

export default MenusCardSkeleton;
