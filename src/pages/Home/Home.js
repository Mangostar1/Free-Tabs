import React, { useState } from 'react';

//Components
import { BassTabForm, GuitarTabForm } from "pages/Home/TabForm";

//Styles
import './styles/chooseIns.css'

export default function Home() {

    const [count, setCount] = useState(0);
    
    const bass = () => {
        setCount(0);
        let $tabRoot = document.querySelector('.tab-root');//<-- Tab Root come from TabForm.js line 29
        $tabRoot.innerHTML = '';
    }

    const guitar = () => {
        setCount(1);
        let $tabRoot = document.querySelector('.tab-root');//<-- Tab Root come from TabForm.js line 29
        $tabRoot.innerHTML = '';
    }

    const save = () => {
        console.log('%cSe guarda la tablatura', 'font-size: 20px; background-color: blue;');
    }

    return(
        <>
            <form className='chooseIns'>
                <input onChange={bass} type="radio" defaultValue="bass" name="instrument" className="choose-instrument" id="bass" defaultChecked />
                <label id='chooseBass' htmlFor="bass">Bass</label>

                <input onChange={guitar} type="radio" defaultValue="guitar" name="instrument" className="choose-instrument" id="guitar" />
                <label id='chooseGuitar' htmlFor="guitar">Guitar</label>
            </form>

            {count === 0 ? <BassTabForm/> : <GuitarTabForm/>}
            <button onClick={save} className='bg-orange-200 px-4 py-2 rounded hover:bg-orange-100'>Save</button>
        </>
    )
}