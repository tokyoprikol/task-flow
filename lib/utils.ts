import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ColumnWithTasks } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTask(taskId: string, initialColumns: ColumnWithTasks[]) {
  return initialColumns
    .flatMap((column) => column.tasks)
    .find((task) => (task.id = taskId));
}
