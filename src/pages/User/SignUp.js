import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {

    const signup = () => {//! API del Backend en construccion
        console.log('Se registra un usuario - test');
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <form className="bg-slate-200 flex flex-col items-center justify-center gap-4 w-80 h-64 rounded">
                <input type="email" name="E-mail" placeholder="E-mail" className="bg-slate-100 w-64 h-8" />
                <input type="text" name="username" placeholder="username" className="bg-slate-100 w-64 h-8" />
                <input type="password" name="password" placeholder="Password" className="bg-slate-100 w-64 h-8" />
                <input type="password" name="R-password" placeholder="R Password" className="bg-slate-100 w-64 h-8" />
                <input type="button" onClick={signup} name="send" className="bg-orange-200 w-64 px-4 py-2 mt-2 rounded hover:bg-orange-100" value="Sign up"/>
            </form>
        </div>
    )
}