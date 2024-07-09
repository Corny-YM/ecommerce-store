"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

const CodDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order detail</DialogTitle>
          <DialogDescription>
            Details of the order's products are here
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-[70vh]">
          <div className="h-full overflow-hidden overflow-y-auto -mx-4 px-4 space-y-2"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodDialog;
