// Función para establecer una cookie con atributos de seguridad
const setCookie = (name, value, options = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }

  if (options.secure) {
    cookieString += ";secure";
  }

  if (options.httpOnly) {
    cookieString += ";httponly";
  }

  // Agregar el atributo SameSite solo si options.sameSite está definido
  if (options.sameSite) {
    cookieString += `;samesite=${options.sameSite}`;
  }

  // Agregar el atributo SameSite=None y Secure si options.sameSite es "None"
  if (options.sameSite === "None") {
    cookieString += ";samesite=None;secure";
  }

  document.cookie = cookieString;
};

//Funcion para buscar una cookie
const getCookie = (name) => {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? decodeURIComponent(cookieValue.pop()) : "";
};

export { setCookie, getCookie };
