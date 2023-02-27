import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

//Components
import { BassTabForm } from "pages/Tabs/CreateTab/BassTabForm";
import { GuitarTabForm } from "pages/Tabs/CreateTab/GuitarTabForm";
import CreatedView from '../CreatedView/CreatedView';

//Styles
import '.././styles/chooseIns.css' //<-- For <from> line 30

export default function CreateTab() {

    const [view, setView] = useState(0);
    const [tabSabed, setTabSabed] = useState('');
    const navigate = useNavigate();
    
    const viewBassTab = () => {//<-- show Bass Tab
        setView(0);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const viewGuitarTab = () => {//<-- show Guitar Tab
        setView(1);
        document.querySelector('.tab-root').innerHTML = '';//<-- Tab Root come from TabForm.js line 29
    }

    const handleDataChange = (newData) => {
        setTabSabed(newData);
        //navigate('/tab/created_view');
    };

    return(
        <main className=''>
            <form className='chooseIns'>
                <input onChange={viewBassTab} type="radio" defaultValue="bass" name="instrument" className="choose-instrument" id="bass" defaultChecked />
                <label id='chooseBass' htmlFor="bass">Bass</label>

                <input onChange={viewGuitarTab} type="radio" defaultValue="guitar" name="instrument" className="choose-instrument" id="guitar" />
                <label id='chooseGuitar' htmlFor="guitar">Guitar</label>
            </form>

            <section className='test1'>
                <input placeholder='Band Name' className='w-48 h-8 border-solid border-x border-y border-black' type='text'/>
                <input placeholder='Song Name' className='w-48 h-8 border-solid border-x border-y border-black' type='text'/>
                {view === 0 ? <BassTabForm onDataChange={handleDataChange} /> : <GuitarTabForm onDataChange={handleDataChange} />}
            </section>
            {tabSabed === '' ? null : <CreatedView component={<div dangerouslySetInnerHTML={{ __html: tabSabed }} />} />}
        </main>
    )
}