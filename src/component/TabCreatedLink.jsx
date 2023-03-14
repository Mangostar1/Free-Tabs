import { Link } from 'react-router-dom'

export default function TabCreatedLink() {

    if (sessionStorage.getItem('tab') === "created") {
        return(
            <Link className='text-xl text-gray-700 hover:text-orange-500' to='/tab/created_view'>Tab Created</Link>
        )
    } else {
        return(
            null
        )
    }
    
}