"use client";

import getUser from "@/actions/get-user";
import { User } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useContext, createContext, useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export interface ContextType {
  user?: User | null;
}

const UserContext = createContext<ContextType>({});

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const clerkUser = useUser();

  useEffect(() => {
    if (!clerkUser.user || user) return;
    // TODO: call api to upsert user

    const fetch = async () => {
      const {
        id,
        imageUrl,
        fullName,
        lastName,
        firstName,
        createdAt,
        updatedAt,
        lastSignInAt,
        emailAddresses,
      } = clerkUser.user;

      const email = emailAddresses[0].emailAddress;
      if (!email) return;

      const userData = await getUser({
        id,
        email,
        imageUrl,
        fullName,
        lastName,
        firstName,
        createdAt,
        updatedAt,
        lastSignInAt,
      });

      setUser(userData!);
    };
    fetch();
  }, [clerkUser]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
