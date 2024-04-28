import { useCallback, useRef } from "react";

const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: T) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export default useDebounce;
