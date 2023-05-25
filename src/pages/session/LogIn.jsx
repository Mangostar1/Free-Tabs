import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "utils/api";
import { endpoint } from "utils/urlApi";

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

  const loginHandler = async () => {
    try {
      const response = await api.post(endpoint.login, body);

      const { token } = response.data;

      Cookies.set("jwtToken", token, { sameSite: "none", secure: true });

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
