import React, { useState } from 'react';
import { AiFillSetting } from "react-icons/ai";
//Components
import { BassTabForm } from "pages/Home/BassTabForm";
import { GuitarTabForm } from "pages/Home/GuitarTabForm";

//Styles
import './styles/chooseIns.css'

export default function Home() {

    const [view, setView] = useState(0);
    const [tab, setTab] = useState();
    
    const viewBassTab = () => {//<-- show Bass Tab
        setView(0);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const viewGuitarTab = () => {//<-- show Guitar Tab
        setView(1);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const saveCurrentTab = () => {
        setTab(document.querySelector('.tab-root').outerHTML);
        document.getElementById('Tab-Saved').innerHTML = tab;
    }

    return(
        <main className='grid grid-cols-2'>
            <form className='chooseIns'>{/* This form have custom styles in Home/styles/chooseIns.css */}
                <input onChange={viewBassTab} type="radio" defaultValue="bass" name="instrument" className="choose-instrument" id="bass" defaultChecked />
                <label id='chooseBass' htmlFor="bass">Bass</label>

                <input onChange={viewGuitarTab} type="radio" defaultValue="guitar" name="instrument" className="choose-instrument" id="guitar" />
                <label id='chooseGuitar' htmlFor="guitar">Guitar</label>
            </form>

            <section className='test1'>
                {view === 0 ? <BassTabForm/> : <GuitarTabForm/>}
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
                <button onClick={saveCurrentTab} className='bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100'>Save</button>
            </section>
            <section id='Tab-Saved'></section>
        </main>
    )
}