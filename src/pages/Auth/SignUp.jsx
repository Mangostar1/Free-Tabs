import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

//Language
import translations from "../../i18n/es/translation.json";

//Material UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//URLs from API
import { endpoint } from "utils/urlApi";

//Components
import Footer from "component/Footer";
import Loader from "component/Loader";

export default function SignUp() {
  const navigate = useNavigate();

  const [body, setBody] = useState({ userName: "", email: "", password: "" });
  const [isEqual, setIsEqual] = useState(false); //<-- If both fields are equal, validate to true
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const valid = /^[a-zA-Z0-9_@.-]{6,}$/;

  const handler = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });


    if (name === 'password' && !valid.test(body.password)) {
      console.log("La contraseña debe tener un minimo de 6 caracteres");
      setPasswordValid(false);
    }

    if (name === 'password' && valid.test(body.password)) {
      console.log("La contraseña contiene los 6 caracteres");
      setPasswordValid(true);
    }
  };

  const handleEqual = ({ target }) => {
    if (target.value === body.password) {
      setIsEqual(true);
    }

    if (target.value !== body.password) {
      console.log("Las contraseñas deben coincidir");
      setIsEqual(false);
    }
  };

  const signup = async () => {
    if (isEqual === true && passwordValid === true) {//<-- Las contraseñas deven coincidir y debe cumplir con el parametror equerido en la expresion regular
      setIsLoading(true);
      axios
        .post(endpoint.signUp, body)
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              navigate("/login");
            })
          }
        })
        .catch(({ response }) => {
          console.error(response.data, response.message, "error!!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    
    if (isEqual === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
    }
    
    if (passwordValid === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseñas no es valida",
      });
    }
  };

  return (
    <>
      <main className="bg-zinc-600 text-zinc-300">
        <section className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-orange-400">¡Empecemos!</h2>
              </div>
            </div>
            <form>
              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <TextField
                    type="text"
                    name="userName"
                    label="Tu Nombre"
                    placeholder="Tu Nombre"
                    value={body.userName}
                    onChange={handler}
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div className="col-span-full">
                  <TextField
                      type="text"
                      name="email"
                      label="Email"
                      placeholder="E-mail"
                      value={body.email}
                      onChange={handler}
                      fullWidth
                      variant="standard"
                    />
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="******"
                    autoComplete="off"
                    value={body.password}
                    onChange={handler}
                    fullWidth
                    variant="standard"
                  />
                </div>
                <div className="col-span-full">
                  <TextField
                    type="password"
                    label="Password"
                    placeholder="******"
                    autoComplete="off"
                    onChange={handleEqual}
                    fullWidth
                    variant="standard"
                  />
                </div>

                <div className="col-span-full">
                  <Button
                    type="button"
                    onClick={signup}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {translations.nav.sign_up}
                  </Button>
                </div>
              </div>
            </form>
            {isLoading === true ? <Loader /> : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
