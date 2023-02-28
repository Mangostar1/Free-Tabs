import { Navigate } from "react-router-dom";

export default function TabControl({children}) {

    if (localStorage.getItem('tab') === "created") {
        return children
    } else {
        return <Navigate to="/tab/create" />
    }


}