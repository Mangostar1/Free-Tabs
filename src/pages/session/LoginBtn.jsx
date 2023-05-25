import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { endpoint } from "utils/urlApi";

export default function LoginBtn() {
  const logOut = () => {
    axios
      .get(endpoint.logout)
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("jwtToken", { path: "/" });
          console.log("La sesión se cerró correctamente"); //? Modificar este log por algun mensaje en el DOM para que el usuario pueda leerlo
        } else {
          console.error("Ocurrió un error al intentar cerrar la sesión");
        }
      })
      .catch((error) => {
        console.error(
          "Ocurrió un error de red al intentar cerrar la sesión",
          error
        );
      });
  };

  const isAuthenticated = Cookies.get("jwtToken");

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
