import { cn } from "@/libs/utils";
import { MouseEventHandler } from "react";

interface Props {
  className?: string;
  icon: React.ReactElement;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const IconButton = ({ className, icon, disabled, onClick }: Props) => {
  return (
    <button
      className={cn(
        "rounded-full flex items-center justify-center",
        "bg-white border shadow-md p-2 hover:scale-110 transition",
        "disabled:cursor-not-allowed disabled:opacity-80",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
