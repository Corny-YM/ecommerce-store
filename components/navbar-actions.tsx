"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { CircleUserRound, ShoppingBag } from "lucide-react";

import ButtonBasic from "@/components/ui/button-basic";
import { useQuery } from "@tanstack/react-query";
import getCartsQuantity from "@/actions/get-carts-quantity";

const NavbarActions = () => {
  const router = useRouter();
  const { userId } = useAuth();

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

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <ButtonBasic
        className="flex items-center rounded-full bg-black px-4 py-2"
        onClick={() => router.push("/cart")}
      >
        <ShoppingBag size={20} color="white" />
        {!!userId && (
          <span className="ml-2 text-sm font-medium text-white">
            {quantity}
          </span>
        )}
      </ButtonBasic>

      {!userId && (
        <ButtonBasic
          className="flex items-center rounded-full bg-black px-4 py-2"
          onClick={() => router.push("/sign-in")}
        >
          <CircleUserRound size={20} color="white" />
        </ButtonBasic>
      )}
      {userId && <UserButton afterSignOutUrl="/" />}
    </div>
  );
};

export default NavbarActions;
