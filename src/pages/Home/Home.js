import React, { useState } from 'react';
import { AiFillSetting } from "react-icons/ai";

//Components
import { BassTabForm } from "pages/Home/BassTabForm";
import { GuitarTabForm } from "pages/Home/GuitarTabForm";

//Styles
import './styles/chooseIns.css' //<-- For <from> line 30

export default function Home() {

    const [view, setView] = useState(0);
    const [tabSabed, setTabSabed] = useState();
    
    const viewBassTab = () => {//<-- show Bass Tab
        setView(0);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const viewGuitarTab = () => {//<-- show Guitar Tab
        setView(1);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const editTab = () => {
        console.log('Se entra en modo edicion en la tab guardada');
    }

    const handleDataChange = (newData) => {
        setTabSabed(newData);
    };

    return(
        <main className='grid grid-cols-2'>
            <form className='chooseIns'>
                <input onChange={viewBassTab} type="radio" defaultValue="bass" name="instrument" className="choose-instrument" id="bass" defaultChecked />
                <label id='chooseBass' htmlFor="bass">Bass</label>

                <input onChange={viewGuitarTab} type="radio" defaultValue="guitar" name="instrument" className="choose-instrument" id="guitar" />
                <label id='chooseGuitar' htmlFor="guitar">Guitar</label>
            </form>

            <section className='test1'>
                {view === 0 ? <BassTabForm onDataChange={handleDataChange} /> : <GuitarTabForm onDataChange={handleDataChange} />}
            </section>
            <section id='Tab-Saved'>
                <button onClick={editTab} className="mt-2">
                    <AiFillSetting></AiFillSetting>
                </button>
                <div dangerouslySetInnerHTML={{ __html: tabSabed }} />
            </section>
        </main>
    )
}