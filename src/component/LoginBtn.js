import { Link, useNavigate } from 'react-router-dom'

export default function LoginBtn() {

    const logOut = () => {
        localStorage.clear();
    }

    if (localStorage.getItem('auth') === "yes") {
        return(
            <Link onClick={logOut} className='text-slate-600 hover:text-slate-900 bg-orange-300 hover:bg-orange-400 px-2 rounded' to='/'>Log out</Link>
        )
    } else {
        return(
            <Link className='text-slate-600 hover:text-slate-900 bg-orange-300 hover:bg-orange-400 px-2 rounded' to='/user/login'>Log in</Link>
        )
    }
}