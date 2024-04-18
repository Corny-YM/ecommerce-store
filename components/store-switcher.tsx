"use client";

import { useCallback, useState } from "react";
import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react";

import { Store } from "@/type";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreContext } from "@/providers/store-provider";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {}

const StoreSwitcher = ({ className }: StoreSwitcherProps) => {
  const { stores, currentStore, setCurrentStore } = useStoreContext();

  const [open, setOpen] = useState(false);

  const onStoreSelect = useCallback((store: Store) => {
    setCurrentStore(store);
    setOpen(false);
  }, []);

  if (!stores.length) return null;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-36 justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.name}
          <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-36 max-w-96 p-0" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {stores.map((store) => (
                <CommandItem
                  className="text-sm"
                  key={store.id}
                  onSelect={() => onStoreSelect(store)}
                >
                  <StoreIcon className="mr-2 w-4 h-4" />
                  {store.name}
                  <Check
                    className={cn(
                      "ml-auto w-4 h-4",
                      currentStore?.id === store.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
