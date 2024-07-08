"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import Link from "next/link";

const TabActions = () => {
  const pathname = usePathname();

  const isOrder = pathname.includes("orders");

  return (
    <div className="flex items-center space-x-2">
      <Button
        className={cn("text-3xl font-bold h-fit py-2", isOrder && "text-black")}
        variant={!isOrder ? "default" : "secondary"}
        asChild
      >
        <Link href="/cart">ShoppingCart</Link>
      </Button>
      <Button
        className={cn(
          "text-3xl font-bold h-fit py-2",
          !isOrder && "text-black"
        )}
        variant={isOrder ? "default" : "secondary"}
        asChild
      >
        <Link href="/cart/orders">Orders</Link>
      </Button>
    </div>
  );
};

export default TabActions;
