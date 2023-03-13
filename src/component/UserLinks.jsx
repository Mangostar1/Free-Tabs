import { Link } from 'react-router-dom'

export default function UserLinks({route, nameRoute}) {

    if (localStorage.getItem('auth') === "yes") {
        return(
            <Link className='text-xl text-gray-700 hover:text-orange-300' to={route}>{nameRoute}</Link>
        )
    }
}