"use client";

import { CircleUserRound, LogIn, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";

import useCart from "@/hooks/use-cart";
import ButtonBasic from "@/components/ui/button-basic";

const NavbarActions = () => {
  const router = useRouter();
  const cart = useCart();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <ButtonBasic
        className="flex items-center rounded-full bg-black px-4 py-2"
        onClick={() => router.push("/cart")}
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
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
