const BASE_URL = "https://my-backend-expressjs.up.railway.app";
const BASE_URL_TEST = "http://localhost:5001";

export const endpoint = {
  login: `${BASE_URL}/api/login`,
  signUp: `${BASE_URL}/api/signup`,
  logout: `${BASE_URL}/api/logout`,
  sendTab: `${BASE_URL}`,
  loginTest: `${BASE_URL_TEST}/api/login`,
  signUpTest: `${BASE_URL_TEST}/api/signup`,
  logoutTest: `${BASE_URL_TEST}/api/logout`,
  sendTabTest: `${BASE_URL_TEST}`,
};
