"use client";

import { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileAlt,
  FaUsers,
  FaUserFriends,
  FaCreditCard,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

// Import the components for each tab
import MyPosts from "./Myposts";
import Followers from "./Followers";
import Following from "./Following";
import MakePayments from "./MakePayments";
import Paid from "./Paid";
import Analytics from "./analytics";
import MyPostTable from "./PostTable";

const ModernProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState("myPosts");

  const tabs = [
    {
      key: "myPosts",
      title: "My Posts",
      icon: <FaFileAlt className="text-lg" />,
      component: <MyPostTable />,
      color: "primary",
    },
    {
      key: "followers",
      title: "Followers",
      icon: <FaUsers className="text-lg" />,
      component: <Followers />,
      color: "secondary",
    },
    {
      key: "following",
      title: "Following",
      icon: <FaUserFriends className="text-lg" />,
      component: <Following />,
      color: "success",
    },
    {
      key: "makePayments",
      title: "Payments",
      icon: <FaCreditCard className="text-lg" />,
      component: <MakePayments />,
      color: "warning",
    },
    {
      key: "paid",
      title: "Subscriptions",
      icon: <FaCheckCircle className="text-lg" />,
      component: <Paid />,
      color: "danger",
    },
    {
      key: "analytics",
      title: "Analytics",
      icon: <FaChartLine className="text-lg" />,
      component: <Analytics />,
      color: "default",
    },
  ];

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-8"
    >
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-0 shadow-2xl">
        <CardBody className="p-0">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-6 border-b border-divider bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50",
              cursor: "w-full bg-gradient-to-r from-blue-500 to-purple-500",
              tab: "max-w-fit px-4 py-3 h-12",
              tabContent:
                "group-data-[selected=true]:text-blue-600 dark:group-data-[selected=true]:text-blue-400 font-medium",
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                title={
                  <div className="flex items-center gap-2">
                    {tab.icon}
                    <span>{tab.title}</span>
                  </div>
                }
              >
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab.key}
                      variants={tabVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      {tab.component}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ModernProfileTabs;
