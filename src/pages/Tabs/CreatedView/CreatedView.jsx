import React from 'react';
import { useSelector } from 'react-redux';

export default function CreatedView() {

    const tabElements = useSelector(state => state.bassTabCreated);
    const bandName = useSelector(state => state.bandInfo);
    const songName = useSelector(state => state.songBandInfo);

    return(
        <main className=''>
            <h1 className='font-bold text-center'>{`${bandName} - ${songName}`}</h1>
            <section id='Tab-Saved' className='bg-gray-100'>
                {Object.values(tabElements).map(element => (
                    <div key={element.id} dangerouslySetInnerHTML={{ __html: element.content }} />
                ))}
            </section>
        </main>
        
    )
}