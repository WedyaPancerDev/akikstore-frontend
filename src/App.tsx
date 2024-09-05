import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { ThemeSettings } from "theme/Theme";

import routers from "routes/Routes";

function App() {
  const theme = ThemeSettings();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routers} />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 6000,
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
