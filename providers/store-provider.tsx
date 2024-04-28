"use client";

import {
  Dispatch,
  useState,
  useContext,
  createContext,
  SetStateAction,
  useEffect,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Store } from "@/type";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  stores: Store[];
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

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
    if (!currentStore) router.push("/");
    localStorage.setItem("store", JSON.stringify(currentStore));
  }, [currentStore, stores]);

  return (
    <StoreContext.Provider value={{ stores, currentStore, setCurrentStore }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
