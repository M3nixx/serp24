import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true // wichtig: Cookies werden mitgesendet
});

// CSRF-Token automatisch anhängen
axiosInstance.interceptors.request.use(config => {
  const token = getCsrfTokenFromCookie();
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

function getCsrfTokenFromCookie() {
  const matches = document.cookie.match(new RegExp('XSRF-TOKEN=([^;]+)'));
  return matches ? decodeURIComponent(matches[1]) : null;
}
