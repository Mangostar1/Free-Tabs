import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { endpoint } from "utils/urlApi";
import CommonBtn from "component/CommonBtn";

import Loader from "component/Loader";

export default function MyTabs() {
  const [isLoaded, setIsloaded] = useState(false);
  const [bandName, setBandName] = useState('');
  const [songName, setSongName] = useState('');

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
        setBandName(response.data.band);
        setSongName(response.data.song);

      } catch (err) {
        console.error(err);
      } finally {
        setIsloaded(true);
      }
    };

    fetchData();
  }, []);


  const showTab = () => {
    console.log('funcionando')
  }

  return (
    <main className="bg-slate-50 min-h-screen relative">
      <h1 className="">User Tabs</h1>
      {!isLoaded ? (
        <div className="absolute top-0 left-0 z-50 h-screen w-screen bg-black/50 flex justify-center items-center">
          <Loader />
        </div>
      ) : null}
      <CommonBtn handleBtn={showTab} classCss="bg-orange-200 px-4 py-2 ml-5 rounded hover:bg-orange-100" name={`${bandName} - ${songName}`}/>
    </main>
  );
}
