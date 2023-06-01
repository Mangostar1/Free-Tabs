import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function UserLinks({ route, nameRoute }) {
  const token = Cookies.get("jwtToken");
  const isAuthenticated = token !== undefined && token !== null && token !== "";

  if (isAuthenticated) {
    return (
      <Link
        className="px-2 py-2 text-sm text-gray-500 lg:px-6 md:px-3 hover:text-blue-600 lg:ml-auto"
        to={route}
      >
        {nameRoute}
      </Link>
    );
  }

  return null; // Si el usuario no está autenticado, no se muestra ningún enlace
}
