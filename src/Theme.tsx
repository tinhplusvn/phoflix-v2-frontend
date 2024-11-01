import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

const Theme = ({ children }: { children: React.ReactNode }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Thiết lập chế độ dark
      primary: {
        main: "#90caf9", // Màu chính
      },
      secondary: {
        main: "#f48fb1", // Màu phụ
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
