import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { endpoint } from "utils/urlApi";
import Swal from 'sweetalert2';

//Material UI
import Button from '@mui/material/Button';

//SVG
import cameraSvg from "assets/icons/camera.svg";

//Components
import Footer from "component/Footer";
import Loader from "component/Loader";

export default function UserProfile(props) {
  //States
  const [userdata, setUserdata] = useState({
    userName: undefined,
    email: undefined,
    userImage: undefined,
  });
  const [editMode, setEditMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  //Cookie
  const jwtToken = Cookies.get("jwtToken");

  //Functions
  const handler = ({ target }) => {
    const { name, value } = target;
    setUserdata({ ...userdata, [name]: value });
  };

  const handleAvatar = () => {
    console.log("Función deshabilitada");
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleUserData = () => {
    try {
      axios.defaults.withCredentials = true;
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${jwtToken}`;
        return config;
      });

      axios
        .get(endpoint.userInfo)
        .then((response) => {
          setUserdata({
            userName: response.data.displayName,
            email: response.data.email,
            userImage: response.data.photoURL,
          });
        })
        .catch((error) => {
          console.error(error, error.message);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    } catch (error) {
      console.error(error);
      setIsLoaded(true); // En caso de error, asegurarse de establecer isLoaded a true para evitar que el loader se quede permanentemente.
    }
  };

  const saveChanges = () => {
    setEditMode(false);
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${jwtToken}`;
      return config;
    });
    axios
      .put(endpoint.userInfoPut, userdata)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Tu perfil ha sido actualizado exitosamente!",
            showConfirmButton: false,
            timer: 1500
          });
          setUserdata({
            ...userdata,
            userName: response.data.user_name,
          });
        }
      })
      .catch((error) => {
        console.error(error, error.message);
      });
  };

  const cancelChanges = () => {
    setEditMode(false);
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <>
      <main className="bg-slate-50 flex flex-row justify-between py-14 px-10 mx-auto w-144 relative">
        {!isLoaded ? (
          // Mostrar el loader mientras se carga la data
          <div className="absolute top-0 left-0 z-50 h-full w-full bg-black/10 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          // Mostrar el contenido una vez que la data se ha cargado
          <>
            <div className="absolute top-5 right-8">
              <Button variant="contained" onClick={handleEdit} size="small">Editar</Button>
            </div>

            <section className="flex flex-col gap-5">
              <div className="">
                <h2 className="text-gray-700 font-bold">Nombre</h2>
                {editMode === false ? (
                  <p className="text-gray-900 font-medium tracking-widest">
                    {userdata.userName}
                  </p>
                ) : (
                  <input
                    type="text"
                    name="userName"
                    placeholder={userdata.userName}
                    value={userdata.userName}
                    className="w-full tracking-widest"
                    onChange={handler}
                  />
                )}

                {editMode === false ? (
                  <div className="w-full h-0.5 bg-gray-400"></div>
                ) : (
                  <div className="w-full h-0.5 bg-orange-400"></div>
                )}
              </div>
              <div className="">
                <h2 className="text-gray-700 font-bold">E-MAIL</h2>
                <p className="text-gray-900 font-medium tracking-widest">
                  {userdata.email}
                </p>
                <div className="w-full h-0.5 bg-gray-400"></div>
              </div>
              {editMode === true ? (
                <div className="flex flex-row gap-4">
                  <Button variant="contained" onClick={saveChanges} title="Guardar Cambios" size="small">Guardar</Button>
                  <Button variant="contained" onClick={cancelChanges} size="small">Cancelar</Button>
                </div>
              ) : null}
            </section>
            <section className="relative">
              <img
                src="https://picsum.photos/200/200"
                alt="profile_img"
                className="rounded-full"
              />
              {editMode === true ? (
                <button
                  onClick={handleAvatar}
                  title="change avatar"
                  className="transition absolute bottom-0 right-4 w-11 h-11 shadow-md bg-white rounded-full flex justify-center items-center hover:bg-gray-100"
                >
                  <img src={cameraSvg} alt="change_avatar" className="w-7 h-7" />
                </button>
              ) : null}
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
