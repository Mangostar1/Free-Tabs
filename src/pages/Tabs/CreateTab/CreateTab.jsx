import React, { useState } from "react";

//Components
import { BassTabForm } from "pages/Tabs/CreateTab/BassTabForm";
import { GuitarTabForm } from "pages/Tabs/CreateTab/GuitarTabForm";
import Footer from "component/Footer";

//Material UI
import Button from '@mui/material/Button';

//Styles
import "styles/tabs/chooseIns.css"; //<-- For <from> line 30

//utils
import { getObjInSessionStoraje } from "utils/objToStr";

function GlossaryBass() {
  return(
    <div className="">
      <h2 className="font-bold">Glossary:</h2>
      <ul className="ml-6">
        <li className="list-disc">x Dead note</li>
        <li className="list-disc">h Hammer-on</li>
        <li className="list-disc">p Pull-off</li>
        <li className="list-disc">/ Slide up</li>
      </ul>
    </div>
  )
}

function GlossaryGuitar() {
  return(
    <div className="">
      <h2 className="font-bold">Glossary:</h2>
      <ul className="ml-6">
        <li className="list-disc">x Dead note</li>
        <li className="list-disc">h Hammer-on</li>
        <li className="list-disc">p Pull-off</li>
        <li className="list-disc">b Bend</li>
        <li className="list-disc">/ Slide up</li>
        <li className="list-disc">~ Vibrato</li>
      </ul>
    </div>
  )
}

export default function CreateTab() {
  const [view, setView] = useState(0);

  const viewBassTab = () => {
    //<-- show Bass Tab
    setView(0);
    document.querySelector(".tab-root").innerHTML = ""; //<-- Tab Root come from TabForm.js line 29
  };

  const viewGuitarTab = () => {
    //<-- show Guitar Tab
    setView(1);
    document.querySelector(".tab-root").innerHTML = ""; //<-- Tab Root come from TabForm.js line 29
  };

  const { bandName, songName } = getObjInSessionStoraje("bandInfo") || '';

  return (
    <>
      <main className="bg-slate-50 text-zinc-800 main grid grid-cols-4">
        <aside className="col-span-1 bg-slate-100">
          <article className="chooseIns">
            <input
              onChange={viewBassTab}
              type="radio"
              defaultValue="bass"
              name="instrument"
              className="choose-instrument"
              id="bass"
              defaultChecked
            />
            <label id="chooseBass" htmlFor="bass">
              Bass
            </label>

            <input
              onChange={viewGuitarTab}
              type="radio"
              defaultValue="guitar"
              name="instrument"
              className="choose-instrument"
              id="guitar"
            />
            <label id="chooseGuitar" htmlFor="guitar">
              Guitar
            </label>
          </article>
          <article>
            <form className="flex justify-center">
              <input
                placeholder="Band Name"
                id="bandName"
                className="w-48 h-8 border-solid border-x border-y border-black"
                type="text"
                defaultValue={bandName}
              />
              <p className="font-bold text-2xl px-2">-</p>
              <input
                placeholder="Song Name"
                id="songName"
                className="w-48 h-8 border-solid border-x border-y border-black"
                type="text"
                defaultValue={songName}
              />
            </form>
          </article>

          <article className="m-5">
            {view === 0 ? <GlossaryBass /> : <GlossaryGuitar />}
          </article>
        </aside>

        <section className="col-span-3">
          {view === 0 ? <BassTabForm /> : <GuitarTabForm />}
        </section>
      </main>
      <Footer />
    </>
  );
}
