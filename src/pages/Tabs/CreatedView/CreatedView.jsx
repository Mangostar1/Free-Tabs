import React from 'react';
import { useSelector } from 'react-redux';

export default function CreatedView({component}) {

    const tabElements = useSelector(state => state.tabCreated);

    console.log(tabElements);

    return(
        <main className=''>
            <h1>Aca se veran las tab recien creadas por el usuario</h1>
            <section id='Tab-Saved' className='bg-gray-100'>
                {component}
                {/* {Object.values(tabElements).map(element => (
                    <div key={element.id} dangerouslySetInnerHTML={{ __html: element.content }} />
                ))} */}
            </section>
        </main>
        
    )
}