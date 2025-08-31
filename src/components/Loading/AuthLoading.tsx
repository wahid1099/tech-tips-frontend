"use client";

import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";

const AuthLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-4"
      >
        <Spinner size="lg" color="primary" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Signing you in...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please wait a moment
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AuthLoading;
