"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/libs/utils";

interface Props {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onClick?: (value: number) => void;
}

const maxLimit = 99;
const minLimit = 1;

const InputQuantity = ({ value = "0", disabled, onChange, onClick }: Props) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChangeInput = useCallback(
    (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement;
      let val = target.value;
      if (+val?.[0] === 0) return;
      const isValidInput = /^[0-9]+$/.test(val);
      if (!isValidInput && val !== "") return;
      if (+val > maxLimit) val = maxLimit + "";
      setInputValue(val);
    },
    [inputValue, onChange]
  );
  const handleBlurInput = useCallback(
    (e: React.FocusEvent) => {
      const target = e.target as HTMLInputElement;
      let val = target.value;
      if (val === value) return;
      onChange?.(val);
    },
    [value]
  );
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      const type = target.dataset.type as "minus" | "plus";
      if (!type) return;
      setInputValue((prev) => {
        let amount = +prev;
        if (type === "minus") amount -= 1;
        else amount += 1;
        onClick?.(amount);
        if (amount < minLimit) amount = minLimit;
        else if (amount > maxLimit) amount = maxLimit;
        return amount + "";
      });
    },
    [onClick]
  );

  return (
    <div className="w-[140px] h-10 border border-[#e6e6e6] overflow-hidden flex rounded-[3px] border-solid;">
      <div
        data-type="minus"
        className={cn(
          "flex justify-center items-center h-full",
          "aspect-square cursor-pointer select-none hover:bg-[#717fe0] transition",
          disabled && "cursor-not-allowed"
        )}
        onClick={handleClick}
      >
        <Minus size={20} />
      </div>
      <input
        value={inputValue}
        className="outline-none appearance-none text-base leading-[1.6] text-[#333333] w-full h-full border-l-[#e6e6e6] border-r-[#e6e6e6] bg-[#f3f3f3] text-center block font-semibold border-l border-solid border-r"
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
      />
      <div
        data-type="plus"
        className={cn(
          "flex justify-center items-center h-full",
          "aspect-square cursor-pointer select-none hover:bg-[#717fe0] transition",
          disabled && "cursor-not-allowed"
        )}
        onClick={handleClick}
      >
        <Plus size={20} />
      </div>
    </div>
  );
};

export default InputQuantity;
