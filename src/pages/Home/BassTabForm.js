import React,{ useState } from 'react'

//Scripts
import { createBassTab, addBassNotes } from "./scripts/createBassTab";

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
    const [valueG, setValueG] = useState('');
    const [valueD, setValueD] = useState('');
    const [valueA, setValueA] = useState('');
    const [valueE, setValueE] = useState('');


    const handleChange = (e, setValue) => {
        const valid = /^[0-9xXbph~/—]*$/.test(e.target.value);
        if (valid) {
            setValue(e.target.value);
        }
    };

    const handleChangeG = (e) => handleChange(e, setValueG);
    const handleChangeD = (e) => handleChange(e, setValueD);
    const handleChangeA = (e) => handleChange(e, setValueA);
    const handleChangeE = (e) => handleChange(e, setValueE);


    const sendNotes = () => {

        try {
            const strings = document.querySelectorAll('.strings');
            const $tabRoot = document.querySelector('.tab-root');
            
            if (count === 0) {//<-- create the first $tabRoot without duplicating them
                createBassTab($tabRoot, 1);//<-- create an article and insert it inside $tabRoot
                setCount(1)
            }
            
            let $bassTab = document.querySelector('.bass-tab');//<-- create by createBassTab() in scripts/createBassTab.js
            
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
        } catch (error) {
            //console.error(error)
        }

        setValueG('');
        setValueD('');
        setValueA('');
        setValueE('');
    }

    const clean = () => {
        document.querySelector('.tab-root').innerHTML = '';
        setCount(0);
    }

    return(
        <>
            <form id="create-bass-tab" className="from-create-tab flex gap-2 my-5 justify-center">
                <input placeholder="G" type="text" name="G" value={valueG} onChange={handleChangeG} className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-4" />
                <input placeholder="D" type="text" name="D" value={valueD} onChange={handleChangeD} className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-3" />
                <input placeholder="A" type="text" name="A" value={valueA} onChange={handleChangeA} className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-2" />
                <input placeholder="E" type="text" name="E" value={valueE} onChange={handleChangeE} className="strings w-16 h-8 border-solid border-x border-y border-black" id="string-1" />
                <input onClick={sendNotes} id="sendNote-bass" className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100" type="button" defaultValue="Send Tab" />
            </form>
            <button onClick={clean} className="bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100">Clean Tab</button>
            <article className="tab-root box-border border-solid border-x border-y border-black bg-slate-300 w-172 m-auto p-4"></article>
        </>
    )
}