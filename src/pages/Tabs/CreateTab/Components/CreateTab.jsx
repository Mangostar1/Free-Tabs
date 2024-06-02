import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Components
import { BassTabForm } from "pages/Tabs/CreateTab/BassTabForm";
import { GuitarTabForm } from "pages/Tabs/CreateTab/Components/GuitarTabForm";
import GlossaryBass from "pages/Tabs/CreateTab/Components/GlossaryBass";
import GlossaryGuitar from "pages/Tabs/CreateTab/Components/GlossaryGuitar";
import Footer from "component/Footer";


//Material UI
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

//Styles
import "styles/tabs/chooseIns.css"; //<-- For <from> line 30

//utils
import { getObjInSessionStoraje } from "utils/objToStr";

//Scripts
import { createBassTab, addBassNotes, scaleNotes as scaleNotesBass } from "../../scripts/createBassTab";
import { createGuitarTab, addGuitarNotes, scaleNotes as scaleNotesGuitar } from "../../scripts/createGuitarTab";

//Styles
import "styles/tabs/tabsContent.css";
import "styles/tabs/editTabStiles.css";

//Others
import data from "../../scripts/data";
import MAX_TAB from "utils/constants";
import { saveObjInSessionStoraje } from "utils/objToStr";

export default function CreateTab() {
  
  const [view, setView] = useState(0);

  const viewBassTab = () => {
    setView(0);
    setCount(0);
    setTabCreated(false);
  };

  const viewGuitarTab = () => {
    setView(1);
    setCount(0);
    setTabCreated(false);
  };

  const { bandName, songName } = getObjInSessionStoraje("bandInfo") || '';

    //States
    const [count, setCount] = useState(0); //<-- Used to set unique ID on new tabs create by createBassTab() and more things.

    const [valueEm, setValueEm] = useState(""); //<-- To control user input by expression regular | GUITAR ONLY.
    const [valueB, setValueB] = useState(""); //<-- To control user input by expression regular | GUITAR ONLY.
    const [valueG, setValueG] = useState(""); //<-- To control user input by expression regular.
    const [valueD, setValueD] = useState(""); //<-- To control user input by expression regular.
    const [valueA, setValueA] = useState(""); //<-- To control user input by expression regular.
    const [valueE, setValueE] = useState(""); //<-- To control user input by expression regular.
  
    const [tabCreated, setTabCreated] = useState(false);
    const [isSelected, setIsSelected] = useState(false); //<-- Used to entry on editing mode.
    const [editing, setEditing] = useState(false); //<-- Used to view on screen new buttons when the user select a tab to edit.
    const [originalContent, setOriginalContent] = useState(""); //<-- To save old content tab, useful when the user need go back the changes made on editing mode.
    const [editFirstClick, setEditFirstClick] = useState(false); //<-- To know if the user did the first click on editing mode. It's used the logic of function.
  
    const navigate = useNavigate();
  
    const handleChange = ({ target }, setValue) => {
      //<-- Regular expression to validate the form.
      const valid = /^[0-9xXbph~/—]*$/.test(target.value);
      if (valid) {
        setValue(target.value);
      }
    };

    const handleChangeEm = (e) => handleChange(e, setValueEm);//<-- GUITAR ONLY
    const handleChangeB = (e) => handleChange(e, setValueB);//<-- GUITAR ONLY
    const handleChangeG = (e) => handleChange(e, setValueG);
    const handleChangeD = (e) => handleChange(e, setValueD);
    const handleChangeA = (e) => handleChange(e, setValueA);
    const handleChangeE = (e) => handleChange(e, setValueE);
  
    const handleEditState = () => {
      //<-- To set in false the "editingState" after user change or not the tab selected to edit.
      setEditing(false);
      for (let i = 0; i < document.querySelectorAll(".selected").length; i++) {
        document.querySelectorAll(".selected")[i].classList.remove("editing");
      }
    };
  
    const sendNotesBass = () => {

      setTabCreated(true);
      //<-- Send notes on input text to the "tap-root" element.
      const strings = document.querySelectorAll(".strings"); //<-- This className come from <form id="create-bass-tab">, it's on return of this component.
      const $tabRoot = document.querySelector(".tab-root");
      let $bassTab = document.querySelector(".bass-tab"); //<-- create by createBassTab() in scripts/createBassTab.js
  
      if (isSelected === false) {
        try {
          if (count === 0) {
            //<-- create the first $tabRoot without duplicating them
            createBassTab($tabRoot, 1); //<-- create an article and insert it inside $tabRoot
            setCount(1);
          }
  
          if (count === 1) {
            addBassNotes($bassTab, strings, data[0].className); //<-- article inside of section ".tab-root", "strings", "second class" (important for create a second article and continue adding more notes on the tab)
          }
  
          data.forEach(({ className, nextClassName, countState, id }) => {
            if (
              document.querySelector(`.${className}`).textContent.length >=
              MAX_TAB
            ) {
              if (count === countState) {
                createBassTab($tabRoot, id);
                setCount(id);
              }
              addBassNotes(document.getElementById(id), strings, nextClassName);
            }
          });
        } catch (error) {} //<-- It's empty because don't need send the error on console.
      }
  
      if (isSelected === true) {
        for (let i = 0; i < 4; i++) {
          if (editFirstClick === false) {
            document.querySelector(".editing").children[i].innerText = `${
              scaleNotesBass[i]
            } ${strings[i].value === "" ? "—" : "—" + strings[i].value}`;
            setEditFirstClick(true);
          }
  
          if (editFirstClick === true) {
            if (
              document.querySelector(".editing").children[i].textContent.length >=
              MAX_TAB
            ) {
              break;
            } else {
              document.querySelector(".editing").children[i].innerText += `—${
                strings[i].value === "" ? "—" : strings[i].value
              }`;
            }
          }
        }
      }
  
      //To clear the inputs
      setValueG("");
      setValueD("");
      setValueA("");
      setValueE("");
    };
  
    const clean = () => {
      //<-- Clear input text from create bass tab.
      document.querySelector(".tab-root").innerHTML = "";
      setCount(0);
      setTabCreated(false);
    };
  
    const saveBassNotes = () => {
      //<-- Send the tab created to <CreatedView /> Component.
      const bandNameInput = document.getElementById("bandName");
      const songNameInput = document.getElementById("songName");
  
      //div IDs
      const divs = document.querySelectorAll(".bass-tab");
      const divsID = Array.from(divs).map((div) => div.id);
  
      //<p> className
      const pgElementClassName = document
        .querySelector(".bass-strings")
        .classList.item(0);
  
      //<p> unique className
      const pgElement = document.querySelectorAll(".bass-tab p");
      const pgUniqueClass = new Set();
      pgElement.forEach((etiqueta) => {
        const clase = etiqueta.classList.value.split(" ")[1];
        pgUniqueClass.add(clase);
      });
  
      //<p> content
      const pContent = document.querySelectorAll(".bass-tab p");//? toma todos los elementos <p> que esten dentro de .bass-tab y los enlista dentro de un array
      const valoresClase = Array.from(pContent).map(
        (etiqueta) => etiqueta.textContent
      );
  
      saveObjInSessionStoraje("bandInfo", {
        bandName: bandNameInput.value, //string
        songName: songNameInput.value, //string
      });
  
      saveObjInSessionStoraje("bassTab", {
        bassArticle: {
          div: {
            id: divsID, //array
            ptag: {
              className: pgElementClassName, //string
              uniqueClassName: pgUniqueClass, //Set
              content: valoresClase, //array
            },
          },
        },
      });
  
      navigate("/tab/view");
      sessionStorage.setItem("tab", "created");
      window.location.reload();
    };
  
    const editBass = () => {
      //<-- Used to enter in edit mode.
      let bassTab = document.querySelectorAll(".bass-tab");
  
      if (isSelected === false) {
        setIsSelected(true);
  
        for (let i = 0; i < bassTab.length; i++) {
          bassTab[i].classList.add("selected");
        }
      }
  
      if (isSelected === true) {
        setIsSelected(false);
  
        for (let i = 0; i < bassTab.length; i++) {
          bassTab[i].classList.remove("selected");
        }
      }
    };

    const sendNotesGuitar = () => {

      setTabCreated(true);
      //<-- Send notes on input text to the "tap-root" element.
      const strings = document.querySelectorAll(".strings");
      const $tabRoot = document.querySelector(".tab-root");
      let $guitarTab = document.querySelector(".guitar-tab"); //<-- create by createBassTab() in scripts/createBassTab.js
  
      if (isSelected === false) {
        try {
          if (count === 0) {
            //<-- create the first $tabRoot without duplicating them
            createGuitarTab($tabRoot, 1); //<-- create an article and insert it inside $tabRoot
            setCount(1);
          }
  
          if (count === 1) {
            addGuitarNotes($guitarTab, strings, data[0].className); //<-- article inside of section ".tab-root", "strings", "second class" (important for create a second article and continue adding more notes on the tab)
          }
  
          data.forEach(({ className, nextClassName, countState, id }) => {
            if (
              document.querySelector(`.${className}`).textContent.length >=
              MAX_TAB
            ) {
              if (count === countState) {
                createGuitarTab($tabRoot, id);
                setCount(id);
              }
              addGuitarNotes(document.getElementById(id), strings, nextClassName);
            }
          });
        } catch (error) {} //<-- It's empty because don't need send the error on console.
      }
  
      if (isSelected === true) {
        for (let i = 0; i < 6; i++) {
          if (editFirstClick === false) {
            document.querySelector(".editing").children[i].innerText = `${
              scaleNotesGuitar[i]
            } ${strings[i].value === "" ? "—" : "—" + strings[i].value}`;
            setEditFirstClick(true);
          }
  
          if (editFirstClick === true) {
            if (
              document.querySelector(".editing").children[i].textContent.length >=
              MAX_TAB
            ) {
              break;
            } else {
              document.querySelector(".editing").children[i].innerText += `—${
                strings[i].value === "" ? "—" : strings[i].value
              }`;
            }
          }
        }
      }
  
      //To clear the inputs.
      setValueEm("");
      setValueB("");
      setValueG("");
      setValueD("");
      setValueA("");
      setValueE("");
    };

    const saveGuitarNotes = () => {
      //<-- Send the tab created to <CreatedView /> Component.
      const bandNameInput = document.getElementById("bandName");
      const songNameInput = document.getElementById("songName");
  
      //div IDs
      const divs = document.querySelectorAll(".guitar-tab");
      const divsID = Array.from(divs).map((div) => div.id);
  
      //<p> className
      const pgElementClassName = document
        .querySelector(".guitar-strings")
        .classList.item(0);
  
      //<p> unique className
      const pgElement = document.querySelectorAll(".guitar-tab p");
      const pgUniqueClass = new Set();
      pgElement.forEach((etiqueta) => {
        const clase = etiqueta.classList.value.split(" ")[1];
        pgUniqueClass.add(clase);
      });
  
      //<p> content
      const pContent = document.querySelectorAll(".guitar-tab p");
      const valoresClase = Array.from(pContent).map(
        (etiqueta) => etiqueta.textContent
      );
  
      saveObjInSessionStoraje("bandInfo", {
        bandName: bandNameInput.value, //string
        songName: songNameInput.value, //string
      });
  
      saveObjInSessionStoraje("guitarTab", {
        guitarArticle: {
          div: {
            id: divsID, //array
            ptag: {
              className: pgElementClassName, //string
              uniqueClassName: pgUniqueClass, //Set
              content: valoresClase, //array
            },
          },
        },
      });
  
      navigate("/tab/view");
      sessionStorage.setItem("tab", "created");
      window.location.reload();
    };
  
    const editGuitar = () => {
      //<-- Used to enter in edit mode.
      let guitarTab = document.querySelectorAll(".guitar-tab");
  
      if (isSelected === false) {
        setIsSelected(true);
  
        for (let i = 0; i < guitarTab.length; i++) {
          guitarTab[i].classList.add("selected");
        }
      }
  
      if (isSelected === true) {
        setIsSelected(false);
  
        for (let i = 0; i < guitarTab.length; i++) {
          guitarTab[i].classList.remove("selected");
        }
      }
    };
  
    useEffect(() => {
      //<-- Used for select tab to edit
      const handleEditClick = ({ target }) => {
        if (target.matches(".selected") && !editing) {
          setEditing(true);
          target.classList.add("editing");
          //Saves the current state of the element before editing.
          const elementEditing = document.querySelector(".editing");
          setOriginalContent(elementEditing.innerHTML);
        }
        if (target.matches(".selected p") && !editing) {
          setEditing(true);
          target.parentNode.classList.add("editing");
          //Saves the current state of the element before editing.
          const elementEditing = document.querySelector(".editing");
          setOriginalContent(elementEditing.innerHTML);
        }
      };
  
      document.addEventListener("click", handleEditClick);
  
      return () => {
        document.removeEventListener("click", handleEditClick);
      };
    }, [editing]);
  
    const saveEdit = () => {
      setEditFirstClick(false);
      handleEditState();
    };
  
    const cancelEdit = () => {
      let elementEditing = document.querySelector(".editing");
      elementEditing.innerHTML = originalContent;
      setEditFirstClick(false);
      handleEditState();
    };

  return (
    <>
      <main className="bg-zinc-600 text-zinc-300 main grid grid-cols-4">
        <aside className="col-span-1 bg-zinc-700">
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
                className="w-48 h-8 border-solid border-x border-y border-black text-zinc-700"
                type="text"
                defaultValue={bandName}
              />
              <p className="font-bold text-2xl px-2">-</p>
              <input
                placeholder="Song Name"
                id="songName"
                className="w-48 h-8 border-solid border-x border-y border-black text-zinc-700"
                type="text"
                defaultValue={songName}
              />
            </form>
          </article>

          <article className="m-5">
            {view === 0 ? <GlossaryBass /> : <GlossaryGuitar />}
          </article>
          
          <article className="">
            {view === 0 ? <form
              id="create-bass-tab"
              className="from-create-tab flex gap-2 my-5 justify-center flex-col px-5 py-4"
            >
              <input
                placeholder="G"
                type="text"
                name="G"
                value={valueG}
                onChange={handleChangeG}
                className="strings w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-4"
              />
              <input
                placeholder="D"
                type="text"
                name="D"
                value={valueD}
                onChange={handleChangeD}
                className="strings w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-3"
              />
              <input
                placeholder="A"
                type="text"
                name="A"
                value={valueA}
                onChange={handleChangeA}
                className="strings w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-2"
              />
              <input
                placeholder="E"
                type="text"
                name="E"
                value={valueE}
                onChange={handleChangeE}
                className="strings w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-1"
              />
              <div className="flex gap-2 pt-4">
                <input
                  id="clearNote-bass"
                  className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100 text-zinc-700"
                  type="button"
                  onClick={clean}
                  defaultValue="Limpiar Tab"
                />
                <input
                  id="sendNote-bass"
                  className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100 text-zinc-700"
                  type="button"
                  onClick={sendNotesBass}
                  defaultValue="Crear Tab"
                />
              </div>
            </form> : <form
              id="create-guitar-tab"
              className="from-create-tab flex gap-2 my-5 justify-center flex-col px-5 py-4"
            >
              <input
                placeholder="e"
                type="text"
                name="e"
                value={valueEm}
                onChange={handleChangeEm}
                className="strings  w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-6"
                min="0"
                max="24"
              />
              <input
                placeholder="B"
                type="text"
                name="B"
                value={valueB}
                onChange={handleChangeB}
                className="strings  w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-5"
                min="0"
                max="24"
              />
              <input
                placeholder="G"
                type="text"
                name="G"
                value={valueG}
                onChange={handleChangeG}
                className="strings  w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-4"
                min="0"
                max="24"
              />
              <input
                placeholder="D"
                type="text"
                name="D"
                value={valueD}
                onChange={handleChangeD}
                className="strings  w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-3"
                min="0"
                max="24"
              />
              <input
                placeholder="A"
                type="text"
                name="A"
                value={valueA}
                onChange={handleChangeA}
                className="strings  w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-2"
                min="0"
                max="24"
              />
              <input
                placeholder="E"
                type="text"
                name="E"
                value={valueE}
                onChange={handleChangeE}
                className="strings  w-16 h-8 border-solid border-x border-y border-black text-zinc-700"
                id="string-1"
                min="0"
                max="24"
              />
              <div className="flex gap-2 pt-4">
                <input
                    id="clearNote-guitar"
                    className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100 text-zinc-700"
                    type="button"
                    onClick={clean}
                    defaultValue="Limpiar Tab"
                  />
                <input
                  id="sendNote-guitar"
                  className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100 text-zinc-700"
                  type="button"
                  onClick={sendNotesGuitar}
                  defaultValue="Crear Tab"
                />
              </div>
            </form>}
          </article>

          <Divider />
          
          {tabCreated === true ? view === 0 ? <article className="mb-2 pb-5">
            <button
              className="bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100 text-zinc-700"
              onClick={editBass}
            >
              Editar Bajo
            </button>
            
            <button
              className="bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100 text-zinc-700"
              onClick={saveBassNotes}
            >
              Guardar
            </button>
          </article> : <article className="mb-2 pb-5">
            <button
              className="bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100 text-zinc-700"
              onClick={editGuitar}
            >
              Editar guitarra
            </button>
            
            <button
              className="bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100 text-zinc-700"
              onClick={saveGuitarNotes}
            >
              Guardar
            </button>
          </article> : null}

          

        </aside>

        <section className="col-span-3 text-zinc-700">
          {view === 0 ? <BassTabForm cancelEdit={cancelEdit} saveEdit={saveEdit} editing={editing} /> : <GuitarTabForm cancelEdit={cancelEdit} saveEdit={saveEdit} editing={editing} />}
        </section>
      </main>
      <Footer />
    </>
  );
}
