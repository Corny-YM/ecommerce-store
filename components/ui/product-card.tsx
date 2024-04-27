"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Expand, Info, LoaderCircle, ShoppingCart } from "lucide-react";

import { Product } from "@/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStoreContext } from "@/providers/store-provider";
import usePreviewModal from "@/hooks/use-preview-modal";
import addCart from "@/actions/add-cart";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";

interface Props {
  data: Product;
}

const ProductCard = ({ data }: Props) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const queryClient = useQueryClient();

  const { userId } = useAuth();
  const { currentStore } = useStoreContext();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-cart", "product-card"],
    mutationFn: addCart,
    onSuccess: () => {
      // refresh carts quantity
      queryClient.invalidateQueries({
        queryKey: ["carts-quantity", "user", userId],
      });
      toast.success("Add product to cart successfully");
    },
    onError: () => {
      toast.error("Add to cart fail. Try it later");
    },
  });

  const handleClick = useCallback(() => {
    if (!data.id) return;
    router.push(`/product/${data.id}`);
  }, [router, data]);

  const handlePreview = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      previewModal.onOpen(data);
    },
    [data]
  );

  const handleAddToCart = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (!userId) return handleToast();
      const storeId = currentStore?.id;
      const productId = data.id;
      const colorId = data.productHasColors[0]?.colorId;
      const sizeId = data.productHasSizes[0]?.sizeId;
      if (!storeId || !colorId || !sizeId) return;

      mutate({ userId, storeId, productId, colorId, sizeId });
    },
    [userId, currentStore]
  );

  const handleClickCategory = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const target = e.currentTarget as HTMLDivElement;
      const id = target.dataset.id;
      if (!id) return;
      router.push(`/category/${id}`);
    },
    [router]
  );

  const handleToast = useCallback(() => {
    toast((t) => (
      <span className="flex gap-x-2 justify-center items-center font-medium">
        <Info size={20} className="text-blue-600" />
        Login to unlock this feature
        <Button
          className="bg-blue-600 hover:bg-blue-700 transition shadow-md"
          onClick={() => {
            toast.dismiss(t.id);
            router.push("/sign-in");
          }}
        >
          Login
        </Button>
      </span>
    ));
  }, [router]);

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      onClick={handleClick}
    >
      {/* Images & Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          alt="Image"
          src={data?.images?.[0].url}
          fill
          className="aspect-square object-contain rounded-md bg-neutral-100"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              icon={<Expand size={20} className="text-gray-600" />}
              onClick={handlePreview}
            />
            <IconButton
              disabled={isPending}
              icon={
                !isPending ? (
                  <ShoppingCart size={20} className="text-gray-600" />
                ) : (
                  <div className="animate-spin">
                    <LoaderCircle />
                  </div>
                )
              }
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <div className="flex items-center flex-wrap text-sm text-gray-500 gap-x-1 gap-y-1">
          {data.categoryHasProducts.map((item) => (
            <Badge data-id={item.categoryId} onClick={handleClickCategory}>
              {item.category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;
