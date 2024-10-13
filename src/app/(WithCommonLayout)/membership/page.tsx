"use client";

import Link from "next/link";

import PremiumMonthlyMember from "@/src/components/UI/MemberShip/premiumpackages";

export default function Page() {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-semibold pt-8">
          Unlock premium content and enjoy unlimited access to{" "}
          <span className="text-pink-500">Tech & Tips Hub</span> today.
        </h1>
      </div>

      {/* Payment options */}
      <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {plans.map((plan, index) => (
          <PremiumMonthlyMember key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}

const plans = [
  {
    title: "Free Plan",

    price: "00",
    description:
      "Access member-only stories and enjoy an enhanced reading and writing experience. Cancel anytime.",
    benefits: [
      "✓ Read member-only stories",
      "✓ Support writers you read most",
      "✓ Earn money for your writing",
      "✓ Listen to audio narrations",
      "✓ Access our Mastodon community",
    ],
  },
  {
    title: "Platinum",
    expiry: "1 Week",
    price: "299",
    description:
      "Contribute more to writers and strengthen your support for the community. Cancel anytime.",
    benefits: [
      "✓ All Medium member benefits",
      "✓ Give 4x more to the writers ",
      "✓ Share member-only stories ",
      "✓ Customize app icon",
      "✓ Customize app icon",
    ],
  },
  {
    title: "Gold",
    expiry: "1 Month",
    price: "399",
    description:
      "Get exclusive access to premium content and personalized recommendations. Cancel anytime.",
    benefits: [
      "✓ All Friend plan benefits",
      "✓ Access to VIP events",
      "✓ One-on-one support",
      "✓ Premium content tailored for you",
      "✓ Priority customer service",
    ],
  },
];
