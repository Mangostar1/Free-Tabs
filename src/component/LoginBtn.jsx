import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie } from "utils/cookieUtils";

export default function LoginBtn() {
  //<-- For dev http://localhost:5001/api/logout
  //<-- For prod https://my-backend-expressjs.up.railway.app/api/logout
  const logOut = () => {
    axios
      .get("https://my-backend-expressjs.up.railway.app/api/logout")
      .then((response) => {
        if (response.status === 200) {
          console.log("La sesión se cerró correctamente");
        } else {
          console.log("Ocurrió un error al intentar cerrar la sesión");
        }
      })
      .catch((error) => {
        console.log(
          "Ocurrió un error de red al intentar cerrar la sesión",
          error
        );
      });

    // Eliminar la cookie "jwtToken"
    document.cookie =
      "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;";
  };

  const isAuthenticated = getCookie("jwtToken"); // Obtén el token de la cookie o realiza la validación que consideres necesaria

  if (isAuthenticated) {
    return (
      <Link
        onClick={logOut}
        className="text-slate-700 hover:text-slate-900 bg-orange-300 hover:bg-orange-400 px-2 rounded"
        to="/"
      >
        Log out
      </Link>
    );
  } else {
    return (
      <Link
        className="text-slate-700 hover:text-slate-900 bg-orange-300 hover:bg-orange-400 px-2 rounded"
        to="/user/login"
      >
        Log in
      </Link>
    );
  }
}
