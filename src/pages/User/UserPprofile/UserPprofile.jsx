import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { endpoint } from "utils/urlApi";
import Swal from "sweetalert2";

//Material UI
import { TextField, Button, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

//SVG
import cameraSvg from "assets/icons/camera.svg";

//Components
import Footer from "component/Footer";
import Loader from "component/Loader";
import AvatarSelectorModal from "./component/AvatarSelectorModal";

//Image
import userImage from "assets/imgs/user-profile-default.png";
import avatar1 from 'assets/imgs/avatar/avatar1.png';
import avatar2 from 'assets/imgs/avatar/avatar2.png';
import avatar3 from 'assets/imgs/avatar/avatar3.png';
import avatar4 from 'assets/imgs/avatar/avatar4.png';

const avatarOptions = [
  { id: 'avatar1.png', src: avatar1 },
  { id: 'avatar2.png', src: avatar2 },
  { id: 'avatar3.png', src: avatar3 },
  { id: 'avatar4.png', src: avatar4 },
  { id: 'default.png', src: userImage }
];

export default function UserProfile(props) {
  //States
  const [avatar, setAvatar] = useState(undefined); // Default avatar
  const [avatarId, setAvatarId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [socialFacebook, setSocialFacebook] = useState(undefined);
  const [socialInstagram, setSocialInstagram] = useState(undefined);
  const [socialTwitter, setSocialTwitter] = useState(undefined);
  const [userDEscription, setUserDescription] = useState(undefined);
  const [userdata, setUserdata] = useState({
    userName: undefined,
    email: undefined,
    userImage: avatar,
  });

  //Cookie
  const jwtToken = Cookies.get("jwtToken");

  //Functions
  const handler = ({ target }) => {
    const { name, value } = target;
    setUserdata({ ...userdata, [name]: value });
  };

  const handleData = ({ target }) => {
    const { id, value } = target;

    if (id === "user-description") {
      setUserDescription(value);
    }

    if (id === "social-media-facebook") {
      setSocialFacebook(value);
    }

    if (id === "social-media-instagram") {
      setSocialInstagram(value);
    }

    if (id === "social-media-twitter") {
      setSocialTwitter(value);
    }
  };

  const handleAvatarClick = () => {
    setModalOpen(true); // Abrir el modal para seleccionar avatar
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

          let avatarSrc = null;

          for (let index = 0; index < avatarOptions.length; index++) {

            if (response.data.photoURL === avatarOptions[index].id) {
              avatarSrc = avatarOptions[index].src;
              break;
            }
            
          }

          setUserdata({
            userName: response.data.displayName,
            email: response.data.email,
            userImage: avatarSrc,
            role: response.data.userRole,
          });

          setAvatar(avatarSrc);
          setAvatarId(response.data.photoURL);

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
      .put(endpoint.userInfoPut, {
        userdata: userdata,
        userFacebook: socialFacebook,
        userInstagram: socialInstagram,
        userTwitter: socialTwitter,
        userDescription: userDEscription,
        userImage: avatarId,
      })
      .then((response) => {
        if (response.status === 200) {
          setUserdata({
            ...userdata,
            userName: response.data.user_name,
            userImage: response.data.user_image
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
            timer: 1500,
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
                <Button variant="contained" onClick={handleEdit} size="small">
                  Editar
                </Button>
              </article>
              <article className="relative">
                <img
                  src={avatar}
                  width="100"
                  height="100"
                  alt="profile_img"
                  className="rounded-full"
                />
                {editMode === true ? (
                  <>
                    <button
                      onClick={handleAvatarClick}
                      title="change avatar"
                      className="transition absolute bottom-0 right-0 w-10 h-10 shadow-md bg-white rounded-full flex justify-center items-center hover:bg-gray-100"
                    >
                      <img
                        src={cameraSvg}
                        alt="change_avatar"
                        className="w-7 h-7"
                      />
                    </button>
                  </>
                ) : null}
              </article>
            </section>
            <section className="flex flex-row justify-between py-5 px-10 m-auto relative">
              <article className="flex flex-row gap-5">
                <div className="w-28">
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
                      className="w-full tracking-widest text-black"
                      onChange={handler}
                    />
                  )}

                  {editMode === false ? null : (
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
                    <TextField
                      defaultValue={userDEscription}
                      id="user-description"
                      onChange={handleData}
                      fullWidth
                      multiline
                      maxRows={4}
                    ></TextField>
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
                      <TextField
                        label="Facebook"
                        defaultValue={socialFacebook}
                        onChange={handleData}
                        id="social-media-facebook"
                        variant="outlined"
                        placeholder="TEST"
                      ></TextField>
                      <TextField
                        label="Instagram"
                        defaultValue={socialInstagram}
                        onChange={handleData}
                        id="social-media-instagram"
                        variant="outlined"
                        placeholder="TEST"
                      ></TextField>
                      <TextField
                        label="Twitter"
                        defaultValue={socialTwitter}
                        onChange={handleData}
                        id="social-media-twitter"
                        variant="outlined"
                        placeholder="TEST"
                      ></TextField>
                    </form>
                  </article>

                  <div className="flex flex-row gap-4">
                    <Button
                      variant="contained"
                      onClick={saveChanges}
                      title="Guardar Cambios"
                      size="small"
                    >
                      Guardar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={cancelChanges}
                      size="small"
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <article>
                    <Link
                      target="_blank"
                      href={socialFacebook}
                      underline="hover"
                      color="inherit"
                    >
                      <FacebookIcon />
                      <span className="pl-2">{socialFacebook}</span>
                    </Link>
                  </article>
                  <article>
                    <Link
                      target="_blank"
                      href={socialInstagram}
                      underline="hover"
                      color="inherit"
                    >
                      <InstagramIcon />
                      <span className="pl-2">{socialInstagram}</span>
                    </Link>
                  </article>
                  <article>
                    <Link
                      target="_blank"
                      href={socialTwitter}
                      underline="hover"
                      color="inherit"
                    >
                      <XIcon />
                      <span className="pl-2">{socialTwitter}</span>
                    </Link>
                  </article>
                </>
              )}
            </section>
          </>
        )}
        <AvatarSelectorModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          currentAvatar={userdata.userImage}
          onSave={
            (selectedAvatarId) => {
              setAvatar(avatarOptions.find(avatar => avatar.id === selectedAvatarId).src);
              setAvatarId(avatarOptions.find(avatar => avatar.id === selectedAvatarId).id);
              setModalOpen(false);
            }
          }
        />
      </main>
      <Footer />
    </>
  );
}
