"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ScanBarcode } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import getOrderDetails from "@/actions/get-order-details";
import { useUserContext } from "@/providers/user-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { OrderColumn } from "./columns";
import NoImg from "@/public/no-img.jpg";

interface Props {
  data: OrderColumn;
}

const DetailDialog = ({ data }: Props) => {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);

  const { data: orderDetails, isLoading } = useQuery({
    enabled: open && !!data && !!user?.id,
    queryKey: ["user", "order", "detail", data.id],
    queryFn: () => getOrderDetails(user?.id!, data.id),
  });

  const content = useMemo(() => {
    if (isLoading) return null;
    if (!orderDetails || !orderDetails.length) return null;
    return orderDetails.map((item) => (
      <Link
        key={item.id}
        className="w-full flex justify-between gap-2 p-4 border border-solid shadow rounded-lg hover:bg-primary/20 transition cursor-pointer"
        target="_blank"
        href={`/product/${item.productId}`}
      >
        <div className="relative w-10 h-10 flex justify-center items-center rounded-lg overflow-hidden">
          <Image
            className="absolute w-full h-full"
            src={item.product?.images?.[0]?.url || NoImg}
            alt={item.product.name}
            fill
          />
        </div>
        <div className="flex-1 flex flex-col text-sm gap-2">
          <div className="font-semibold line-clamp-1">{item.product.name}</div>
          <div className="w-full flex items-center flex-wrap gap-2">
            <div>
              Quantity:{" "}
              <Badge className="px-2">{item.product.quantity || 0}</Badge>
            </div>
            <div>
              Size: <Badge className="px-2">{item.size.value || 0}</Badge>
            </div>
            <div>
              Color:{" "}
              <Badge
                className="px-2"
                style={{ backgroundColor: item.color.value }}
              >
                {item.color.value}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    ));
  }, [orderDetails, isLoading]);

  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full flex items-center justify-center"
          size="icon"
        >
          <ScanBarcode size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order detail</DialogTitle>
          <DialogDescription>
            Details of the order's products are here
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[70vh]">
          <div className="h-full overflow-hidden overflow-y-auto -mx-4 px-4 space-y-2">
            {content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
