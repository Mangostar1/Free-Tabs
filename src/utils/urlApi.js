const BASE_URL = "https://free-tab-backend-production.up.railway.app";
const BASE_URL_TEST = "http://localhost:5001";

export const endpoint = {
  prodAPI: BASE_URL,
  login: `${BASE_URL}/auth/login`,
  signUp: `${BASE_URL}/auth/signup`,
  logout: `${BASE_URL}/auth/logout`,
  sendUserTab: `${BASE_URL}/tab/new-tab`,
  updateUserTab: (id) => `${BASE_URL}/tab/user-tab/${id}/update`,
  getUserTab: `${BASE_URL}/tab/user-tab`,
  userInfo: `${BASE_URL}/user-data`,
  userInfoPut: `${BASE_URL}/user-data-update`,
  deleteTab: `${BASE_URL}/tab/user-tab-delete`,
};


/* export const endpoint = {
  localAPI: BASE_URL_TEST,
  login: `${BASE_URL_TEST}/auth/login`,
  signUp: `${BASE_URL_TEST}/auth/signup`,
  logout: `${BASE_URL_TEST}/auth/logout`,
  sendUserTab: `${BASE_URL_TEST}/tab/new-tab`,
  updateUserTab: (id) => `${BASE_URL_TEST}/tab/user-tab/${id}/update`,
  getUserTab: `${BASE_URL_TEST}/tab/user-tab`,
  userInfo: `${BASE_URL_TEST}/user-data`,
  userInfoPut: `${BASE_URL_TEST}/user-data-update`,
  deleteTab: `${BASE_URL_TEST}/tab/user-tab-delete`,
}; */

/*

used on:
  *Login.jsx line 21 on src/utils/Login.jsx
  *SignUp.jsx line 46 on src/utils/SignUp.jsx
  *LoginBtn.jsx line 19 on src/utils/LoginBtn.jsx
  *UserPprofile.jsx line x on src/pages/User/UserPprofile.jsx

*/
