"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from "@nextui-org/react";
import React from "react";

import MangeUserSkeleton from "../ManageUser/MangeUserSkelent";

import { columns } from "./paymentconstants";
import PaymentHistoryCell from "./PaymentHistorytable";

import { User } from "@/src/types";
import { useGetAllPayment } from "@/src/hooks/payment.hooks";

export default function PaymentHistory() {
  const { data, isLoading } = useGetAllPayment();

  if (isLoading) {
    return <MangeUserSkeleton />;
  }

  const payments = data?.data || [];

  return (
    <>
      <div>
        <h1 className="text-center text-3xl font-bold mb-2">
          Manage <span className="text-pink-500">Users</span>
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Manage all users and see how they are performing
        </p>
      </div>
      <Divider className="my-6" />
      {payments.length > 0 ? (
        <Table aria-label="Manage Users Table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={payments}>
            {(payment: User) => (
              <TableRow key={payment?._id}>
                {(columns) => (
                  <TableCell>
                    <PaymentHistoryCell
                      columnKey={columns as string}
                      payment={payment}
                    />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center mt-4">
          <b>
            It seems there are no users to manage at the moment. Lets add some!
          </b>
        </div>
      )}
    </>
  );
}
