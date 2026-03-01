const shade = 500;

export const COLORS_MAP = [
  { name: "Red", color: `bg-red-${shade}` },
  { name: "Orange", color: `bg-orange-${shade}` },
  { name: "Yellow", color: `bg-yellow-${shade}` },
  { name: "Green", color: `bg-green-${shade}` },
  { name: "Sky", color: `bg-blue-${shade}` },
  { name: "Blue", color: `bg-blue-${shade}` },
  { name: "Purple", color: `bg-purple-${shade}` },
];

export const COLUMN_COLORS_MAP: Record<string, string> = {
  red: `border-t-red-${shade}`,
  orange: `border-t-orange-${shade}`,
  yellow: `border-t-yellow-${shade}`,
  green: `border-t-green-${shade}`,
  sky: `border-t-blue-300`,
  blue: `border-t-blue-${shade}`,
  purple: `border-t-purple-${shade}`,
};

export const BOARD_COLORS_MAP: Record<string, string> = {
  red: `border-red-${shade}`,
  orange: `border-orange-${shade}`,
  yellow: `border-yellow-${shade}`,
  green: `border-green-${shade}`,
  sky: `border-blue-300`,
  blue: `border-blue-${shade}`,
  purple: `border-purple-${shade}`,
};
