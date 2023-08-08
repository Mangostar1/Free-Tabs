import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { endpoint } from "utils/urlApi";

import Loader from "component/Loader";

export default function MyTabs() {
  const [isLoaded, setIsloaded] = useState(false);

  //Cookie
  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        axios.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${jwtToken}`;
          return config;
        });

        const response = await axios.get(endpoint.getUserTab);
        console.log(response.data); // recibe un array de objetos
      } catch (error) {
        console.error(error);
      } finally {
        setIsloaded(true);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-slate-50 min-h-screen relative">
      <h1 className="">User Tabs</h1>
      {/* Puedes mostrar un Loader mientras se carga la data */}
      {!isLoaded ? (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen bg-black/50 flex justify-center items-center">
          <Loader />
        </div>
      ) : null}
    </main>
  );
}
