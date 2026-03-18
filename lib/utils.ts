import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ColumnWithTasks } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertError(errorMes: string) {
  const idxOfBracket = errorMes.lastIndexOf("]");
  return errorMes.slice(idxOfBracket + 1);
}
