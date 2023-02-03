import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from "pages/Home/Home";
import YourTabs from "pages/YourTabs/YourTabs"
import Error404Page from "pages/404/404";

export default function PublicRoutes() {
    return(
        <BrowserRouter>

        <header className='bg-slate-500 text-neutral-50 px-8 py-3'>
            <nav>
                <ul className='flex justify-start gap-10'>
                    <Link className='text-xl text-white hover:text-orange-300' to='/'>Home</Link>
                    <Link className='text-xl text-white hover:text-orange-300' to='/tabs'>Your Tabs</Link>
                    <Link className='text-xl text-white hover:text-orange-300' to='/asdasd'>404 Page</Link>
                </ul>
            </nav>
        </header>

            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/tabs' element={<YourTabs />}/>
                <Route path='*' element={<Error404Page />} />
            </Routes>
        </BrowserRouter>
    )
}