"use client";
import ModernProfileHeader from "@/src/components/UI/userProfile/ModernProfileHeader";
import ModernProfileTabs from "@/src/components/UI/userProfile/ModernProfileTabs";
import { Navbar } from "@/src/components/Navbar/navbar";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 pt-20">
        <ModernProfileHeader />
        <ModernProfileTabs />
      </div>
    </div>
  );
};

export default ProfilePage;
