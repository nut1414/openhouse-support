import axios from "axios";

const fetch = axios.create({
  baseURL: process.env.BACKEND_URL,
});

fetch.interceptors.request.use(config => {
  config.headers['access-token'] = localStorage.getItem("user");
  config.headers['API-KEY'] = process.env.VITE_API_KEY;
  return config;
});

export default fetch;
