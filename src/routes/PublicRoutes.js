import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from "pages/Home/Home";
import Error404Page from "pages/404/404";

export default function PublicRoutes() {
    return(
        <BrowserRouter>

        <header>
            <nav>
                <ul className='menu'>
                    <Link to='/'>Home</Link>
                    <Link to='/asdasd'>404 Page</Link>
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