import React from "react";
import ReactDOM from "react-dom/client";
import PublicRoutes from "routes/PublicRoutes";

import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PublicRoutes />
  </React.StrictMode>
);
