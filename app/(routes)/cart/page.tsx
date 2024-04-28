"use client";

import { LoaderCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useStoreContext } from "@/providers/store-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import getCarts from "@/actions/get-carts";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";

export type ICheckItems = { [key: string]: { [key: string]: boolean } };

const CartPage = () => {
  const { userId } = useAuth();
  const { stores } = useStoreContext();

  const [isMounted, setIsMounted] = useState(false);
  const [checkedItems, setCheckedItems] = useState<ICheckItems>({});

  const { data, isLoading, error } = useQuery({
    enabled: !!userId,
    queryKey: ["users", "carts", userId],
    queryFn: () => getCarts(userId!),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!stores || !stores.length || !data?.length) return;

    // {storeId: {cartId: (false | true)}}

    setCheckedItems((prev) => {
      const obj = stores.reduce((result, store) => {
        const validCartItems = data.filter((item) => item.storeId === store.id);
        return {
          ...result,
          [store.id]: validCartItems.reduce((total, item) => {
            const oldChecked = prev?.[store.id]?.[item.id];
            return { ...total, [item.id]: !!oldChecked };
          }, {}),
        };
      }, {});
      return obj;
    });
  }, [stores, data]);

  const handleCheckedChange = useCallback(
    (storeId: string, cartId: string, checked: boolean) => {
      setCheckedItems((prev) => {
        const prevObjStore = prev[storeId];
        return { ...prev, [storeId]: { ...prevObjStore, [cartId]: checked } };
      });
    },
    []
  );
  const handleCheckedAllChange = useCallback(
    (storeId: string, bol: boolean) => {
      setCheckedItems((prev) => {
        if (!data) return prev;
        const validCartItems = data.reduce((total, item) => {
          if (item.storeId !== storeId) return total;
          return { ...total, [item.id]: bol };
        }, {});
        return { ...prev, [storeId]: validCartItems };
      });
    },
    [data]
  );

  const content = useMemo(() => {
    if (isLoading && !error)
      return (
        <div className="flex w-full justify-center items-center animate-spin">
          <LoaderCircle />
        </div>
      );
    if (!data || !data.length || error)
      return <p className="text-neutral-500">No items added to cart</p>;
    return stores.map((store) => {
      const validCartItems = data.filter((item) => item.storeId === store.id);
      const hasItems = !!validCartItems.length;
      if (!hasItems) return;

      const obj = checkedItems[store.id] || {};
      const isAllChecked = Object.values(obj).every((item) => item);

      return (
        <div key={store.id} className="w-full flex flex-col justify-center">
          <div className="flex items-center">
            <Checkbox
              checked={isAllChecked}
              onCheckedChange={(val: boolean) =>
                handleCheckedAllChange(store.id, val)
              }
            />
            <div className="ml-2 font-semibold">
              Store: <Badge className="text-base">{store.name}</Badge>
            </div>
          </div>
          <ul>
            {validCartItems.map((item) => (
              <CartItem
                key={item.id}
                data={item}
                checked={checkedItems?.[store.id]?.[item.id]}
                onCheckedChange={(check) =>
                  handleCheckedChange(store.id, item.id, check)
                }
              />
            ))}
          </ul>
        </div>
      );
    });
  }, [data, isLoading, error, stores, checkedItems]);

  if (!isMounted) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">ShoppingCart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-8">{content}</div>
            <Summary data={data} checkedItems={checkedItems} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
