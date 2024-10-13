"use server";
import axiosInstance from "@/src/services/Axios/AxiosInstences";

interface PaymentData {
  user: string | undefined;
  price: string;
  title: string;
  expiry: string;
}

export const paymentMethod = async (data: PaymentData) => {
  try {
    const response = await axiosInstance.post(`/payment/create-payment`, data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllPayment = async () => {
  try {
    const response = await axiosInstance.get(`/payment/get-all`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.res.data.message);
  }
};

export const getSinglePayment = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/payment/get-single/${id}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.res.data.message);
  }
};
