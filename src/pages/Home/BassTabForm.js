import React,{ useEffect, useState } from 'react'

//Scripts
import { createBassTab, addBassNotes } from "./scripts/createBassTab";

//Styles
import './styles/tabsContent.css';
import './styles/editTabStiles.css';

//Object for <BassTabForm/>
const data = [//<-- used in sendNotes for create multiple articles .bass-tab from createBassTab().
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

export function BassTabForm({onDataChange}) {

    //States
    const [count, setCount] = useState(0);
    const [valueG, setValueG] = useState('');
    const [valueD, setValueD] = useState('');
    const [valueA, setValueA] = useState('');
    const [valueE, setValueE] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [editing, setEditing] = useState(false);


    const handleChange = ({target}, setValue) => {//<-- Regular expression to validate the form.
        const valid = /^[0-9xXbph~/—]*$/.test(target.value);
        if (valid) {
            setValue(target.value);
        }
    };

    const handleChangeG = (e) => handleChange(e, setValueG);
    const handleChangeD = (e) => handleChange(e, setValueD);
    const handleChangeA = (e) => handleChange(e, setValueA);
    const handleChangeE = (e) => handleChange(e, setValueE);


    const sendNotes = () => {//<-- Send notes on input text to the "tap-root" element.

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
        } catch (error) {}//<-- It's empty because don't need send the error on console.

        //To clear the inputs
        setValueG('');
        setValueD('');
        setValueA('');
        setValueE('');
    }

    const clean = () => {//<-- Clear input text from create bass tab.
        document.querySelector('.tab-root').innerHTML = '';
        setCount(0);
    }
    
    const saveNotes = () => {//<-- Send the tab created to <Home /> Component.
        const tabRootSaved = document.querySelector('.tab-root').outerHTML;
        onDataChange(tabRootSaved);
    }

    const edit = () => {
        let bassTab = document.querySelectorAll('.bass-tab');
        
        if (isSelected === false) {

            setIsSelected(true);
            
            for (let i = 0; i < bassTab.length; i++) {
                bassTab[i].classList.add('selected');
            }
        }

        if (isSelected === true) {

            setIsSelected(false);

            for (let i = 0; i < bassTab.length; i++) {
                bassTab[i].classList.remove('selected');
            }
        }
    }

    useEffect(() => {
        const handleEditClick = ({target}) => {
            if (target.matches('.selected') && !editing) {
                setEditing(true);
                target.classList.add('editing');
            }
            if (target.matches('.selected p') && !editing) {
                setEditing(true);
                target.parentNode.classList.add('editing');
            }
        }

        document.addEventListener('click', handleEditClick);

        return () => {
            document.removeEventListener('click', handleEditClick);
        }
    }, [editing])

    const handleState = () => {
        setEditing(false);
        document.querySelector('.selected').classList.remove('editing');
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
            <article className="tab-root box-border border-solid border-x border-y border-black bg-slate-300 w-172 m-auto p-4">
                {editing === true ? <button name="Acept" className="bg-orange-200 px-4 py-2 ml-5 rounded hover:bg-orange-100" onClick={handleState}> Acept </button> : ""}
                {editing === true ? <button name="Cancel" className="bg-orange-200 px-4 py-2 ml-5 rounded hover:bg-orange-100" onClick={handleState}> Cancel </button> : ""}
            </article>
            <div className='mt-5 ml-5'>
                <h2 className='font-bold'>Glossary:</h2>
                <ul className='ml-6'>
                    <li className='list-disc'>x  Dead note</li>
                    <li className='list-disc'>h  Hammer-on</li>
                    <li className='list-disc'>p  Pull-off</li>
                    <li className='list-disc'>b  Bend</li>
                    <li className='list-disc'>/  Slide up</li>
                    <li className='list-disc'>~  Vibrato</li>
                </ul>
            </div>
            <button onClick={edit} className='bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100'>Edit</button>
            <button onClick={saveNotes} className='bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100'>Save</button>
        </>
    )
}