"use client";
import { useUser } from "@/src/context/UserContext";
import { FaCheckCircle } from "react-icons/fa";
import { Avatar, Button, Card, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

const ProfileHeader = () => {
  const { user, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  return (
    <Card className="p-6 pt-8 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Profile Image with Badge */}
          <Avatar
            src={
              user?.profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
            }
            size="lg"
            alt="Profile Image"
            className="border-4 border-gray-300 dark:border-gray-700"
          />

          <div>
            <h1 className="text-2xl font-bold dark:text-white flex items-center">
              {user?.name}
              {user?.isVerified && (
                <FaCheckCircle className="text-blue-500 text-xl ml-2" />
              )}
            </h1>
            <p className="text-gray-500">
              {user?.profession || "No profession"}
            </p>

            {/* User bio */}
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              {user?.bio || "No Bio"}
            </p>
            <div className="flex space-x-4 mt-2">
              <span className="text-gray-700 dark:text-gray-300">
                {user?.followers?.length || 0} Followers
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {user?.following?.length || 0} Following
              </span>
            </div>
          </div>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>Edit Profile</Button>
      </div>

      {/* Profile Update Modal */}
      {isModalOpen && (
        <ProfileUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default ProfileHeader;
