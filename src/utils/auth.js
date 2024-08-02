import {jwtDecode} from "jwt-decode";

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const expirationTime = JSON.parse(localStorage.getItem("expirationTime"));

  if (token && expirationTime) {
    const now = new Date().getTime();
    if (now > expirationTime) {
      removeToken();
      return null;
    }
    return token;
  }

  return null;
};

export const getUserRole = () => {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded?.role;
  }
  return null;
};

export const getUserNewId = () => {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded?.newUserId;
  }
  return null;
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const handleLogoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const setUserToken = (token, expirationTime) => {
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("expirationTime", JSON.stringify(expirationTime));
};

export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  window.location.href = "/login";
};