"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { Color, Size } from "@/type";
import ButtonBasic from "@/components/ui/button-basic";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

interface Props {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters = ({ colors, sizes }: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <ButtonBasic
        className="flex items-center gap-x-2 lg:hidden"
        onClick={onOpen}
      >
        Filters <Plus size={20} />
      </ButtonBasic>

      <Dialog
        open={open}
        as="div"
        className="relative z-50 lg:hidden"
        onClose={onClose}
      >
        {/* Background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="relative ml-auto flex w-full h-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close Button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} onClick={onClose} />} />
            </div>

            {/* Render the filters */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
