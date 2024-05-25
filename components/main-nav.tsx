"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import getCategories from "@/actions/get-categories";
import { cn } from "@/libs/utils";
import { Category } from "@/type";
import { useStoreContext } from "@/providers/store-provider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import NavbarSheet from "./navbar-sheet";

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

  const content = useMemo(
    () =>
      routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex min-w-fit text-sm font-medium transition-colors hover:text-black hover:font-semibold",
            route.active ? "text-black font-semibold" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      )),
    [routes]
  );

  return (
    <>
      <div className="flex items-center justify-center md:hidden">
        <NavbarSheet routes={routes} />
      </div>
      <ScrollArea className="hidden md:block mx-6 py-4 max-w-full">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {content}
        </nav>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default MainNav;
