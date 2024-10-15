"use client";

import { useState } from "react";
import { Tabs, Tab, Button, Card } from "@nextui-org/react";

// Import the components for each tab
import MyPosts from "./Myposts";
import Followers from "./Followers";
import Following from "./Following";
import MakePayments from "./MakePayments";
import Paid from "./Paid";
import Analytics from "./analytics";
import { Skeleton } from "@nextui-org/react";
import MyPostTable from "./PostTable";

const UserProfileTabs = () => {
  return (
    <div className="pt-10">
      <Card className="p-4 dark:bg-gray-900">
        <Tabs variant="underlined" aria-label="Profile Tabs">
          <Tab key="myPosts" title="My Posts">
            <div className="p-4">
              <MyPostTable />
            </div>
          </Tab>

          <Tab key="followers" title="Followers">
            <div className="p-4">
              <Followers />
            </div>
          </Tab>

          <Tab key="following" title="Following">
            <div className="p-4">
              <Following />
            </div>
          </Tab>

          <Tab key="makePayments" title="Make Payments">
            <div className="p-4">
              <MakePayments />
            </div>
          </Tab>

          <Tab key="paid" title="Paid">
            <div className="p-4">
              <Paid />
            </div>
          </Tab>
          <Tab key="analytics" title="Analytics">
            <div className="p-4">
              <Analytics />
            </div>
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserProfileTabs;
