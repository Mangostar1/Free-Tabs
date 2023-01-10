import React, { useState } from 'react';

import { BassTabForm, GuitarTabForm } from "pages/Home/TabForm";
import './styles/chooseIns.css'

export default function Home() {

    const [count, setCount] = useState(0);
    
    const bass = () => {
        setCount(0);
        let $tabRoot = document.querySelector('.tab-root');
        $tabRoot.innerHTML = '';
    }

    const guitar = () => {
        setCount(1);
        let $tabRoot = document.querySelector('.tab-root');
        $tabRoot.innerHTML = '';
    }

    return(
        <>
            <h1>Home</h1>
            <form className='chooseIns'>
                <label id='chooseBass' htmlFor="bass">Bass</label>
                <input onChange={bass} type="radio" defaultValue="bass" name="instrument" className="choose-instrument" id="bass" defaultChecked />

                <label id='chooseGuitar' htmlFor="guitar">Guitar</label>
                <input onChange={guitar} type="radio" defaultValue="guitar" name="instrument" className="choose-instrument" id="guitar" />
            </form>

            {count === 0 ? BassTabForm() : GuitarTabForm()}
        </>
    )
}