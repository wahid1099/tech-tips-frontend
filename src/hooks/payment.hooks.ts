import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getAllPayment,
  getSinglePayment,
  paymentMethod,
} from "@/src/services/PaymentServices/PaymentServices";

// interface PaymentData {
//   user: string | undefined;
//   price: string;
//   title: string;
//   expiry: string;
// }
interface PremiumPlanData {
  user: string | undefined;
  price: string;
  title: string;
  expiry: string;
}

export const usePayment = () => {
  return useMutation({
    mutationKey: ["payment"],
    mutationFn: async (data: PremiumPlanData) => {
      return await paymentMethod(data);
    },
    onSuccess: (data) => {
      if (data?.success) {
        window.location.href = data?.data?.payment_url;
      }
    },
    onError: () => {
      toast.error("Failed to process payment!");
    },
  });
};

export const useGetAllPayment = () => {
  return useQuery({
    queryKey: ["all-payment"],
    queryFn: async () => await getAllPayment(),
  });
};

export const useGetSinglePayment = (id: string) => {
  return useQuery({
    queryKey: ["single-payment", id],
    queryFn: async () => {
      const response = await getSinglePayment(id);

      if (!response.data) {
        throw new Error("Payment data not found");
      }

      return response.data;
    },
  });
};
