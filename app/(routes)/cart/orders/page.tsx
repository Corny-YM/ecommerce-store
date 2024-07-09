"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { useUserContext } from "@/providers/user-provider";
import { OrderColumn } from "./components/columns";
import { OrderClient } from "./components/client";
import getOrders from "@/actions/get-orders";
import { formatter } from "@/libs/utils";

const CartOrderPage = () => {
  const { user } = useUserContext();

  const { data, isLoading } = useQuery({
    enabled: !!user?.id,
    queryKey: ["user", "orders", user?.id],
    queryFn: () => getOrders(user?.id!),
  });

  const content = useMemo(() => {
    if (isLoading) return null;
    if (!data || !data.length) return;
    const formattedOrder: OrderColumn[] = data?.map((item) => ({
      id: item.id,
      phone: item.phone || "---",
      address: item.address || "---",
      isPaid: item.isPaid,
      totalPrice: formatter
        .format(
          item.orderItems.reduce((total, item) => {
            const price = +item.product.price;
            return total + price * item.quantity;
          }, 0) || 0
        ),
      createdAt: item.createdAt
        ? format(item.createdAt, "MMMM do, yyyy")
        : "---",
    }));
    return <OrderClient data={formattedOrder} />;
  }, [data, isLoading]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">{content}</div>
    </div>
  );
};

export default CartOrderPage;
