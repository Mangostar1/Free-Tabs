import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {

    const navigate = useNavigate();

    const [body, setBody] = useState({email: '', password: ''});
    const [isEqual, setIsEqual] = useState(false);

    const valid = /^[a-zA-Z0-9_@.-]{6,}$/;

    const handler = ({target}) => {
        const {name, value} = target;
        setBody({
            ...body,
            [name]: value
        })

        if (valid.test(body.password)) {
            console.log('La contraseña debe tener un minimo de 6 caracteres');
        }
    }

    const handleEqual = ({target}) => {
        if (target.value === body.password) {
            setIsEqual(true);
        }

        if (target.value !== body.password) {
            console.log('Las contraseñas deben coincidir');
        }
    }

    const signup = () => {
        if (isEqual === true) {
            axios.post('https://my-backend-expressjs.up.railway.app/api/signup', body)
            .then(() => {
                localStorage.setItem("login", "yes");
                navigate('/');
            })
            .catch(({response}) => {
                console.error(response.data, 'error!!')
            })
        }
    }

    return(
        <main className="flex justify-center items-center bg-slate-50 min-h-screen">
            <form className="bg-slate-200 flex flex-col items-center justify-center gap-4 w-80 h-72 rounded">
                <input type="email" value={body.email} onChange={handler} name="email" placeholder="E-mail" className="pass bg-slate-100 w-64 h-8" required/>
                <input type="password" value={body.password} onChange={handler} name="password" placeholder="Password" className="bg-slate-100 w-64 h-8" required/>
                <input type="password" onChange={handleEqual} name="R-password" placeholder="R Password" className="bg-slate-100 w-64 h-8" required/>
                <input type="button" onClick={signup} name="send" 
                    className="
                        bg-orange-200 
                        w-64 
                        px-4 py-2 
                        mt-2 
                        rounded 
                        ease-out duration-500 
                        text-xl 
                        hover:bg-orange-600 hover:text-gray-100
                    " value="Sign up"/>{/* add disabled */}
            </form>
        </main>
    )
}