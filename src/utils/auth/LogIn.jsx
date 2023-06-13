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
    <form className="bg-neutral-50 flex flex-col items-center justify-center gap-4 px-2 py-4 rounded absolute right-4 top-12">
      <input
        type="text"
        name="email"
        placeholder="E-mail"
        value={body.email}
        onChange={handler}
        className="block w-52 px-3 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="off"
        value={body.password}
        onChange={handler}
        className="block w-52 px-3 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      />
      <input
        type="button"
        onClick={loginHandler}
        name="send"
        className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-orange-400 border-2 border-orange-400 rounded-full inline-flex hover:bg-orange-200 hover:border-orange-400 hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
        value="Login"
      />
    </form>
  );
}
