import { Link } from "react-router-dom";
import { getCookie } from "utils/cookieUtils";

export default function UserLinks({ route, nameRoute }) {
  const isAuthenticated = getCookie("jwtToken"); // Obtén el token de la cookie o realiza la validación que consideres necesaria

  if (isAuthenticated) {
    return (
      <Link className="text-xl text-gray-700 hover:text-orange-500" to={route}>
        {nameRoute}
      </Link>
    );
  }

  return null; // Si el usuario no está autenticado, no se muestra ningún enlace
}
