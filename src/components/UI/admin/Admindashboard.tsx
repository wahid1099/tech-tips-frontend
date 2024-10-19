"use client";
import { Divider } from "@nextui-org/divider";
import { ArrowDownIcon, ArrowUpIcon, UsersIcon } from "lucide-react";
import { FaMoneyBillWave, FaUserShield, FaChartLine } from "react-icons/fa6";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import { TUser } from "@/src/types";
import MonthlyPayments from "./MonthlyPayments";

export default function AdminDashboard() {
  const { data, isLoading, error } = useGetAllUsers();

  // Calculate total users and admins from data
  const totalUsers =
    data?.data?.filter((user: TUser) => user.role === "user").length || 0;
  const totalAdmins =
    data?.data?.filter((user: TUser) => user.role === "admin").length || 0;

  // Calculate total income dynamically if payment data is available
  const totalIncome = 45600; // Placeholder; replace with actual income calculation if available

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning!";
    } else if (currentHour < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users data: {error.message}</p>;

  return (
    <div className="p-6 dark:bg-gray-900 bg-white min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to the Admin Dashboard! 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{getGreeting()}</p>
      </div>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <StatCard
            change="+5%"
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            icon={<UsersIcon className="h-6 w-6 text-white" />}
            title="Total Users"
            value={totalUsers.toString()} // Use calculated total users
          />

          {/* Total Income Card */}
          <StatCard
            change="+10%"
            color="bg-gradient-to-r from-green-500 to-green-600"
            icon={<FaMoneyBillWave className="h-6 w-6 text-white" />}
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`} // Display total income dynamically
          />

          {/* Total Admins Card */}
          <StatCard
            change="+2%"
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            icon={<FaUserShield className="h-6 w-6 text-white" />}
            title="Total Admins"
            value={totalAdmins.toString()} // Use calculated total admins
          />

          {/* Growth Rate Card */}
          <StatCard
            negative
            change="-1%"
            color="bg-gradient-to-r from-red-500 to-red-600"
            icon={<FaChartLine className="h-6 w-6 text-white" />}
            title="Growth Rate"
            value="+8.5%"
          />
        </div>
        <Divider className="my-8 dark:bg-gray-700 bg-gray-300" />

        <MonthlyPayments />
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
  negative?: boolean;
}

function StatCard({
  title,
  value,
  change,
  icon,
  color,
  negative = false,
}: StatCardProps) {
  return (
    <div className={`rounded-xl shadow-md overflow-hidden ${color}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium text-xl">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
          <div className="p-3 rounded-full bg-white bg-opacity-20">{icon}</div>
        </div>
        <div className="mt-4 flex items-center">
          {negative ? (
            <ArrowDownIcon className="h-4 w-4 text-red-300 mr-1" />
          ) : (
            <ArrowUpIcon className="h-4 w-4 text-green-300 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              negative ? "text-red-300" : "text-green-300"
            }`}
          >
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}
