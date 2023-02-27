import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from 'store/store'
import { Provider } from 'react-redux'

import './index.css';

import PublicRoutes from "routes/PublicRoutes";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PublicRoutes />
    </Provider>
  </React.StrictMode>
);