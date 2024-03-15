import { cn } from "@/libs/utils";
import { MouseEventHandler } from "react";

interface Props {
  className?: string;
  icon: React.ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const IconButton = ({ className, icon, onClick }: Props) => {
  return (
    <button
      className={cn(
        "rounded-full flex items-center justify-center",
        "bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
