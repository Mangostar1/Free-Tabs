import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { endpoint } from "utils/urlApi";

export default function UserPprofile(props) {
  const [userdata, setUserdata] = useState({
    userName: undefined,
    email: undefined,
    userImage: undefined,
  });

  const cookieValue = Cookies.get("jwtToken");

  const handleUserData = () => {
    axios.defaults.withCredentials = true;

    axios
      .get(endpoint.userInfo, {
        headers: {
          Cookie: `jwtToken=${cookieValue}`,
        },
      })
      .then((response) => {
        setUserdata({
          userName: response.data.displayName,
          email: response.data.email,
          userImage: response.data.photoURL,
        });
      })
      .catch((error) => {
        console.error(error, error.message);
      });
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <main className="bg-slate-50 min-h-screen">
      <h1>Aca se veran los datos del usuario cuando este este logeado</h1>
      <section>
        <p>Nombre: {userdata.userName}</p>
        <p>Email: {userdata.email}</p>
        <img src="#" alt="profile_img" />
      </section>
    </main>
  );
}
