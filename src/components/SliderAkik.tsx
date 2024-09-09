import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const akikCategories = [
  "Saphire",
  "Akik",
  "Obsidian",
  "Fosil",
  "Ruby",
  "Amethyst",
  "Topaz",
  "Aquamarine",
  "Agate",
];

const SliderAkiks = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: "relative",
        marginTop: "0.5rem",
        marginBottom: "2rem",
      }}
    >
      <Marquee pauseOnHover>
        {akikCategories.map((category, index) => (
          <Typography
            key={index}
            variant="h6"
            sx={{ marginRight: "3.5rem", py: "6px", userSelect: "none" }}
          >
            {category}
          </Typography>
        ))}
      </Marquee>
    </Box>
  );
};

export default SliderAkiks;
