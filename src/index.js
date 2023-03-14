import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import PublicRoutes from "routes/PublicRoutes";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PublicRoutes />
  </React.StrictMode>
);