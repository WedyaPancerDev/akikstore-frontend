import { createTheme } from "@mui/material/styles";
import { useSelector, type AppState } from "../store/Store";
import { useEffect } from "react";
import components from "./Components";
import typography from "./Typography";
import { shadows, darkshadows } from "./Shadows";
import { baselightTheme } from "./DefaultColors";

export const BuildTheme = (config: any = {}): any => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const defaultShadow =
    customizer.activeMode === "dark" ? darkshadows : shadows;
  const baseMode = {
    palette: {
      mode: customizer.activeMode,
    },
    shape: {
      borderRadius: customizer.borderRadius,
    },
    shadows: defaultShadow,
    typography,
  };

  const theme = createTheme({
    ...baseMode,
    ...baselightTheme,
    direction: config.direction,
  });

  theme.components = components(theme);

  return theme;
};

const ThemeSettings = (): any => {
  const activDir = useSelector((state: AppState) => state.customizer.activeDir);
  const activeTheme = useSelector(
    (state: AppState) => state.customizer.activeTheme
  );
  const theme = BuildTheme({
    direction: activDir,
    theme: activeTheme,
  });
  useEffect(() => {
    document.dir = activDir;
  }, [activDir]);

  return theme;
};

export { ThemeSettings };
