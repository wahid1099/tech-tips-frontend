"use client";
import ProfileHeader from "@/src/components/UI/userProfile/ProfileHeader";
import UserProfileTabs from "@/src/components/UI/userProfile/userdashboardtab";
import { Navbar } from "@/src/components/Navbar/navbar";
const ProfilePage = () => {
  return (
    <div className="container mx-auto ">
      <Navbar />
      <br />
      <br />
      <div className="container mx-auto p-8">
        <ProfileHeader />
        <UserProfileTabs />
      </div>
    </div>
  );
};

export default ProfilePage;
