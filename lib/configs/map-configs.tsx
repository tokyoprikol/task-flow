import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { ReactNode } from "react";

export const COLORS_MAP = [
  { name: "Red", color: `bg-red-500` },
  { name: "Orange", color: `bg-orange-400` },
  { name: "Yellow", color: `bg-yellow-400` },
  { name: "Green", color: `bg-green-400` },
  { name: "Sky", color: `bg-sky-400` },
  { name: "Blue", color: `bg-blue-400` },
  { name: "Purple", color: `bg-purple-400` },
];

export const COLUMN_COLORS_MAP: Record<string, string> = {
  red: `border-l-red-500`,
  orange: `border-l-orange-500`,
  yellow: `border-l-yellow-500`,
  green: `border-l-green-500`,
  sky: `border-l-sky-500`,
  blue: `border-l-blue-500`,
  purple: `border-l-purple-500`,
};

export const BOARD_COLORS_MAP: Record<string, string> = {
  red: `border-red-500`,
  orange: `border-orange-500`,
  yellow: `border-yellow-500`,
  green: `border-green-500`,
  sky: `border-blue-300`,
  blue: `border-blue-500`,
  purple: `border-purple-500`,
};

export const COLORS: Record<string, string> = {
  red: `bg-red-400`,
  orange: `bg-orange-400`,
  yellow: `bg-yellow-400`,
  green: `bg-green-400`,
  sky: `bg-sky-400`,
  blue: `bg-blue-400`,
  purple: `bg-purple-400`,
};

export const PRIORITIES: Record<string, ReactNode> = {
  low: <ChevronDown className="size-4" />,
  medium: <Minus className="size-4" />,
  high: <ChevronUp className="size-4" />,
};
