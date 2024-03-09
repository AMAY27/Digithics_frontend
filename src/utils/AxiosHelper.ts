import axios, { AxiosError } from "axios";
import { BASE_SERVER_URL } from "./constatnt";

let redirectCallback: (() => void) | null = null;

const api = axios.create({
  baseURL: BASE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      redirectCallback && redirectCallback();
      throw new Error(error.message);
    }
    return Promise.reject(error);
  }
);

export const setRedirectCallback = (callback: (() => void) | null) => {
  redirectCallback = callback;
};

export default api;
