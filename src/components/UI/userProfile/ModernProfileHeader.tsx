"use client";
import { useUser } from "@/src/context/UserContext";
import {
  FaCheckCircle,
  FaEdit,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Skeleton,
  Chip,
} from "@nextui-org/react";
import { useState } from "react";
import { motion } from "framer-motion";
import ProfileUpdateModal from "./ProfileUpdateModal";

const ModernProfileHeader = () => {
  const { user, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-2xl">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 space-y-4 text-center md:text-left">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-96" />
              <div className="flex gap-4 justify-center md:justify-start">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "Unknown";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-24 -translate-x-24" />

        <CardBody className="relative p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <Avatar
                  src={
                    user?.profileImage ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
                  }
                  alt="Profile Image"
                  className="w-32 h-32 ring-4 ring-white/50 dark:ring-gray-700/50 shadow-2xl"
                />
                {user?.isVerified && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                    <FaCheckCircle className="text-white text-lg" />
                  </div>
                )}
                {user?.payments && user.payments.length > 0 && (
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                    <HiSparkles className="text-white text-lg" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Profile Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 text-center md:text-left"
            >
              <div className="mb-4">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {user?.name || "Anonymous User"}
                  </h1>
                  {user?.isVerified && (
                    <Chip color="primary" variant="flat" size="sm">
                      Verified
                    </Chip>
                  )}
                  {user?.payments && user.payments.length > 0 && (
                    <Chip color="warning" variant="flat" size="sm">
                      Premium
                    </Chip>
                  )}
                </div>

                {user?.profession && (
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {user.profession}
                  </p>
                )}

                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {user?.address && (
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt />
                      <span>{user.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    <span>Joined {joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {user?.bio && (
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
                  {user.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-8 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {user?.followers?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Followers
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {user?.following?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Following
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Posts
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                <Button
                  color="primary"
                  variant="solid"
                  startContent={<FaEdit />}
                  onClick={() => setIsModalOpen(true)}
                  className="font-medium"
                >
                  Edit Profile
                </Button>

                <Button
                  color="default"
                  variant="bordered"
                  startContent={<FaUserFriends />}
                  className="font-medium"
                >
                  Share Profile
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Achievement Badges */}
          {(user?.isVerified ||
            (user?.payments && user.payments.length > 0)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Achievements
              </h3>
              <div className="flex flex-wrap gap-3">
                {user?.isVerified && (
                  <Chip
                    color="primary"
                    variant="flat"
                    startContent={<FaCheckCircle />}
                  >
                    Verified Member
                  </Chip>
                )}
                {user?.payments && user.payments.length > 0 && (
                  <Chip
                    color="warning"
                    variant="flat"
                    startContent={<HiSparkles />}
                  >
                    Premium Subscriber
                  </Chip>
                )}
                <Chip color="success" variant="flat">
                  Active Community Member
                </Chip>
              </div>
            </motion.div>
          )}
        </CardBody>
      </Card>

      {/* Profile Update Modal */}
      {isModalOpen && (
        <ProfileUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default ModernProfileHeader;
