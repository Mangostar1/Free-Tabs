import React,{ useState } from 'react'

//Scripts
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

export function GuitarTabForm() {

    const [count, setCount] = useState(0);
    const [valueEm, setValueEm] = useState('');
    const [valueB, setValueB] = useState('');
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

    const handleChangeEm = (e) => handleChange(e, setValueEm);
    const handleChangeB = (e) => handleChange(e, setValueB);
    const handleChangeG = (e) => handleChange(e, setValueG);
    const handleChangeD = (e) => handleChange(e, setValueD);
    const handleChangeA = (e) => handleChange(e, setValueA);
    const handleChangeE = (e) => handleChange(e, setValueE);


    const sendNotes = () => {
        try {
            let strings = document.querySelectorAll('.strings');
            let $tabRoot = document.querySelector('.tab-root');
            
            if (count === 0) {//<-- create the first $tabRoot without duplicating them
                createGuitarTab($tabRoot, 1);//<-- create an article and insert it inside $tabRoot
                setCount(1)
            }
            
            let $guitarTab = document.querySelector('.guitar-tab');//<-- create by createBassTab() in scripts/createBassTab.js
            
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
        } catch (error) {
            console.error(error)
        }

        setValueEm('');
        setValueB('');
        setValueG('');
        setValueD('');
        setValueA('');
        setValueE('');
    }

    return(
        <>
            <form id="create-guitar-tab" className="from-create-tab flex gap-2 my-5 justify-center">
                <input placeholder="e" type="text" name="e" value={valueEm} onChange={handleChangeEm} className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-6" min="0" max="24" />
                <input placeholder="B" type="text" name="B" value={valueB} onChange={handleChangeB} className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-5" min="0" max="24" />
                <input placeholder="G" type="text" name="G" value={valueG} onChange={handleChangeG} className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-4" min="0" max="24" />
                <input placeholder="D" type="text" name="D" value={valueD} onChange={handleChangeD} className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-3" min="0" max="24" />
                <input placeholder="A" type="text" name="A" value={valueA} onChange={handleChangeA} className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-2" min="0" max="24" />
                <input placeholder="E" type="text" name="E" value={valueE} onChange={handleChangeE} className="strings  w-16 h-8 border-solid border-x border-y border-black" id="string-1" min="0" max="24" />
                <input onClick={sendNotes} id="sendNote-guitar" className="send-notes bg-orange-200 px-2 py-1 rounded hover:bg-orange-100" type="button" defaultValue="Send Tab" />
            </form>
            <section className="tab-root box-border border-solid border-x border-y border-black bg-slate-300 w-172 m-auto p-4"></section>
        </>
    )
}