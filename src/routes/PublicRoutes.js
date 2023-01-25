import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from "pages/Home/Home";
import Error404Page from "pages/404/404";

export default function PublicRoutes() {
    return(
        <BrowserRouter>

        <header className='bg-slate-500 text-neutral-50 px-8 py-3'>
            <nav>
                <ul className='flex justify-start gap-10'>
                    <Link className='bg-orange-300 text-black px-2 py-1' to='/'>Home</Link>
                    <Link className='bg-orange-300 text-black px-2 py-1' to='/asdasd'>404 Page</Link>
                </ul>
            </nav>
        </header>

            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='*' element={<Error404Page />} />
            </Routes>
        </BrowserRouter>
    )
}