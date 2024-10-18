"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";

import axiosInstance from "@/src/services/Axios/AxiosInstences";

export const createUser = async (userData: FieldValues) => {
  try {
    const res = await axiosInstance.post("/user/create-user", userData);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to create user");
  }
};

// login user
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/sign-in", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to login user");
  }
};

// logout user
export const logOut = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken) {
    try {
      const { data } = await axiosInstance.get("/user/get-me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || "Failed to fetch user");
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || "Failed to fetch user");
    }
  }

  return null;
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Failed to refresh token");
  }
};

export const updateUser = async (userId: string, userData: FieldValues) => {
  try {
    const res = await axiosInstance.put(
      `/user/update-user/${userId}`,
      userData
    );

    return res.data;
  } catch (error: any) {
    // Check if there's a response object to get a more specific error message
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to update user");
    }
    throw new Error(error.message || "Failed to update user");
  }
};

export const userRoleUpdate = async (userId: string) => {
  try {
    const res = await axiosInstance.put(`/auth/toggole-user-role/${userId}`);

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response.data.message || "Failed to update user role"
    );
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string,
  email: string
): Promise<any> => {
  try {
    const payload = {
      email,
      newPassword,
    };

    const res = await axiosInstance.post("/auth/reset-password", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to reset user password"
    );
  }
};

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const payload = {
      email,
    };

    // Call the forgot-password API endpoint to send the reset link
    const res = await axiosInstance.post("/auth/forgot-password", payload);

    return res.data; // Expect this to return a success message
  } catch (error: any) {
    // Handle any errors from the API
    throw new Error(
      error.response?.data?.message || "Failed to send password reset email"
    );
  }
};
