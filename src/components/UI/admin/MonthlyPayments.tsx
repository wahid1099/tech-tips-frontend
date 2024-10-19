"use client";
import React from "react";
import { useGetAllPayment } from "@/src/hooks/payment.hooks";
import MonthlyPaymentsChart from "./MonthlyPaymentsChart";

const MonthlyPayments: React.FC = () => {
  const {
    data: paymentData,
    isLoading: isLoadingPayments,
    error: paymentsError,
  } = useGetAllPayment();

  if (isLoadingPayments) {
    return <div>Loading payments...</div>;
  }

  if (paymentsError) {
    return <div>Error loading payments: {paymentsError.message}</div>;
  }

  const monthlyLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyPayments = Array(12).fill(0);

  paymentData.data.forEach((payment: any) => {
    const month = new Date(payment.createdAt).getMonth(); // Get month index (0-11)
    const price = payment.packagePrice || 0; // Get the package price
    if (month >= 0 && month < 12) {
      monthlyPayments[month] += price; // Add the price to the corresponding month
    }
  });

  return (
    <div className="p-6 dark:bg-gray-900 bg-white min-h-screen">
      <h2 className="text-xl font-bold">Monthly Payments Chart</h2>
      <MonthlyPaymentsChart
        labels={monthlyLabels}
        monthlyPayments={monthlyPayments}
      />
    </div>
  );
};

export default MonthlyPayments;
