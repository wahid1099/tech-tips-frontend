"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCrown, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card } from "@nextui-org/react";

const ModernMembershipBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-2xl border-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 left-4 opacity-20">
                <FaStar className="text-yellow-300 text-2xl animate-pulse" />
              </div>
              <div className="absolute top-8 right-8 opacity-20">
                <FaCrown className="text-yellow-300 text-3xl animate-bounce" />
              </div>
              <div className="absolute bottom-4 left-8 opacity-20">
                <FaStar className="text-yellow-300 text-xl animate-pulse delay-300" />
              </div>
            </div>

            <div className="relative flex items-center justify-between p-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm">
                  <FaCrown className="text-yellow-300 text-xl" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">
                    Unlock Premium Content
                  </h3>
                  <p className="text-white/90 text-sm">
                    Get unlimited access to exclusive tech insights, tutorials,
                    and premium articles for less than
                    <span className="font-bold text-yellow-300 mx-1">
                      $9/month
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  size="md"
                  className="bg-white text-purple-600 font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
                  onClick={() => handleNavigation("/membership")}
                >
                  <FaCrown className="mr-2" />
                  Become Premium
                </Button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  onClick={handleClose}
                >
                  <AiOutlineClose size={18} />
                </motion.button>
              </div>
            </div>

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModernMembershipBanner;
