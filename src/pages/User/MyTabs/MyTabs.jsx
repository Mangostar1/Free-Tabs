import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { endpoint } from "utils/urlApi";
import CommonBtn from "component/CommonBtn";

import Loader from "component/Loader";

export default function MyTabs() {
  const [isLoaded, setIsloaded] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [tabOnScreen, setTabOnScreen] = useState(false);
  const [userTab, setUserTab] = useState({
    bandName: undefined,
    songName: undefined,
    bassArticle: undefined,
    guitarArticle: undefined,
  });

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
        
        setResponseData([...response.data]);
        console.log(responseData);

      } catch (err) {
        console.error(err);
      } finally {
        setIsloaded(true);
      }
    };

    fetchData();
  }, []);


  const showTab = (num) => {

    if (tabOnScreen) {//<-- Si esta impresa en pantalla, lo oculta
      setTabOnScreen(false);
    }

    if (!tabOnScreen) {//<-- Si no esta impresa en pantalla, lo muestra
      setTabOnScreen(true);
      setUserTab({
        bandName: responseData[num].band_name,
        songName: responseData[num].song_name,
        bassArticle: responseData[num].bass_tab_data,
        guitarArticle: responseData[num].guitar_tab_data,
      });
    }
  }

  return (
    <main className="bg-slate-50 min-h-screen relative grid grid-cols-4">
      
      {!isLoaded ? (//<-- Loader, tras cargar muestra el contenido de la vista
        <div className="absolute top-0 left-0 z-50 h-screen w-screen bg-black/50 flex justify-center items-center">
          <Loader />
        </div>
      ) : <aside className="mt-5 ml-4 mlr-4 mb-4 col-span-1 flex flex-col">
        {responseData.map((data, index) => (
          <CommonBtn
            key={index}
            handleBtn={() => showTab(index)}
            classCss="bg-orange-200 px-4 py-2 m-2 rounded hover:bg-orange-100"
            name={`${data.band_name} - ${data.song_name}`}
          />
        
        ))}
      </aside>}

      {
        tabOnScreen === true ?

          <section className="p-5">
            <h2 className="font-bold text-center">{userTab.bandName + ' - ' + userTab.songName}</h2>
            {userTab.bassArticle !== null ? <article className="tab-root box-border border-solid border-x border-y border-slate-300 bg-slate-100 w-172 m-auto p-4 mt-5">
              {userTab.bassArticle.div.id.map((item, index) => (
                  <div key={index} className={userTab.bassArticle.div.className}>
                    {userTab.bassArticle.div.ptag.content
                      .slice(index * 4, index * 4 + 4)
                      .map((element, innerIndex) => (
                        <p
                          key={innerIndex}
                          className={userTab.bassArticle.div.ptag.className}
                        >
                          {element}
                        </p>
                      ))}
                  </div>
                ))}
            </article> : null}

            {userTab.guitarArticle !== null ? <article className="tab-root box-border border-solid border-x border-y border-slate-300 bg-slate-100 w-172 m-auto p-4 mt-5">
              {userTab.guitarArticle.div.id.map((item, index) => (
                  <div key={index} className={userTab.guitarArticle.div.className}>
                    {userTab.guitarArticle.div.ptag.content
                      .slice(index * 6, index * 6 + 6)
                      .map((element, innerIndex) => (
                        <p
                          key={innerIndex}
                          className={userTab.guitarArticle.div.ptag.className}
                        >
                          {element}
                        </p>
                      ))}
                  </div>
                ))}
            </article> : null}
          </section> : null
      }
    </main>
  );
}
