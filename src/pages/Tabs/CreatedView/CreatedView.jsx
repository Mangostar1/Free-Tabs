import React, { useState } from 'react';

//components
import AsideBtns from 'component/AsideBtns'

export default function CreatedView() {

    //states
    const [tabView, setTabView] = useState(0);

    //redux states
    const bassTabElements = localStorage.newBassTab;
    const guitarTabCreated = localStorage.newGuitarTab;
    const bandName = localStorage.bandName;
    const songName = localStorage.songName;

    //scripts
    const handleBassTabView = () => {
        setTabView(1);
    }

    const handleGuitarTabView = () => {
        setTabView(2);
    }

    return(
        <main className='grid grid-cols-4 bg-slate-50'>
            <aside className='col-span-1 flex flex-col'>
                <h2 className='text-center'>Instrument</h2>
                <AsideBtns instrument="Bass" onClick={handleBassTabView}/>
                <AsideBtns instrument="Guitar" onClick={handleGuitarTabView}/>
            </aside>
            <section id='Tab-Saved' className='bg-gray-100 col-start-2 col-end-5'>
                <h1 className='font-bold text-center'>{`${bandName} - ${songName}`}</h1>
                {tabView === 1 ? <div dangerouslySetInnerHTML={{ __html: bassTabElements }} /> : null}
                {tabView === 2 ? <div dangerouslySetInnerHTML={{ __html: guitarTabCreated }} />: null}
            </section>
        </main>
        
    )
}