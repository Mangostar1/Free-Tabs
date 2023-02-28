import React from 'react';
import { useSelector } from 'react-redux';

//components
import AsideBtns from 'component/AsideBtns'

export default function CreatedView() {

    //redux states
    const bassTabElements = useSelector(state => state.bassTabCreated);
    const bandName = useSelector(state => state.bandInfo);
    const songName = useSelector(state => state.songBandInfo);

    //scripts
    const handleTest = () => {
        console.log('hola desde aside');
    }

    return(
        <main className=''>
            <h1 className='font-bold text-center'>{`${bandName} - ${songName}`}</h1>
            <aside className=''>
                <h2>Instrument</h2>
                <AsideBtns instrument="Bass" onClick={handleTest}/>
            </aside>
            <section id='Tab-Saved' className='bg-gray-100'>
                {Object.values(bassTabElements).map(element => (
                    <div key={element.id} dangerouslySetInnerHTML={{ __html: element.content }} />
                ))}
            </section>
        </main>
        
    )
}