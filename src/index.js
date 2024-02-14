import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PublicRoutes from "routes/PublicRoutes";

import "./styles/index.css";
import "./styles/main.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <PublicRoutes />
    </ThemeProvider>
  </React.StrictMode>
);
