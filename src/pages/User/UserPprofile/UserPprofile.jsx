import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { endpoint } from "utils/urlApi";
import Swal from 'sweetalert2';

//Material UI
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

//SVG
import cameraSvg from "assets/icons/camera.svg";

//Components
import Footer from "component/Footer";
import Loader from "component/Loader";

//Image
import userImage from 'assets/imgs/user-profile-default.png';

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
      <main className="bg-slate-50">
        {!isLoaded ? (
          // Mostrar el loader mientras se carga la data
          <div className="absolute top-0 left-0 z-50 h-full w-full bg-black/10 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          // Mostrar el contenido una vez que la data se ha cargado
          <>
            <section className="flex flex-row justify-between py-5 px-10 m-auto relative">
              <article className="absolute top-5 right-8">
                <Button variant="contained" onClick={handleEdit} size="small">Editar</Button>
              </article>
              <article className="relative">
                  <img
                    src={userImage}
                    width='100'
                    height='100'
                    alt="profile_img"
                    className="rounded-full"
                  />
                  {editMode === true ? (
                    <button
                      onClick={handleAvatar}
                      title="change avatar"
                      className="transition absolute bottom-0 right-0 w-10 h-10 shadow-md bg-white rounded-full flex justify-center items-center hover:bg-gray-100"
                    >
                      <img src={cameraSvg} alt="change_avatar" className="w-7 h-7" />
                    </button>
                  ) : null}
                </article>
            </section>
            <section className="flex flex-row justify-between py-5 px-10 m-auto relative">
              <article className="flex flex-row gap-5">
                <div className="mx-5">
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
                    null
                  ) : (
                    <div className="w-full h-0.5 bg-orange-400"></div>
                  )}

                  <h2 className="text-gray-700 font-bold mt-5">E-MAIL</h2>
                  <p className="text-gray-900 font-medium tracking-widest">
                    {userdata.email}
                  </p>

                  <h2 className="text-gray-700 font-bold mt-5">Descripción</h2>
                  <p className="text-gray-900 tracking-widest">
                    Descripcion del usuario...
                  </p>

                </div>
                <div className="">
                  <p className="text-gray-900 bg-[#ffac33] font-medium tracking-widest py-1 px-2 rounded">
                    ROL
                  </p>
                </div>
                {editMode === true ? (
                  <div className="flex flex-row gap-4">
                    <Button variant="contained" onClick={saveChanges} title="Guardar Cambios" size="small">Guardar</Button>
                    <Button variant="contained" onClick={cancelChanges} size="small">Cancelar</Button>
                  </div>
                ) : null}
              </article>
            </section>
            <section className="flex flex-col gap-4 justify-between py-5 px-10 m-auto relative">
              {editMode === true ? (
                  <div className="flex flex-row gap-4">
                    <Button variant="contained" onClick={saveChanges} title="Guardar Cambios" size="small">Guardar</Button>
                    <Button variant="contained" onClick={cancelChanges} size="small">Cancelar</Button>
                  </div>
                ) : <>
                  <article>
                    <Link target="_blank" href="https://www.facebook.com/" underline="hover" color="inherit">
                      <FacebookIcon />
                      <span className="pl-2">Some User</span>
                    </Link>
                  </article>
                  <article>
                    <Link target="_blank" href="https://www.instagram.com/" underline="hover" color="inherit">
                      <InstagramIcon />
                      <span className="pl-2">Some User</span>
                    </Link>
                  </article>
                  <article>
                    <Link target="_blank" href="https://twitter.com/" underline="hover" color="inherit">
                      <XIcon />
                      <span className="pl-2">Some User</span>
                    </Link>
                  </article>
                </>
              }
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
