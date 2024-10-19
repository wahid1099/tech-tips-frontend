import { Home } from "lucide-react";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { MdOutlinePayments, MdOutlineSignpost } from "react-icons/md";

export const AdminLinks = [
  { name: "Dashboard", path: "/adminDashboard", icon: FaHome },
  { name: "Manage Users", path: "/adminDashboard/manage-users", icon: FaUsers },
  { name: "Profile", path: "/adminDashboard/admin-profile", icon: FaUser },

  {
    name: "Payment History",
    path: "/adminDashboard/payment-history",
    icon: MdOutlinePayments,
  },
  { name: "Home", path: "/", icon: FaHome },
];
