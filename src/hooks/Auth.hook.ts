import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/src/context/UserContext"; // Import the user context

import {
  createUser,
  loginUser,
  updateUser,
  userRoleUpdate,
} from "../services/UserServices/AuthServices";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await createUser(userData),
    onSuccess: (data) => {
      toast.success("User registered successfully", {
        duration: 1000,
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 1000,
        position: "top-center",
      });
    },
  });
};
// login

export const useUserLogin = () => {
  const { setUser } = useUser(); // Import and use setUser

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      setUser(data); // Set the user data in the context after successful login

      toast.success("User logged in successfully", {
        duration: 1000,
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 1000,
        position: "top-center",
      });
    },
  });
};

export const useUserUpdate = (userId: string) => {
  const { setUser } = useUser(); // Import and use setUser
  const queryClient = useQueryClient(); // Get the query client

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_UPDATE", userId],
    mutationFn: async (userData) => await updateUser(userId, userData),
    onSuccess: (data) => {
      setUser(data.data);
      // console.log(data);
      toast.success("User updated successfully", {
        duration: 1000,
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 1000,
        position: "top-center",
      });
    },
  });
};

export const useUpdateUserRole = () => {
  const QueryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["USER_ROLE_UPDATE"],
    mutationFn: async (userId: string) => await userRoleUpdate(userId),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["USERS_LIST"] });
      toast.success("User role updated successfully", {
        duration: 1000,
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 1000,
        position: "top-center",
      });
    },
  });
};
