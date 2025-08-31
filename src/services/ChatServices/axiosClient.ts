import axios from "axios";
import { envConfig } from "@/src/config/index";

// Create client-side Axios instance for chat services
const chatAxiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

// Function to get token from localStorage (client-side only)
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

// Request interceptor
chatAxiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token expiration
chatAxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { config } = error;

    if (error.response?.status === 401 && !config?.sent) {
      config.sent = true;
      // For now, just redirect to login or handle as needed
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default chatAxiosInstance;
