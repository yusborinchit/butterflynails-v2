import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePhoneToWSP(phone: string) {
  return `598${phone.startsWith("0") ? phone.substring(1) : phone}`;
}
