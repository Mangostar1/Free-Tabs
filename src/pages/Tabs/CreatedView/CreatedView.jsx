import React, { useState } from "react";
import { useLocation } from "react-router-dom";

//components
import AsideBtns from "component/AsideBtns";

export default function CreatedView() {
  //states
  const [tabView, setTabView] = useState(0); //<-- To control which tab it's render on DOM

  const location = useLocation();
  const { guitarArticle, bassArticle, bandName, songName } = location.state; //<-- Info com from navigate on "BassTabFrom.js" and "GuitarTabFrom.js"

  //scripts
  const handleBassTabView = () => {
    setTabView(1);
  };

  const handleGuitarTabView = () => {
    setTabView(2);
  };

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
    </main>
  );
}
