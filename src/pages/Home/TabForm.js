import React,{ useState } from 'react'

import { createBassTab, addNotes } from "./scripts/createBassTab";
import { createGuitarTab } from "./scripts/createGuitarTab";


export function BassTabForm() {

    const [count, setCount] = useState(0)

    const sendNotes = () => {
        const strings = document.querySelectorAll('.strings');
        const $tabRoot = document.querySelector('.tab-root');

        //let $bassStrings = document.querySelector('.bass-strings');
        let $bassTab;
        
        if (count === 0) {//<-- create the first $tabRoot without duplicating them
            createBassTab($tabRoot, 1);//<-- create an article and insert it inside $tabRoot
            setCount(1)
        }
        
        $bassTab = document.querySelector('.bass-tab');//<-- create by createBassTab()
        
        if (count === 1) {
            addNotes($bassTab, strings);//<-- article inside of section .tab-root, strings
        }

        /* if ($bassStrings.textContent.length === 41) {
            createBassTab($tabRoot);
            addNotes($bassTab, strings);
            setCount(2)
        } */

        
        for (let e = 0; e < strings.length; e++) {//<-- clean the inputs .strings
            strings[e].value = '';
        }
    }

    return(
        <>
            <form id="create-bass-tab" className="from-create-tab flex gap-2">
                <input placeholder="G" type="number" name="G" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-4" min="0" max="24" />
                <input placeholder="D" type="number" name="D" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-3" min="0" max="24" />
                <input placeholder="A" type="number" name="A" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-2" min="0" max="24" />
                <input placeholder="E" type="number" name="E" className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-1" min="0" max="24" />
                <input onClick={sendNotes} id="sendNote-bass" className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100" type="button" defaultValue="Send Tab" />
            </form>
            <section className="tab-root box-border border-solid border-x border-y border-black bg-slate-300 w-172 m-auto p-4"></section>
        </>
    )
}

export function GuitarTabForm() {

    const sendNotes = () => {
        let strings = document.querySelectorAll('.strings');
        let $tabRoot = document.querySelector('.tab-root');

        createGuitarTab($tabRoot, strings);

        for (let e = 0; e < strings.length; e++) {
            strings[e].value = '';
        }
    }

    return(
        <>
            <form id="create-guitar-tab" className="from-create-tab flex gap-2">
                <input placeholder="E" type="number" name="e" className="strings border-solid border-x border-y border-black" id="string-6" min="0" max="24" />
                <input placeholder="B" type="number" name="B" className="strings border-solid border-x border-y border-black" id="string-5" min="0" max="24" />
                <input placeholder="G" type="number" name="G" className="strings border-solid border-x border-y border-black" id="string-4" min="0" max="24" />
                <input placeholder="D" type="number" name="D" className="strings border-solid border-x border-y border-black" id="string-3" min="0" max="24" />
                <input placeholder="A" type="number" name="A" className="strings border-solid border-x border-y border-black" id="string-2" min="0" max="24" />
                <input placeholder="E" type="number" name="E" className="strings border-solid border-x border-y border-black" id="string-1" min="0" max="24" />
                <input onClick={sendNotes} id="sendNote-guitar" className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100" type="button" defaultValue="Send Tab" />
            </form>
            <div className="tab-root box-border border-solid border-x border-y border-black bg-slate-300 w-172 m-auto p-4"></div>
        </>
    )
}