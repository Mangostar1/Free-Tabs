import { Link } from 'react-router-dom'

export default function UserTabs() {

    if (localStorage.getItem('auth') === "yes") {
        return(
            <Link className='text-xl text-white hover:text-orange-300' to='/user/tabs'>Your Tabs</Link>
        )
    }
}