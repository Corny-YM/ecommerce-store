"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CircleUserRound, Search, ShoppingBag } from "lucide-react";

import getCartsQuantity from "@/actions/get-carts-quantity";
import ButtonBasic from "@/components/ui/button-basic";
import SearchModal from "@/components/search-modal";

const NavbarActions = () => {
  const router = useRouter();
  const { userId } = useAuth();

  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ["carts-quantity", "user", userId],
    queryFn: () => getCartsQuantity(userId!),
  });

  const quantity = useMemo(() => data?.quantity || 0, [data]);

  const handleSearching = useCallback(() => setOpen(true), []);

  if (!isMounted) return null;
  return (
    <div className="ml-auto flex items-center gap-x-1  md:gap-x-2">
      <ButtonBasic
        className="flex items-center rounded-full bg-black px-2 md:px-4 py-2"
        onClick={handleSearching}
      >
        <Search size={20} />
      </ButtonBasic>
      <ButtonBasic
        className="flex items-center rounded-full bg-black px-2 md:px-4 py-2"
        onClick={() => router.push("/cart")}
      >
        <ShoppingBag size={20} color="white" />
        {!!userId && (
          <span className="hidden md:block ml-2 text-sm font-medium text-white">
            {quantity}
          </span>
        )}
      </ButtonBasic>

      {!userId && (
        <ButtonBasic
          className="flex items-center rounded-full bg-black px-2 md:px-4 py-2"
          onClick={() => router.push("/sign-in")}
        >
          <CircleUserRound size={20} color="white" />
        </ButtonBasic>
      )}
      {userId && <UserButton afterSignOutUrl="/" />}

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default NavbarActions;
