import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { endpoint } from "utils/urlApi";
import Swal from 'sweetalert2';

//Material UI
import { TextField, Button, Link } from '@mui/material';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [socialFacebook, setSocialFacebook] = useState(undefined);
  const [socialInstagram, setSocialInstagram] = useState(undefined);
  const [socialTwitter, setSocialTwitter] = useState(undefined);
  const [userDEscription, setUserDescription] = useState(undefined);
  
  //Cookie
  const jwtToken = Cookies.get("jwtToken");

  //Functions
  const handler = ({ target }) => {
    const { name, value } = target;
    setUserdata({ ...userdata, [name]: value });
  };

  const handleData = ({target}) => {
    const { id, value } = target;

    if (id === 'user-description') {
      setUserDescription(value);
    }

    if (id === 'social-media-facebook') {
      setSocialFacebook(value);
    }

    if (id === 'social-media-instagram') {
      setSocialInstagram(value);
    }

    if (id === 'social-media-twitter') {
      setSocialTwitter(value);
    }
  }

const handleAvatarClick = () => {
  // Disparar el click en el input de archivo oculto
  document.getElementById('imageUpload').click();
};

const handleAvatarChange = (event) => {
  const file = event.target.files[0]; // Obtener el archivo seleccionado

  if (file) {
    setSelectedImage(URL.createObjectURL(file)); // Actualizar la imagen seleccionada
  }

  console.log("File image", file); // Aquí podrías realizar la subida al servidor o cualquier otra acción
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
            role: response.data.userRole
          });

          setSocialFacebook(response.data.facebook);
          setSocialInstagram(response.data.instagram);
          setSocialTwitter(response.data.twitter);
          setUserDescription(response.data.description);
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

  const saveChanges = (event) => {
    event.preventDefault();
    setEditMode(false);
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${jwtToken}`;
      return config;
    });
    axios
      .put(endpoint.userInfoPut, {userdata: userdata, userFacebook: socialFacebook, userInstagram: socialInstagram, userTwitter: socialTwitter, userDescription: userDEscription})
      .then((response) => {
        if (response.status === 200) {
          setUserdata({
            ...userdata,
            userName: response.data.user_name,
          });
          setSocialFacebook(response.data.user_facebook);
          setSocialInstagram(response.data.user_instagram);
          setSocialTwitter(response.data.user_twitter);
          setUserDescription(response.data.user_description);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Tu perfil ha sido actualizado exitosamente!",
            showConfirmButton: false,
            timer: 1500
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
      <main className="bg-zinc-600 text-zinc-200">
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
                    src={selectedImage || userImage}
                    width='100'
                    height='100'
                    alt="profile_img"
                    className="rounded-full"
                  />
                  {editMode === true ? (
                    <>
                      <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange}/>
                      <button
                        onClick={handleAvatarClick}
                        title="change avatar"
                        className="transition absolute bottom-0 right-0 w-10 h-10 shadow-md bg-white rounded-full flex justify-center items-center hover:bg-gray-100"
                      >
                        <img src={cameraSvg} alt="change_avatar" className="w-7 h-7" />
                      </button>
                    </>
                  ) : null}
                </article>
            </section>
            <section className="flex flex-row justify-between py-5 px-10 m-auto relative">
              <article className="flex flex-row gap-5">
                <div className="mx-5">
                  <h2 className="text-[#ffac33] font-bold">Nombre</h2>
                  {editMode === false ? (
                    <p className="text-gray-100 font-medium tracking-widest">
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

                  <h2 className="text-[#ffac33] font-bold mt-5">E-MAIL</h2>
                  <p className="text-gray-100 font-medium tracking-widest">
                    {userdata.email}
                  </p>

                  <h2 className="text-[#ffac33] font-bold mt-5">Descripción</h2>
                  {editMode === false ? (
                    <p className="text-gray-100 tracking-widest">
                      {userDEscription}
                    </p>
                  ) : (
                    <TextField defaultValue={userDEscription} id="user-description" onChange={handleData} fullWidth multiline maxRows={4}></TextField>
                  )}
                  

                </div>
                <div className="">
                  <p className="text-gray-900 bg-[#ffac33] font-medium tracking-widest py-1 px-2 rounded">
                    {userdata.role}
                  </p>
                </div>
              </article>
            </section>
            <section className="flex flex-col gap-4 justify-between py-5 px-10 m-auto relative">
              {editMode === true ? (
                  <>
                    <article className="">
                      <form className="flex flex-col gap-3">
                        <TextField label="Facebook" defaultValue={socialFacebook} onChange={handleData} id="social-media-facebook" variant="outlined"></TextField>
                        <TextField label="Instagram" defaultValue={socialInstagram} onChange={handleData} id="social-media-instagram" variant="outlined"></TextField>
                        <TextField label="Twitter" defaultValue={socialTwitter} onChange={handleData} id="social-media-twitter" variant="outlined"></TextField>
                      </form>
                    </article>
                  
                    <div className="flex flex-row gap-4">
                      <Button variant="contained" onClick={saveChanges} title="Guardar Cambios" size="small">Guardar</Button>
                      <Button variant="contained" onClick={cancelChanges} size="small">Cancelar</Button>
                    </div>
                  </>
                ) : <>
                  <article>
                    <Link target="_blank" href={"https://www.facebook.com/" + socialFacebook} underline="hover" color="inherit">
                      <FacebookIcon />
                      <span className="pl-2">{socialFacebook}</span>
                    </Link>
                  </article>
                  <article>
                    <Link target="_blank" href={"https://www.instagram.com/" + socialInstagram} underline="hover" color="inherit">
                      <InstagramIcon />
                      <span className="pl-2">{socialInstagram}</span>
                    </Link>
                  </article>
                  <article>
                    <Link target="_blank" href={"https://twitter.com/" + socialTwitter} underline="hover" color="inherit">
                      <XIcon />
                      <span className="pl-2">{socialTwitter}</span>
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
