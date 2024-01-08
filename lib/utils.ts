import { type ClassValue, clsx } from "clsx";
import { Source_Code_Pro } from 'next/font/google';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], weight: '400' });