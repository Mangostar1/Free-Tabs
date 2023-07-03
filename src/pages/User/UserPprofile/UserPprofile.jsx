import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { endpoint } from "utils/urlApi";

import cameraSvg from "assets/icons/camera.svg";

export default function UserPprofile(props) {
  const [userdata, setUserdata] = useState({
    userName: undefined,
    email: undefined,
    userImage: undefined,
  });
  const [editMode, setEditMode] = useState(false);

  //Cookie
  const jwtToken = Cookies.get("jwtToken");

  const handleAvatar = () => {
    console.log("Hace algo");
  };

  const handleEdit = () => {
    console.log("Edita algo");
  };

  const handleUserData = () => {
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
      });
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <main className="bg-slate-50 flex flex-row justify-between py-14 px-10 mx-auto w-144 relative">
      <button
        onClick={handleEdit}
        className="transition bg-orange-300 px-4 py-2 rounded absolute top-5 right-8 hover:bg-orange-200"
      >
        Edit
      </button>

      <section className="flex flex-col gap-5">
        <div className="">
          <h2 className="text-gray-700 font-bold">USER NAME</h2>
          <p className="text-gray-900 font-medium tracking-widest">
            {userdata.userName || "Some Name"}
          </p>
          <div className="w-full h-0.5 bg-gray-400"></div>
        </div>
        <div className="">
          <h2 className="text-gray-700 font-bold">E-MAIL</h2>
          <p className="text-gray-900 font-medium tracking-widest">
            {userdata.email || "Some E-MAIL"}
          </p>
          <div className="w-full h-0.5 bg-gray-400"></div>
        </div>
      </section>
      <section className="relative">
        <img
          src="https://picsum.photos/200/200"
          alt="profile_img"
          className="rounded-full"
        />
        <button
          onClick={handleAvatar}
          title="change avatar"
          className="transition absolute bottom-0 right-4 w-11 h-11 shadow-md bg-white rounded-full flex justify-center items-center hover:bg-gray-100"
        >
          <img src={cameraSvg} alt="change_avatar" className="w-7 h-7" />
        </button>
      </section>
    </main>
  );
}
