import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//URLs from API
import { endpoint } from "utils/urlApi";

//Loader
import Loader from "component/Loader";

export default function SignUp() {
  const navigate = useNavigate();

  const [body, setBody] = useState({ email: "", password: "" });
  const [isEqual, setIsEqual] = useState(false); //<-- If both fields are equal, validate to true
  const [isLoading, setIsLoading] = useState(false);

  const valid = /^[a-zA-Z0-9_@.-]{6,}$/;

  const handler = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });

    if (valid.test(body.password)) {
      console.log("La contraseña debe tener un minimo de 6 caracteres");
    }
  };

  const handleEqual = ({ target }) => {
    if (target.value === body.password) {
      setIsEqual(true);
    }

    if (target.value !== body.password) {
      console.log("Las contraseñas deben coincidir");
    }
  };

  const signup = async () => {
    if (isEqual === true) {
      setIsLoading(true);
      axios
        .post(endpoint.signUp, body)
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
          }
        })
        .catch(({ response }) => {
          console.error(response.data, response.message, "error!!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <main>
      <section className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
        <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="text-4xl text-black">Let's get started!</h2>
            </div>
          </div>
          <form>
            <div className="col-span-full">
              <label className="block mb-3 text-sm font-medium text-gray-600">
                E-mail
              </label>
              <input
                className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Email"
                type="email"
                name="email"
                value={body.email}
                onChange={handler}
              />
            </div>
            <div className="mt-4 space-y-6">
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="******"
                  autoComplete="off"
                  type="password"
                  name="password"
                  value={body.password}
                  onChange={handler}
                />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-sm font-medium text-gray-600">
                  Confirm password
                </label>
                <input
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="******"
                  autoComplete="off"
                  type="password"
                  onChange={handleEqual}
                />
              </div>

              <div className="col-span-full">
                <input
                  className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-orange-400 border-2 border-orange-400 rounded-full inline-flex hover:bg-transparent hover:border-orange-400 hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  onClick={signup}
                  type="button"
                  value="Sign-up"
                />
              </div>
            </div>
          </form>
          {isLoading === true ? <Loader /> : null}
        </div>
      </section>
    </main>
  );
}
