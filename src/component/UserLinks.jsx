import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function UserLinks({ route, nameRoute }) {
  const token = Cookies.get("jwtToken");
  const isAuthenticated = token !== undefined && token !== null && token !== "";

  if (isAuthenticated) {
    return (
      <Link className="text-xl text-gray-700 hover:text-orange-500" to={route}>
        {nameRoute}
      </Link>
    );
  }

  return null; // Si el usuario no está autenticado, no se muestra ningún enlace
}
