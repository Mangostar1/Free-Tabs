import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setCookie, getCookie } from "utils/cookieUtils";

export default function LogIn() {
  const navigate = useNavigate();
  const [body, setBody] = useState({ email: "", password: "" });

  const handler = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  axios.interceptors.request.use(
    (config) => {
      const token = getCookie("jwtToken");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const loginHandler = async () => {
    try {
      //<-- For dev http://localhost:5001/api/login
      //<-- For prod https://my-backend-expressjs.up.railway.app/api/login
      await axios.post(
        "https://my-backend-expressjs.up.railway.app/api/login",
        body
      );

      setCookie("jwtToken", "valor-de-la-cookie", {
        sameSite: "None",
        secure: true,
      });

      navigate("/user/profile");
    } catch (error) {
      console.error(error.response.data, "error!!");
    }
  };

  return (
    <main className="flex justify-center items-center bg-slate-50 min-h-screen">
      <form className="bg-slate-200 flex flex-col items-center justify-center gap-4 w-80 h-56 rounded">
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={body.email}
          onChange={handler}
          className="bg-slate-100 w-64 h-8"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={body.password}
          onChange={handler}
          className="bg-slate-100 w-64 h-8"
        />
        <input
          type="button"
          onClick={loginHandler}
          name="send"
          className="
                        bg-orange-200 
                        w-64 
                        px-4 py-2 
                        mt-2 
                        rounded 
                        ease-out duration-500 
                        text-xl 
                        hover:bg-orange-600 hover:text-gray-100
                    "
          value="Login"
        />
      </form>
    </main>
  );
}
