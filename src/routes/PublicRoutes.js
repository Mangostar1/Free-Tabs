import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

//Pages
import Home from "pages/Home/Home";
import YourTabs from "pages/User/YourTabs/YourTabs"
import Error404Page from "pages/404/404";
import LogIn from "pages/User/LogIn";
import SignUp from "pages/User/SignUp";

//Components
import LoginBtn from 'component/LoginBtn';
import UserTabs from 'component/UserTabs';

//Routes
import PrivateRoutes from 'routes/PrivateRoutes';

export default function PublicRoutes() {
    return(
        <BrowserRouter>

        <header className='bg-slate-500 text-neutral-50 px-8 py-3'>
            <nav className='flex justify-between'>
                <ul className='flex justify-start gap-10'>
                    <Link className='text-xl text-white hover:text-orange-300' to='/'>Home</Link>
                    <UserTabs />
                </ul>
                <ul className='flex justify-start gap-3'>
                    <Link className='text-slate-700 hover:text-slate-900 bg-orange-300 hover:bg-orange-400 px-2 rounded' to='/user/signup'>Sign up</Link>
                    <LoginBtn />
                </ul>
            </nav>
        </header>

            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/user/tabs' element={<PrivateRoutes> <YourTabs /> </PrivateRoutes>}/>
                <Route path='/user/signup' element={<SignUp />} />
                <Route path='/user/login' element={<LogIn />} />
                <Route path='*' element={<Error404Page />} />
            </Routes>
        </BrowserRouter>
    )
}