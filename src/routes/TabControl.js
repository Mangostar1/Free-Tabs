import { Navigate } from "react-router-dom";

export default function TabControl({children}) {

    if (localStorage.hasOwnProperty('tab') === true) {
        return children
    } else {
        return <Navigate to="/tab/create" />
    }
}