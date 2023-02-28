import React, { useState } from 'react';

//Components
import { BassTabForm } from "pages/Tabs/CreateTab/BassTabForm";
import { GuitarTabForm } from "pages/Tabs/CreateTab/GuitarTabForm";

//Styles
import '.././styles/chooseIns.css' //<-- For <from> line 30


export default function CreateTab() {

    const [view, setView] = useState(0);
    
    const viewBassTab = () => {//<-- show Bass Tab
        setView(0);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const viewGuitarTab = () => {//<-- show Guitar Tab
        setView(1);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }


    return(
        <main className=''>
            <form className='chooseIns'>
                <input onChange={viewBassTab} type="radio" defaultValue="bass" name="instrument" className="choose-instrument" id="bass" defaultChecked />
                <label id='chooseBass' htmlFor="bass">Bass</label>

                <input onChange={viewGuitarTab} type="radio" defaultValue="guitar" name="instrument" className="choose-instrument" id="guitar" />
                <label id='chooseGuitar' htmlFor="guitar">Guitar</label>
            </form>

            <section className=''>
                <form className='flex justify-center'>    
                    <input placeholder='Band Name' id='bandName' className='w-48 h-8 border-solid border-x border-y border-black' type='text'/>
                    <input placeholder='Song Name' id='songName' className='w-48 h-8 border-solid border-x border-y border-black' type='text'/>
                </form>
                {view === 0 ? <BassTabForm /> : <GuitarTabForm />}
            </section>
        </main>
    )
}