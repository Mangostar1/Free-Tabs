import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Importa la función nombrada

export default function PrivateRoutes({ children }) {
  const token = Cookies.get("jwtToken");
  const isAuthenticated = token !== undefined && token !== null && token !== "";

  if (isAuthenticated) {
    // Verificar la expiración del token
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Obtiene el tiempo actual en segundos

    if (decodedToken.exp < currentTime) {
      // El token ha expirado, redirige al usuario a la página de inicio de sesión
      return <Navigate to="/login" />;
    }

    return children;
  }

  return <Navigate to="/login" />; // Redirige al usuario a la página de inicio de sesión si no está autenticado
}
