"use client";

import { useEffect, useState } from "react";

import { useStoreContext } from "@/providers/store-provider";
import { Product } from "@/type";
import getProduct from "@/actions/get-product";
import Info from "@/components/info";
import Gallery from "@/components/gallery";
import ProductList from "@/components/product-list";

interface Props {
  productId: string;
}

const ProductDetail = ({ productId }: Props) => {
  const { currentStore } = useStoreContext();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!currentStore) return;
    const fetch = async () => {
      const res = await getProduct(currentStore.id, productId);
      setProduct(res);
    };
    fetch();
  }, [currentStore, productId]);

  if (!product) return null;
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {/* Gallery */}
        <Gallery images={product.images} />
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          {/* Info */}
          <Info data={product} />
        </div>
      </div>
      <hr className="my-10" />
      <ProductList
        title="Related Items"
        params={{ categoryId: product.category?.id }}
      />
    </div>
  );
};

export default ProductDetail;
