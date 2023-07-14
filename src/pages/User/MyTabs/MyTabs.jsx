import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { endpoint } from "utils/urlApi";

export default function MyTabs() {
  //Cookie
  const jwtToken = Cookies.get("jwtToken");

  const getTabs = () => {
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${jwtToken}`;
      return config;
    });
    axios
      .get(endpoint.getUserTab)
      .then((response) => {
        console.info("Se hace el get a firestore");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <h1 className="">User Tabs</h1>
      <input
        type="button"
        className="bg-orange-400 px2 py4"
        value="Get Tabs"
        onClick={getTabs}
      />
    </main>
  );
}
