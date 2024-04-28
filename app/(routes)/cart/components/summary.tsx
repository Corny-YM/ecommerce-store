"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Cart } from "@/type";
import { Badge } from "@/components/ui/badge";
import ButtonBasic from "@/components/ui/button-basic";
import Currency from "@/components/ui/currency";
import { ICheckItems } from "../page";

interface Props {
  data?: Cart[];
  checkedItems: ICheckItems;
}

const Summary = ({ data, checkedItems }: Props) => {
  const searchParams = useSearchParams();

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

  // useEffect(() => {
  //   if (searchParams.get("success")) {
  //     toast.success("Payment completed");
  //     removeAll();
  //   }
  //   if (searchParams.get("canceled")) {
  //     toast.error("Something went wrong");
  //   }
  // }, [searchParams]);

  const totalPrice = useMemo(
    () =>
      buyItems?.reduce((total, item) => {
        const price = item.quantity * Number(item.product?.price);
        return total + price;
      }, 0) || 0,
    [buyItems]
  );

  const onCheckout = async () => {
    // // TODO: fix api
    // const res = await axios.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
    //   {
    //     productIds: items.map((item) => item.id),
    //   }
    // );
    // window.location = res.data.url;
  };

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
      <ButtonBasic
        disabled={buyItems?.length === 0}
        className="w-full mt-6"
        onClick={onCheckout}
      >
        Checkout
      </ButtonBasic>
    </div>
  );
};

export default Summary;
