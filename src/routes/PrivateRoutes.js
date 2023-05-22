import { Navigate } from "react-router-dom";
import { getCookie } from "utils/cookieUtils";

export default function PrivateRoutes({ children }) {
  const isAuthenticated = getCookie("jwtToken"); // Obtén el token de la cookie o realiza la validación que consideres necesaria

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/user/login" />; // Redirige al usuario a la página de inicio de sesión si no está autenticado
}
