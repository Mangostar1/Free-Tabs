import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from 'sweetalert2';

//Material UI
import Button from '@mui/material/Button';

import { endpoint } from "utils/urlApi";

//Components
import Footer from "component/Footer";

//utils
import { getObjInSessionStoraje } from "utils/objToStr";

const isAuthenticated = Cookies.get("jwtToken");

export default function CreatedView() {
  const location = useLocation();
  //states
  const [tabView, setTabView] = useState(0); //<-- To control which tab it's render on DOM
  const [userTab, setUserTab] = useState({
    bandName: undefined,
    songName: undefined,
    bassArticle: undefined,
    guitarArticle: undefined,
  });

  //sessionStoraje tab info
  const { bandName, songName } = getObjInSessionStoraje("bandInfo") || {};

  const { bassArticle } = getObjInSessionStoraje("bassTab") || {};

  const { guitarArticle } = getObjInSessionStoraje("guitarTab") || {};

  //Cookie
  const jwtToken = Cookies.get("jwtToken");

  //scripts
  const handleBassTabView = () => {
    setTabView(1);
  };

  const handleGuitarTabView = () => {
    setTabView(2);
  };

  const sendTab = () => {
    try {

      if (isAuthenticated) {
        axios.defaults.withCredentials = true;
        axios.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${jwtToken}`;
          return config;
        });
        axios.post(endpoint.sendUserTab, userTab).then((response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Para guardar tu tablatura, es necesario iniciar sesión en tu cuenta.",
          footer: '<a href="/login">Sign in</a>'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUserTab({
      bandName: bandName,
      songName: songName,
      bassArticle: bassArticle,
      guitarArticle: guitarArticle,
    });
    console.log(userTab);
  }, []);

  useEffect(() => {
    if (location.pathname === "/tab/view") {
      setUserTab((prevUserTab) => ({
        ...prevUserTab,
        bandName: bandName,
        songName: songName,
        bassArticle: bassArticle,
        guitarArticle: guitarArticle,
      }));
    }
    console.log(userTab);
  }, [location]);

  return (
    <>
      <main className="grid grid-cols-4 bg-slate-50">
        <aside className="col-span-1 flex flex-col gap-4 m-5">
          <h2 className="text-center">Instrument</h2>
          <Button onClick={handleBassTabView} variant="contained">Bass</Button>
          <Button onClick={handleGuitarTabView} variant="contained">Guitar</Button>
        </aside>
        <section id="Tab-Saved" className="bg-gray-100 col-start-2 col-end-5">
          <h1 className="font-bold text-center">{`${bandName} - ${songName}`}</h1>
          {tabView === 1 && bassArticle?.div?.id && (
            <article className="tab-root box-border border-solid border-x border-y border-slate-300 bg-slate-100 w-172 m-auto p-4">
              {bassArticle.div.id.map((item, index) => (
                <div key={index} className="bass-tab">
                  {bassArticle.div.ptag.content
                    .slice(index * 4, index * 4 + 4)
                    .map((element, innerIndex) => (
                      <p
                        key={innerIndex}
                        className={bassArticle.div.ptag.className}
                      >
                        {element}
                      </p>
                    ))}
                </div>
              ))}
            </article>
          )}
          {tabView === 2 && guitarArticle?.div?.id && (
            <article className="tab-root box-border border-solid border-x border-y border-slate-300 bg-slate-100 w-172 m-auto p-4">
              {guitarArticle.div.id.map((item, index) => (
                <div key={index} className="guitar-tab">
                  {guitarArticle.div.ptag.content
                    .slice(index * 6, index * 6 + 6)
                    .map((element, innerIndex) => (
                      <p
                        key={innerIndex}
                        className={guitarArticle.div.ptag.className}
                      >
                        {element}
                      </p>
                    ))}
                </div>
              ))}
            </article>
          )}
        </section>
        <section className="m-5">
          <Button onClick={sendTab} variant="contained" className="mt-4">Enviar Tab</Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
