import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function byteConverter(bytes: number, decimals?: number, only?: string) {
  const K_UNIT = 1024;
  const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  if (bytes == 0) return "0 Byte";

  if (only === "MB")
    return (bytes / (K_UNIT * K_UNIT)).toFixed(decimals) + " MB";

  let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
  let resp =
    parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) +
    " " +
    SIZES[i];

  return resp;
}
