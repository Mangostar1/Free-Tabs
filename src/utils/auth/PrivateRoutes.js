import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoutes({ children }) {
  const token = Cookies.get("jwtToken");
  const isAuthenticated = token !== undefined && token !== null && token !== "";

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />; // Redirige al usuario a la página de inicio de sesión si no está autenticado
}
