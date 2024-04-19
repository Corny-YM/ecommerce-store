"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/utils";
import { Category } from "@/type";
import { useStoreContext } from "@/providers/store-provider";
import getCategories from "@/actions/get-categories";

interface MainNavProps {
  data: Category[];
}

const MainNav = () => {
  const pathname = usePathname();
  const { currentStore } = useStoreContext();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!currentStore) return;
    const fetch = async () => {
      const res = await getCategories(currentStore.id);
      setCategories(res);
    };
    fetch();
  }, [currentStore, pathname]);

  const routes = useMemo(
    () =>
      categories.map((route) => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`,
      })) || [],
    [categories, currentStore]
  );

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
