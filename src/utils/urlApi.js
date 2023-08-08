const BASE_URL = "https://free-tab-backend.onrender.com/";
const BASE_URL_TEST = "http://localhost:5001";

export const endpoint = {
  prodAPI: BASE_URL,
  login: `${BASE_URL}/api/login`,
  signUp: `${BASE_URL}/api/signup`,
  logout: `${BASE_URL}/api/logout`,
  sendUserTab: `${BASE_URL}/api/new-tab`,
  updateUserTab: (id) => `${BASE_URL}/api/user-tab/${id}/update`,
  getUserTab: `${BASE_URL}/api/user-tab`,
  userInfo: `${BASE_URL}/user-data`,
  userInfoPut: `${BASE_URL}/user-data-update`,
};

/* export const endpoint = {
  localAPI: BASE_URL_TEST,
  login: `${BASE_URL_TEST}/api/login`,
  signUp: `${BASE_URL_TEST}/api/signup`,
  logout: `${BASE_URL_TEST}/api/logout`,
  sendUserTab: `${BASE_URL_TEST}/api/new-tab`,
  updateUserTab: (id) => `${BASE_URL_TEST}/api/user-tab/${id}/update`,
  getUserTab: `${BASE_URL_TEST}/api/user-tab`,
  userInfo: `${BASE_URL_TEST}/user-data`,
  userInfoPut: `${BASE_URL_TEST}/user-data-update`,
}; */

/*

used on:
  *Login.jsx line 21 on src/utils/Login.jsx
  *SignUp.jsx line 46 on src/utils/SignUp.jsx
  *LoginBtn.jsx line 19 on src/utils/LoginBtn.jsx
  *UserPprofile.jsx line x on src/pages/User/UserPprofile.jsx

*/
