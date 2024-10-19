/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineBars } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { Divider } from "@nextui-org/divider";
import { usePathname, useRouter } from "next/navigation";

import SidebarSkeleton from "./SidebarSkeleton";
import { AdminLinks } from "./constant";
import { useUser } from "@/src/context/UserContext";
import { logOut } from "@/src/services/UserServices/AuthServices";
import { protectedRoutes } from "@/src/config/Constatns";

const Sidebar = () => {
  const { user, isSetLoading: UserLoading } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (!user) {
      router.push("/auth");
    } else if (user.role !== "admin") {
      router.push("/");
    }

    return () => clearTimeout(timer);
  }, [user, pathname, router]);

  const handleLogOut = () => {
    logOut();
    UserLoading(true);
    if (protectedRoutes.some((route) => route.test(pathname))) {
      router.push("/auth"); // Redirect to login after logging out
    }
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-full relative">
      {/* Mobile Navbar */}
      <div className="bg-gray-100 dark:bg-[#1E293B] w-full text-black dark:text-white flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link href="/">TT</Link>
        </div>
        <button
          className="mobile-menu-button p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <AiOutlineBars className="h-6 w-6 text-black dark:text-white" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        className={`fixed inset-y-0 left-0 top-0 z-50 w-64 transform bg-gray-100 dark:bg-[#1E293B] text-black dark:text-white transition-transform lg:static lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-gray-300 dark:border-gray-700 lg:block`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4">
            <Link href="/">
              <h2 className="text-2xl font-semibold font-sans">
                Tech <span className="text-purple-500">Tips Hub</span>
              </h2>
            </Link>
          </div>

          {/* Divider */}
          <Divider className="my-4 bg-gray-400 dark:bg-gray-600" />

          {/* Sidebar Links */}
          <div className="mt-3 space-y-5 p-2 flex-1">
            {loading ? (
              <SidebarSkeleton />
            ) : (
              AdminLinks.map((link) =>
                link.path ? (
                  <Link
                    key={link.name}
                    className={`flex items-center p-3 rounded-lg transition-colors font-semibold text-lg ${
                      activeLink === link.name
                        ? "bg-purple-600 text-white"
                        : "bg-transparent hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600"
                    }`}
                    href={link.path}
                    onClick={() => handleLinkClick(link.name)}
                  >
                    <link.icon className="mr-3 h-6 w-6" />
                    <span>{link.name}</span>
                  </Link>
                ) : null
              )
            )}
          </div>
        </div>

        {/* Log Out Section */}
        <div className="absolute bottom-6 w-full px-4">
          <Divider className="bg-gray-400 dark:bg-gray-600" />
          <button
            className={`flex items-center justify-center p-3 w-full rounded-lg transition-colors font-semibold text-lg mt-3 ${
              activeLink === "Log Out"
                ? "bg-red-600 text-white"
                : "bg-transparent hover:bg-red-500 hover:text-white"
            }`}
            onClick={handleLogOut}
          >
            <FaSignOutAlt className="mr-2 h-5 w-5" />
            Log Out
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
