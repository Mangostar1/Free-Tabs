import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { endpoint } from "utils/urlApi";

//components
import AsideBtns from "component/AsideBtns";

//utils
import { getObjInSessionStoraje } from "utils/objToStr";

export default function CreatedView() {
  const location = useLocation();
  //states
  const [tabView, setTabView] = useState(0); //<-- To control which tab it's render on DOM
  const [userTab, setUserTab] = useState({
    userName: undefined,
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
      axios.defaults.withCredentials = true;
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${jwtToken}`;
        return config;
      });
      axios.post(endpoint.sendUserTab, userTab).then((response) => {
        console.info(response.data.message, response.data.id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUserTab({
      userName: localStorage.getItem("user_email"),
      bandName: bandName,
      songName: songName,
      bassArticle: bassArticle,
      guitarArticle: guitarArticle,
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/tab/created_view") {
      setUserTab((prevUserTab) => ({
        ...prevUserTab,
        bandName: bandName,
        songName: songName,
        bassArticle: bassArticle,
        guitarArticle: guitarArticle,
      }));
    }
  }, [location]);

  return (
    <main className="grid grid-cols-4 bg-slate-50">
      <aside className="col-span-1 flex flex-col">
        <h2 className="text-center">Instrument</h2>
        <AsideBtns instrument="Bass" onClick={handleBassTabView} />
        <AsideBtns instrument="Guitar" onClick={handleGuitarTabView} />
      </aside>
      <section id="Tab-Saved" className="bg-gray-100 col-start-2 col-end-5">
        <h1 className="font-bold text-center">{`${bandName} - ${songName}`}</h1>
        {tabView === 1 && bassArticle?.div?.id && (
          <article className={bassArticle.className}>
            {bassArticle.div.id.map((item, index) => (
              <div key={index} className={bassArticle.div.className}>
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
          <article className={guitarArticle.className}>
            {guitarArticle.div.id.map((item, index) => (
              <div key={index} className={guitarArticle.div.className}>
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
      <section>
        <input
          type="button"
          onClick={sendTab}
          className="transition bg-orange-300 mt-4 px-4 py-2 rounded-xl hover:bg-orange-200"
          name="submit-tab"
          value="Send Tab"
        />
      </section>
    </main>
  );
}
