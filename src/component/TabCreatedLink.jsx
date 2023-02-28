import { Link } from 'react-router-dom'

export default function TabCreated() {

    if (localStorage.getItem('tab') === "created") {
        return(
            <Link className='text-xl text-white hover:text-orange-300' to='/tab/created_view'>Tab Created</Link>
        )
    } else {
        return(
            null
        )
    }
}