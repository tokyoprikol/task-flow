import { Prisma } from "@/app/generated/prisma/client";

export type FullBoard = Prisma.BoardGetPayload<{
  include: { columns: { include: { tasks: true } } };
}>;

export type ColumnWithTasks = Prisma.ColumnGetPayload<{
  include: { tasks: true };
}>;

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}
export interface Column {
  id: string;
  title: string;
  order: number;
  boardId: string;
  color: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description: string;
  priority: string;
  position: string;
}
