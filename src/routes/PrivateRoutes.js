import { Navigate } from "react-router-dom";

export default function PrivateRoutes({children}) {

    if (localStorage.hasOwnProperty('auth') === true) {
        return children
    }

    return <Navigate to="/user/login" />

}