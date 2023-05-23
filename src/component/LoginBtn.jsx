import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginBtn() {
  //<-- For dev http://localhost:5001/api/logout
  //<-- For prod https://my-backend-expressjs.up.railway.app/api/logout
  const logOut = () => {
    axios
      .get("https://my-backend-expressjs.up.railway.app/api/logout")
      .then((response) => {
        if (response.status === 200) {
          // Eliminar la cookie "jwtToken"
          Cookies.remove("jwtToken", { path: "/" });
          console.log("La sesión se cerró correctamente");
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
