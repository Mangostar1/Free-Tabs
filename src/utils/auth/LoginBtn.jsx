import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { endpoint } from "utils/urlApi";

//component
import Login from "utils/auth/LogIn";

export default function LoginBtn() {
  const [view, setView] = useState(false);

  const handleModal = () => {
    setView(!view);
  };

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
        className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline"
        to="/"
      >
        Sign out
      </Link>
    );
  } else {
    return (
      <>
        <button
          className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline"
          onClick={handleModal}
        >
          Sign in
        </button>
        {view && <Login />}
      </>
    );
  }
}
