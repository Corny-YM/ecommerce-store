import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const isDarkColor = (color: string) => {
  // Convert the color to RGB
  const rgb = color.match(/\d+/g);
  if (!rgb) return false;
  // Calculate the luminance of the color
  const luminance =
    (0.299 * parseInt(rgb[0]) +
      0.587 * parseInt(rgb[1]) +
      0.114 * parseInt(rgb[2])) /
    255;
  // Return true if the luminance is less than or equal to 0.5 (dark), false otherwise
  return luminance <= 0.5;
};

// Check if the background color is light
export const isLightColor = (color: string) => {
  const rgb = color.match(/\d+/g);
  if (!rgb) return false;
  const luminance =
    (0.299 * parseInt(rgb[0]) +
      0.587 * parseInt(rgb[1]) +
      0.114 * parseInt(rgb[2])) /
    255;
  return luminance > 0.5;
};
