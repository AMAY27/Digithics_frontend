import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
        theme="colored"
      />
    </Router>
  </ThemeProvider>
);
