"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback } from "react";
import { Expand, Info, ShoppingCart } from "lucide-react";

import { Product } from "@/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";

interface Props {
  data: Product;
}

const ProductCard = ({ data }: Props) => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();
  const previewModal = usePreviewModal();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (user) return cart.addItem(data);

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
  };

  const handleClickCategory = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const target = e.currentTarget as HTMLDivElement;
    const id = target.dataset.id;
    if (!id) return;
    router.push(`/category/${id}`);
  }, []);

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
              onClick={onPreview}
            />
            <IconButton
              icon={<ShoppingCart size={20} className="text-gray-600" />}
              onClick={onAddToCart}
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
