"use client";

import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InfoIcon, LoaderCircle, ShoppingCart } from "lucide-react";

import { Product } from "@/type";
import { cn } from "@/libs/utils";
import { useStoreContext } from "@/providers/store-provider";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import ButtonBasic from "@/components/ui/button-basic";
import addCart from "@/actions/add-cart";

interface Props {
  data: Product;
}

const Info = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { currentStore } = useStoreContext();

  const [selected, setSelected] = useState<{
    colorId?: string;
    sizeId?: string;
  }>({});

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-cart"],
    mutationFn: addCart,
    onSuccess: () => {
      // refresh carts quantity
      queryClient.invalidateQueries({
        queryKey: ["carts-quantity", "user", userId],
      });
      toast.success("Add product to cart successfully");
      setSelected({});
    },
    onError: () => {
      toast.error("Add to cart fail. Try it later");
    },
  });

  const disabled = useMemo(
    () => !selected.colorId || !selected.sizeId || isPending,
    [selected, isPending]
  );

  const onSelect = useCallback((type: "colorId" | "sizeId", id: string) => {
    setSelected((prev) => {
      const existed = prev[type] === id;
      return { ...prev, [type]: !existed ? id : null };
    });
  }, []);

  const handleAddToCart = useCallback(async () => {
    const storeId = currentStore?.id;
    if (!storeId || !userId) return;
    const productId = data.id;
    const sizeId = selected.sizeId;
    const colorId = selected.colorId;
    if (!colorId) return handleToastWarning("color");
    if (!sizeId) return handleToastWarning("size");
    const obj = { userId, storeId, productId, colorId, sizeId };

    mutate(obj);
  }, [data, selected, userId, currentStore]);
  const handleToastWarning = useCallback((type: "color" | "size") => {
    toast(
      <div className="text-lg">
        Please select a <strong className="capitalize">{type}</strong>
      </div>,
      { icon: <InfoIcon className="text-orange-500" /> }
    );
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div className="w-full flex items-center gap-x-2 flex-wrap">
            {data.productHasSizes.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={
                  selected.sizeId === item.sizeId ? "default" : "outline"
                }
                onClick={() => onSelect("sizeId", item.sizeId)}
              >
                {item.size.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="w-full flex items-center gap-x-3 flex-wrap">
            {data.productHasColors.map((item) => (
              <Button
                key={item.id}
                className={cn(
                  "w-6 h-6 rounded-full border border-gray-600 hover:scale-150 transition",
                  selected.colorId === item.colorId && "scale-150"
                )}
                size="icon"
                style={{ backgroundColor: item.color.value }}
                onClick={() => onSelect("colorId", item.colorId)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-x-3">
        <ButtonBasic
          className="flex items-center gap-x-2"
          disabled={disabled}
          onClick={handleAddToCart}
        >
          Add To Cart
          {!isPending ? (
            <ShoppingCart />
          ) : (
            <div className="animate-spin">
              <LoaderCircle />
            </div>
          )}
        </ButtonBasic>
      </div>
    </div>
  );
};

export default Info;
