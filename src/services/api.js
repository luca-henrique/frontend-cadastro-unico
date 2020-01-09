import axios from "axios";
import store from "../store/index";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333"
});

api.interceptors.request.use(config => {
  const { token } = store.getState().auth;
  const headers = { ...config.headers };
  console.log(headers);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;
