"use client";

import { ColumnDef } from "@tanstack/react-table";
import DetailDialog from "./detail-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => (
      <div className="flex items-center text-xl">
        {!!row.original.isPaid ? "✅" : "❌"}
      </div>
    ),
  },
  { id: "actions", cell: ({ row }) => <DetailDialog data={row.original} /> },
];
