"use client";

import React, { useEffect, useState } from "react";

import { useStoreContext } from "@/providers/store-provider";
import { Color, Size } from "@/type";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import Filter from "./filter";
import MobileFilters from "./mobile-filters";

const FilterOptions = () => {
  const { currentStore } = useStoreContext();
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    if (!currentStore) return;
    const fetch = async () => {
      const res = await getSizes(currentStore.id);
      setSizes(res);
    };
    fetch();
  }, [currentStore]);

  useEffect(() => {
    if (!currentStore) return;
    const fetch = async () => {
      const res = await getColors(currentStore.id);
      setColors(res);
    };
    fetch();
  }, [currentStore]);

  return (
    <>
      {/* Add Mobile Filters */}
      <MobileFilters sizes={sizes} colors={colors} />
      <div className="hidden lg:block">
        <Filter valueKey="sizeId" name="Sizes" data={sizes} />
        <Filter valueKey="colorId" name="Colors" data={colors} />
      </div>
    </>
  );
};

export default FilterOptions;
