"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { LoaderCircle, X } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Cart } from "@/type";
import { cn } from "@/libs/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import updateCart from "@/actions/update-cart";
import useDebounce from "@/hooks/use-debounce";
import InputQuantity from "./input-quantity";
import deleteCart from "@/actions/remove-cart";

interface Props {
  data: Cart;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const CartItem = ({ data, checked, onCheckedChange }: Props) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const [dialogConfirm, setDialogConfirm] = useState(false);

  const { mutate: mutateQuantity, isPending: isPendingQuantity } = useMutation({
    mutationKey: ["update", "cart"],
    mutationFn: updateCart,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "carts", userId] });
    },
    onError() {
      toast.error("Update cart fail. Try it later");
    },
  });

  const { mutate: mutateRemoveCart, isPending: isPendingRemoveCart } =
    useMutation({
      mutationKey: ["remove", "cart"],
      mutationFn: deleteCart,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "carts", userId] });
        toast.success("Remove cart successfully");
        setDialogConfirm(false);
      },
      onError() {
        toast.error("Remove cart fail. Try it later");
      },
    });

  const size = useMemo(() => data.size, [data]);
  const color = useMemo(() => data.color, [data]);
  const product = useMemo(() => data.product, [data]);

  const isLight = useMemo(() => {
    return color?.name.toLowerCase() === "white";
  }, [color]);

  const onActionMutate = useCallback(
    (id: string, amount: number) =>
      mutateQuantity({ cartId: id, quantity: amount }),
    []
  );
  const debouncedAction = useDebounce(onActionMutate, 500);
  const handleClickQuantity = useCallback(
    (value: number) => debouncedAction(data.id, value),
    [data]
  );
  const handleChangeInput = useCallback(
    (val: string) => {
      onActionMutate(data.id, +val);
    },
    [data]
  );
  const handleRemoveCart = useCallback(() => {
    if (!userId) return;
    mutateRemoveCart({ userId, cartId: data.id });
  }, [data, userId]);

  if (!product) return;
  return (
    <li className="flex items-center py-6 border-b">
      <div className="mr-2">
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      </div>

      <div className="relative w-16 h-16 flex justify-center items-center rounded-md overflow-hidden">
        <Image
          fill
          src={product.images?.[0]?.url || ""}
          alt=""
          className="object-contain object-center bg-neutral-100"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-center sm:ml-6">
        <div className="absolute z-10 right-0 top-1/2 -translate-y-1/2">
          <AlertDialog open={dialogConfirm}>
            <AlertDialogTrigger asChild>
              <IconButton
                icon={<X size={15} />}
                disabled={isPendingRemoveCart}
                onClick={() => setDialogConfirm(true)}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your cart and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDialogConfirm(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-20 bg-rose-500 hover:bg-rose-600"
                  onClick={handleRemoveCart}
                >
                  {!isPendingRemoveCart ? (
                    "Remove"
                  ) : (
                    <div className="flex w-full justify-center items-center animate-spin">
                      <LoaderCircle />
                    </div>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 gap-y-2 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{product.name}</p>
          </div>

          <div className="mt-1 flex items-center text-sm">
            <Badge
              className={cn(
                "border border-solid border-slate-900",
                !isLight ? "text-white" : "text-slate-800"
              )}
              color={color?.value}
            >
              {color?.name}
            </Badge>
            <div className="ml-2 pl-2 border-l border-gray-200">
              <Badge className="border border-solid border-slate-900">
                {size?.name}
              </Badge>
            </div>
          </div>

          <Currency value={product.price} />

          <div className="flex items-center">
            <InputQuantity
              value={data.quantity + ""}
              disabled={isPendingQuantity}
              onClick={handleClickQuantity}
              onChange={handleChangeInput}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
