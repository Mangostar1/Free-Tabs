import React, { useState } from 'react';

//Components
import { BassTabForm } from "pages/Home/BassTabForm";
import { GuitarTabForm } from "pages/Home/GuitarTabForm";

//Styles
import './styles/chooseIns.css'

export default function Home() {

    const [count, setCount] = useState(0);
    
    const [tab, setTab] = useState();
    const [html, setHtml] = useState();
    
    const bass = () => {//<-- show Bass Tab
        setCount(0);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const guitar = () => {//<-- show Guitar Tab
        setCount(1);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const save = () => {
        setTab(document.querySelector('.tab-root').outerHTML);
        setHtml(<section className='test2' dangerouslySetInnerHTML={{ __html: tab }} />);//!<-- Quiza tenga que reemplazar el uso de dangerouslySetInnerHTML() en un futuro.
    }

    return(
        <main className='grid grid-cols-2'>
            <form className='chooseIns'>{/* This form have custom styles in Home/styles/chooseIns.css */}
                <input onChange={bass} type="radio" defaultValue="bass" name="instrument" className="choose-instrument" id="bass" defaultChecked />
                <label id='chooseBass' htmlFor="bass">Bass</label>

                <input onChange={guitar} type="radio" defaultValue="guitar" name="instrument" className="choose-instrument" id="guitar" />
                <label id='chooseGuitar' htmlFor="guitar">Guitar</label>
            </form>

            <section className='test1'>
                {count === 0 ? <BassTabForm/> : <GuitarTabForm/>}
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
                <button onClick={save} className='bg-orange-200 px-4 py-2 mt-5 ml-5 rounded hover:bg-orange-100'>Save</button>
            </section>
            {html}
        </main>
    )
}