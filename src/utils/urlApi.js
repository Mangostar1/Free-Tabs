const BASE_URL = "https://my-backend-expressjs.up.railway.app";
const BASE_URL_TEST = "http://localhost:5001";

export const endpoint = {
  prodAPI: "https://my-backend-expressjs.up.railway.app/",
  localAPI: "http://localhost:5001",
  login: `${BASE_URL}/api/login`,
  signUp: `${BASE_URL}/api/signup`,
  logout: `${BASE_URL}/api/logout`,
  sendTab: `${BASE_URL}`,
  userInfo: `${BASE_URL}/user-data`,
  loginTest: `${BASE_URL_TEST}/api/login`,
  signUpTest: `${BASE_URL_TEST}/api/signup`,
  logoutTest: `${BASE_URL_TEST}/api/logout`,
  sendTabTest: `${BASE_URL_TEST}`,
  userInfoTest: `${BASE_URL_TEST}/user-data`,
};

/*

used on:
  Login.jsx line 21 on src/utils/Login.jsx
  SignUp.jsx line 46 on src/utils/SignUp.jsx
  LoginBtn.jsx line 19 on src/utils/LoginBtn.jsx

*/
