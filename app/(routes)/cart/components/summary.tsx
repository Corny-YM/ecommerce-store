"use client";

import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import checkout from "@/actions/checkout";
import { Cart } from "@/type";
import { ICheckItems } from "../page";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Currency from "@/components/ui/currency";
import ButtonBasic from "@/components/ui/button-basic";
import CodDialog from "./cod-dialog";

interface Props {
  data?: Cart[];
  checkedItems: ICheckItems;
}

const Summary = ({ data, checkedItems }: Props) => {
  const searchParams = useSearchParams();
  const { userId } = useAuth();

  // const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState("card");
  const [buyItems, setBuyItems] = useState<Cart[]>([]);

  useEffect(() => {
    if (!data || !data.length) return;

    const checkedIds: string[] = [];
    Object.keys(checkedItems).forEach((key) => {
      const objCartIds = checkedItems[key];
      Object.keys(objCartIds).forEach((cartId) => {
        const isChecked = objCartIds[cartId];
        if (!isChecked) return;
        checkedIds.push(cartId);
      });
    });
    setBuyItems(data.filter((item) => checkedIds.includes(item.id)));
  }, [data, checkedItems]);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["cart", "checkout"],
    mutationFn: checkout,
    onSuccess(res) {
      toast.success("Checkout successfully");
      window.location = res.url as any;
    },
    onError() {
      toast.error("Checkout fail. Try it later");
    },
  });

  const totalPrice = useMemo(
    () =>
      buyItems?.reduce((total, item) => {
        const price = item.quantity * Number(item.product?.price);
        return total + price;
      }, 0) || 0,
    [buyItems]
  );

  const onCheckout = useCallback(() => {
    if (!userId) return;
    const ids = buyItems.map((item) => item.id);
    mutate({ userId, cartIds: ids });
  }, [buyItems, userId]);

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      <div className="flex flex-col justify-center mt-6 space-y-2">
        {buyItems?.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex flex-col">
              <div>
                <span className="font-semibold">{item.product?.name}</span>{" "}
                <span>({item.quantity})</span>
              </div>
              <div className="flex items-center gap-x-1">
                <Badge className="text-[10px] px-2">{item.color?.name}</Badge>
                <Badge className="text-[10px] px-2">{item.size?.name}</Badge>
              </div>
            </div>
            <div className="flex justify-center items-center w-fit">
              <Currency value={item.quantity * Number(item.product?.price)} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      {/* <div className="w-full flex flex-col space-y-2 mt-8 mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="card"
            checked={selected === "card"}
            onCheckedChange={(val) => val && setSelected("card")}
          />
          <label
            htmlFor="card"
            className="font-bold leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Payment by card
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cod"
            checked={selected === "cod"}
            onCheckedChange={(val) => val && setSelected("cod")}
          />
          <label
            htmlFor="cod"
            className="font-bold leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Cash on delivery (COD)
          </label>
        </div>
      </div> */}
      <ButtonBasic
        className="w-full mt-6"
        disabled={buyItems?.length === 0 || isPending}
        onClick={onCheckout}
      >
        Checkout
      </ButtonBasic>

      {/* <CodDialog open={open} onOpenChange={setOpen} /> */}
    </div>
  );
};

export default Summary;
