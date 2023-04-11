import axios from 'axios';
import { Link } from 'react-router-dom'

export default function LoginBtn() {

    const logOut = () => {

        //<-- For dev http://localhost:5001/api/logout
        //<-- For pro https://my-backend-expressjs.up.railway.app/api/logout

        axios.get("https://my-backend-expressjs.up.railway.app/api/logout")
        .then((response) => {
            if (response.status === 200) {
                console.log("La sesión se cerró correctamente");
            } else {
                console.log("Ocurrió un error al intentar cerrar la sesión");
            }
        })
        .catch((error) => {
            console.log("Ocurrió un error de red al intentar cerrar la sesión", error);
        })

        localStorage.clear();

    }

    if (localStorage.getItem('auth') === "yes") {
        return(
            <Link onClick={logOut} className='text-slate-700 hover:text-slate-900 bg-orange-300 hover:bg-orange-400 px-2 rounded' to='/'>Log out</Link>
        )
    } else {
        return(
            <Link className='text-slate-700 hover:text-slate-900 bg-orange-300 hover:bg-orange-400 px-2 rounded' to='/user/login'>Log in</Link>
        )
    }
}