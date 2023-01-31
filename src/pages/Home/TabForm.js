import React,{ useState } from 'react'

//Scripts
import { createBassTab, addBassNotes } from "./scripts/createBassTab";
import { createGuitarTab, addGuitarNotes } from "./scripts/createGuitarTab";

//Styles
import './styles/tabsContent.css'

//Object for <BassTabForm/> and <GuitarTabForm/>
const data = [//<-- used in sendNotes for create multiple articles .bass-tab from createBassTab() and .guitar-tab from createGuitarTab()
        {
            className: 'A',
            nextClassName: 'B',
            countState: 1,
            id: 2
        },
        {
            className: 'B',
            nextClassName: 'C',
            countState: 2,
            id: 3
        },
        {
            className: 'C',
            nextClassName: 'D',
            countState: 3,
            id: 4
        },
    ];

export function BassTabForm() {

    const [count, setCount] = useState(0);

    const sendNotes = () => {
        const strings = document.querySelectorAll('.strings');
        const $tabRoot = document.querySelector('.tab-root');

        let $bassTab;
        
        if (count === 0) {//<-- create the first $tabRoot without duplicating them
            createBassTab($tabRoot, 1);//<-- create an article and insert it inside $tabRoot
            setCount(1)
        }
        
        $bassTab = document.querySelector('.bass-tab');//<-- create by createBassTab() in scripts/createBassTab.js
        
        if (count === 1) {
            addBassNotes($bassTab, strings, 'A');//<-- article inside of section ".tab-root", "strings", "second class" (important for create a second article and continue adding more notes on the tab)
        }

        data.forEach(({ className, nextClassName, countState, id }) => {
            if (document.querySelector(`.${className}`).textContent.length >= 41) {
                if (count === countState) {
                createBassTab($tabRoot, id);
                setCount(id)
                }
                addBassNotes(document.getElementById(id), strings, nextClassName);
            }
        });

        // Clean the inputs .strings
        for (let e = 0; e < strings.length; e++) {
            strings[e].value = '';
        }
    }

    return(
        <>
            <form id="create-bass-tab" className="from-create-tab flex gap-2 my-5 justify-center">
                <input placeholder="G" type="text" name="G" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-4" min="0" max="24" />
                <input placeholder="D" type="text" name="D" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-3" min="0" max="24" />
                <input placeholder="A" type="text" name="A" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-2" min="0" max="24" />
                <input placeholder="E" type="text" name="E" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-1" min="0" max="24" />
                <input onClick={sendNotes} id="sendNote-bass" className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100" type="button" defaultValue="Send Tab" />
            </form>
            <section className="tab-root box-border border-solid border-x border-y border-black bg-slate-300 w-172 m-auto p-4"></section>
        </>
    )
}

export function GuitarTabForm() {

    const [count, setCount] = useState(0);

    const sendNotes = () => {
        let strings = document.querySelectorAll('.strings');
        let $tabRoot = document.querySelector('.tab-root');

        let $guitarTab;
        
        if (count === 0) {//<-- create the first $tabRoot without duplicating them
            createGuitarTab($tabRoot, 1);//<-- create an article and insert it inside $tabRoot
            setCount(1)
        }
        
        $guitarTab = document.querySelector('.guitar-tab');//<-- create by createBassTab() in scripts/createBassTab.js
        
        if (count === 1) {
            addGuitarNotes($guitarTab, strings, 'A');//<-- article inside of section ".tab-root", "strings", "second class" (important for create a second article and continue adding more notes on the tab)
        }

        data.forEach(({ className, nextClassName, countState, id }) => {
            if (document.querySelector(`.${className}`).textContent.length >= 41) {
                if (count === countState) {
                    createGuitarTab($tabRoot, id);
                setCount(id)
                }
                addGuitarNotes(document.getElementById(id), strings, nextClassName);
            }
        });

        for (let e = 0; e < strings.length; e++) {
            strings[e].value = '';
        }
    }

    return(
        <>
            <form id="create-guitar-tab" className="from-create-tab flex gap-2 my-5 justify-center">
                <input placeholder="e" type="number" name="e" className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-6" min="0" max="24" />
                <input placeholder="B" type="number" name="B" className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-5" min="0" max="24" />
                <input placeholder="G" type="number" name="G" className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-4" min="0" max="24" />
                <input placeholder="D" type="number" name="D" className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-3" min="0" max="24" />
                <input placeholder="A" type="number" name="A" className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-2" min="0" max="24" />
                <input placeholder="E" type="number" name="E" className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-1" min="0" max="24" />
                <input onClick={sendNotes} id="sendNote-guitar" className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100" type="button" defaultValue="Send Tab" />
            </form>
            <section className="tab-root box-border border-solid border-x border-y border-black bg-slate-300 w-172 m-auto p-4"></section>
        </>
    )
}