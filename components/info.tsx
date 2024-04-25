"use client";

import { ShoppingCart } from "lucide-react";

import { Product } from "@/type";
import { Button } from "@/components/ui/button";
import ButtonBasic from "@/components/ui/button-basic";
import Currency from "@/components/ui/currency";
import { useCallback, useState } from "react";
import { cn } from "@/libs/utils";

interface Props {
  data: Product;
}

const Info = ({ data }: Props) => {
  const [selected, setSelected] = useState<{
    colorId?: string;
    sizeId?: string;
  }>({});

  const onSelect = useCallback((type: "colorId" | "sizeId", id: string) => {
    setSelected((prev) => {
      const existed = prev[type] === id;
      return { ...prev, [type]: !existed ? id : null };
    });
  }, []);

  console.log(data);

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
        <ButtonBasic className="flex items-center gap-x-2">
          Add To Cart <ShoppingCart />
        </ButtonBasic>
      </div>
    </div>
  );
};

export default Info;
