import { ThemeOptions, createTheme } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#0484f3",
    },
    secondary: {
      main: "#f88a26",
      light: "#ffa500",
    },
    background: {
      default: "#fbfafd",
    },
    text: {
      primary: "#272838",
      secondary: "#393e41",
    },
  },
};

export const theme = createTheme(themeOptions);
