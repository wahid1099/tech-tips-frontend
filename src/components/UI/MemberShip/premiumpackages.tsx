"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@/src/context/UserContext";
import { usePayment } from "@/src/hooks/payment.hooks";

interface PremiumPlan {
  title: string;
  expiry?: string;
  price: string;
  description: string;
  benefits: string[];
}

const PremiumPackages = ({ plan }: { plan: PremiumPlan }) => {
  const { user } = useUser();

  const defaultProfileImage = "https://i.ibb.co/hBpV37F/avater.png";
  const { mutate: createPayment } = usePayment();

  const handleCreatePayment = (plan: PremiumPlan) => {
    const premiumPlanData = {
      user: user?._id,
      price: plan.price,
      title: plan.title,
      expiry: plan?.expiry || "",
    };

    createPayment(premiumPlanData);
  };

  return (
    <div className="border p-6 rounded-lg flex flex-col mb-4 bg-white dark:bg-gray-800 transition-colors grid grid-cols-3 md:grid-cols-1 gap-4">
      <div className="text-center mb-4 flex-grow">
        <h2 className="text-xl font-semibold text-teal-500 dark:text-teal-400">
          {plan.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {plan.price} $
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {plan.description}
        </p>
        <p className="mt-2 text-gray-400 dark:text-gray-500">{plan.expiry}</p>

        {user ? (
          <button
            className="mt-4 bg-transparent text-black-500 dark:text-teal-400 border border-primary-500 dark:border-teal-400 px-6 py-2 rounded-full hover:bg-primary-500 hover:text-white dark:hover:bg-teal-400 dark:hover:text-gray-900 transition-colors"
            onClick={() => handleCreatePayment(plan)}
          >
            Buy Membership
          </button>
        ) : (
          <Link
            className="mt-4 block bg-transparent text-teal-500 dark:text-teal-400 border border-teal-500 dark:border-teal-400 px-6 py-2 rounded-full hover:bg-teal-500 hover:text-white dark:hover:bg-teal-400 dark:hover:text-gray-900 transition-colors"
            href={"/auth?redirect=become-member"}
          >
            Select
          </Link>
        )}
      </div>

      <ul className="space-y-2">
        {plan?.benefits?.map((benefit, benefitIndex) => (
          <li
            key={benefitIndex}
            className="flex items-center text-teal-500 dark:text-teal-400"
          >
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PremiumPackages;
