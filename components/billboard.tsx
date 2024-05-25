"use client";

import { useEffect, useMemo, useState } from "react";

import { Billboard as BillboardType, Category } from "@/type";
import { useStoreContext } from "@/providers/store-provider";
import getBillboard from "@/actions/get-billboard";
import getCategory from "@/actions/get-category";

interface BillboardProps {
  categoryId?: string | null;
}

const Billboard = ({ categoryId }: BillboardProps) => {
  const { currentStore } = useStoreContext();
  const [category, setCategory] = useState<Category | null>(null);
  // const [billboard, setBillboard] = useState<BillboardType | null>(null);

  useEffect(() => {
    if (!currentStore) return;
    const fetch = async () => {
      const resCategory = await getCategory(currentStore.id, categoryId);
      setCategory(resCategory);
    };
    fetch();
  }, [currentStore, categoryId]);

  // useEffect(() => {
  //   if (!currentStore) return;
  //   const fetch = async () => {
  //     const resBillboard = await getBillboard(currentStore.id, data?.id);
  //     setBillboard(resBillboard);
  //   };
  //   fetch();
  // }, [currentStore]);

  const currentBillboard = useMemo(() => category?.billboard, [category]);

  if (!currentBillboard) return <div className="mb-10" />;
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${currentBillboard.imageUrl})` }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {currentBillboard.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
