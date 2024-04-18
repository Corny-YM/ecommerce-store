"use client";

import {
  Dispatch,
  useState,
  useContext,
  createContext,
  SetStateAction,
} from "react";

import { Store } from "@/type";

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
  const [currentStore, setCurrentStore] = useState<Store | null>(stores[0]!);

  return (
    <StoreContext.Provider value={{ stores, currentStore, setCurrentStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
