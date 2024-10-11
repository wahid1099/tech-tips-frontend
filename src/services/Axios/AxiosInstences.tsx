import axios from "axios";
import { cookies } from "next/headers"; // Server-side
import { envConfig } from "@/src/config/index";
import { getNewAccessToken } from "@/src/services/UserServices/AuthServices";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

// Function to get token depending on environment
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    // Client-side
    return localStorage.getItem("accessToken");
  } else {
    // Server-side (Next.js API routes, server components)
    const cookieStore = cookies();
    return cookieStore.get("accessToken")?.value;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { config } = error;

    if (error.response?.status === 401 && !config?.sent) {
      config.sent = true;
      try {
        const res = await getNewAccessToken();
        const accessToken = res.data.accessToken;

        // Store the new token depending on environment
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
        } else {
          cookies().set("accessToken", accessToken);
        }

        // Update the request with the new token
        config.headers["Authorization"] = `Bearer ${accessToken}`;

        return axiosInstance(config);
      } catch (refreshError: any) {
        throw new Error(
          refreshError.response?.data?.message || "Failed to refresh token"
        );
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
