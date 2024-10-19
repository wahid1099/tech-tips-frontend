import React from "react";
import { User } from "@nextui-org/react";
import moment from "moment";

interface IMangeUserCellProps {
  columnKey: string;
  payment: any;
}

const PaymentHistoryCell: React.FC<IMangeUserCellProps> = ({
  columnKey,
  payment,
}) => {
  const cellValue = payment[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "lg", src: payment?.user?.profileImage }}
          description={payment?.user?.email}
          name={payment?.user?.name}
        >
          {payment?.user?.email}
        </User>
      );

    case "gender":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        </div>
      );

    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{payment?.user?.role}</p>
        </div>
      );

    case "status":
      const statusColor =
        payment?.status === "completed"
          ? "text-green-400"
          : payment?.status === "failed"
            ? "text-red-400"
            : "text-gray-800";

      return (
        <div className="flex flex-col">
          <p
            className={`text-bold font-bold text-sm capitalize ${statusColor}`}
          >
            {payment?.status}
          </p>
        </div>
      );

    case "expiryDate":
      const formattedDate = moment(payment?.expiryDate).format("MMMM Do YYYY");

      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{formattedDate}</p>
        </div>
      );
    case "createdAt":
      const enddDate = moment(payment?.createdAt).format("MMMM Do YYYY");

      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{enddDate}</p>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default PaymentHistoryCell;
