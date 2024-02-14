import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import api from "utils/api";
import { endpoint } from "utils/urlApi";

//Components
import Footer from "component/Footer";

export default function LogIn() {
  const navigate = useNavigate();
  const [body, setBody] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBody((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(endpoint.login, body);
      const { token } = response.data;
      Cookies.set("jwtToken", token, { sameSite: "none", secure: true });
      localStorage.setItem("user_email", body.email);
      navigate("/");
    } catch (error) {
      console.error(error.response.data, "error!!");
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <main className="">
        <section className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <article className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black">Login</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <TextField
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="E-mail"
                    value={body.email}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div className="col-span-full">
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    autoComplete="off"
                    value={body.password}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </div>
            </form>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
