import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {

    const navigate = useNavigate();

    const [body, setBody] = useState({email: '', password: ''});


    const handler = ({target}) => {
        const {name, value} = target;
        setBody({
            ...body,
            [name]: value
        })
    }


    const signup = () => {
        axios.post('https://my-backend-expressjs.up.railway.app/api/signup', body)
        .then(() => {
            localStorage.setItem("login", "yes");
            navigate('/');
        })
        .catch(({response}) => {
            console.error(response.data, 'error!!')
        })
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <form className="bg-slate-200 flex flex-col items-center justify-center gap-4 w-80 h-72 rounded">
                <input type="email" value={body.email} onChange={handler} name="email" placeholder="E-mail" className="bg-slate-100 w-64 h-8" />
                <input type="password" value={body.password} onChange={handler} name="password" placeholder="Password" className="bg-slate-100 w-64 h-8" />
                {/* <input type="password" name="R-password" placeholder="R Password" className="bg-slate-100 w-64 h-8" /> */}
                <input type="button" onClick={signup} name="send" className="bg-orange-200 w-64 px-4 py-2 mt-2 rounded hover:bg-orange-100" value="Sign up"/>
            </form>
        </div>
    )
}