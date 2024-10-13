"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const MemberShip = () => {
  const [isVisible, setIsVisible] = useState(true);

  const router = useRouter();

  // Function to handle closing the banner
  const handleClose = () => {
    setIsVisible(false);
  };

  // If the banner is not visible, don't render anything
  if (!isVisible) return null;

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className="flex items-center justify-between  p-4 bg-[#F9F9F9] dark:bg-gray-900 dark:text-white shadow-md">
      {/* Banner content */}
      <div className="flex items-center space-x-2 mx-auto">
        <span className="text-yellow-500">✨</span> {/* Yellow sparkle icon */}
        <p className="text-sm text-pink-500  dark:text-white  text-center">
          Get unlimited access to the best of Tech News for less than $9/month.{" "}
          <button
            className="underline text-black font-semibold hover:text-pink-500 transition-colors dark:text-white"
            onClick={() => handleNavigation("/membership")}
          >
            Become <span className="text-pink-500">a member</span>
          </button>
        </p>
      </div>

      {/* Close button */}
      <button className="text-gray-500 hover:text-black" onClick={handleClose}>
        <AiOutlineClose size={18} />
      </button>
    </div>
  );
};

export default MemberShip;
