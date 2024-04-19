"use client";

import {
  Dispatch,
  useState,
  useContext,
  createContext,
  SetStateAction,
  useEffect,
} from "react";

import { Store } from "@/type";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  stores: Store[];
}

export interface ContextType {
  stores: Store[];
  currentStore: Store | null;
  setCurrentStore: Dispatch<SetStateAction<Store | null>>;
}

const StoreContext = createContext<ContextType>({
  stores: [],
  currentStore: null,
  setCurrentStore: () => {},
});

export const StoreContextProvider = ({ children, stores }: Props) => {
  const router = useRouter();
  const [currentStore, setCurrentStore] = useState<Store | null>(stores[0]!);

  useEffect(() => {
    if (!currentStore) return;
    router.push("/");
  }, [currentStore]);

  return (
    <StoreContext.Provider value={{ stores, currentStore, setCurrentStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
