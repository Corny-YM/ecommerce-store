"use client";

import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import getProducts, { IProductParams } from "@/actions/get-products";
import { useEffect, useState } from "react";
import { Product } from "@/type";
import { useStoreContext } from "@/providers/store-provider";

interface Props {
  params: IProductParams;
}

const ProductList = ({ params }: Props) => {
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
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
