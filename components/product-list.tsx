"use client";

import { useEffect, useState } from "react";

import { Product } from "@/type";
import { useStoreContext } from "@/providers/store-provider";
import getProducts, { IProductParams } from "@/actions/get-products";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface Props {
  title: string;
  params: IProductParams;
}

const ProductList = ({ params, title }: Props) => {
  const { currentStore } = useStoreContext();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!currentStore) return;
    const fetch = async () => {
      const res = await getProducts(currentStore.id, params);
      setProducts(res);
    };
    fetch();
  }, [params, currentStore]);

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
