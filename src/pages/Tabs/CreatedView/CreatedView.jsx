import React, { useState } from "react";
import { useLocation } from "react-router-dom";

//components
import AsideBtns from "component/AsideBtns";

export default function CreatedView() {
  //states
  const [tabView, setTabView] = useState(0);

  const location = useLocation();
  const { newGuitarTab, bassArticle, bandName, songName } = location.state;

  //scripts
  const handleBassTabView = () => {
    setTabView(1);
    console.log(bassArticle.div.etiquetasP.contenido);
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
        {tabView === 1 ? (
          <article className={bassArticle.className}>
            {bassArticle.div.id.map((id) => (
              <div key={id} id={id} className={bassArticle.div.className}>
                <p>{bassArticle.div.etiquetasP.contenido}</p>
              </div>
            ))}
          </article>
        ) : null}
        {tabView === 2 ? (
          <div dangerouslySetInnerHTML={{ __html: newGuitarTab }} />
        ) : null}
      </section>
    </main>
  );
}
