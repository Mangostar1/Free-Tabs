import React from 'react'

import { createBassTab } from "./scripts/createBassTab";
import { createGuitarTab } from "./scripts/createGuitarTab";

export function BassTabForm() {

    const sendNotes = () => {
        const strings = document.querySelectorAll('.strings');
        const $tabRoot = document.querySelector('.tab-root');

        createBassTab($tabRoot, strings);

        for (let e = 0; e < strings.length; e++) {
            strings[e].value = '';
        }
    }

    return(
        <>
            <form id="create-bass-tab" className="from-create-tab">
                <input placeholder="G" type="number" name="" className="strings border-solid border-x border-y border-black" id="string-4" min="0" max="24" />
                <input placeholder="D" type="number" name="" className="strings border-solid border-x border-y border-black" id="string-3" min="0" max="24" />
                <input placeholder="A" type="number" name="" className="strings border-solid border-x border-y border-black" id="string-2" min="0" max="24" />
                <input placeholder="E" type="number" name="" className="strings border-solid border-x border-y border-black" id="string-1" min="0" max="24" />
                <input onClick={sendNotes} id="sendNote-bass" className="send-notes" type="button" defaultValue="Send Tab" />
            </form>
            <div className="tab-root"></div>
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
            <form id="create-guitar-tab" className="from-create-tab">
                <input placeholder="E" type="number" name="" className="strings" id="string-6" min="0" max="24" />
                <input placeholder="B" type="number" name="" className="strings" id="string-5" min="0" max="24" />
                <input placeholder="G" type="number" name="" className="strings" id="string-4" min="0" max="24" />
                <input placeholder="D" type="number" name="" className="strings" id="string-3" min="0" max="24" />
                <input placeholder="A" type="number" name="" className="strings" id="string-2" min="0" max="24" />
                <input placeholder="E" type="number" name="" className="strings" id="string-1" min="0" max="24" />
                <input onClick={sendNotes} id="sendNote-guitar" className="send-notes" type="button" defaultValue="Send Tab" />
            </form>
            <div className="tab-root"></div>
        </>
    )
}