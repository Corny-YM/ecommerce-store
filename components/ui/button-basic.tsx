import { forwardRef } from "react";
import { cn } from "@/libs/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonBasic = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          `w-auto rounded-full bg-black border-transparent px-5 py-3  text-white font-semibold transition`,
          "disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonBasic.displayName = "ButtonBasic";

export default ButtonBasic;
