"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function addColumn(title: string, color: string, boardId: string) {
  const result = await prisma.column.aggregate({
    where: { boardId },
    _max: { order: true },
  });

  const lastOrder = result._max.order ?? 0;

  await prisma.column.create({
    data: {
      title,
      order: lastOrder + 1,
      color,
      boardId,
    },
  });

  revalidatePath(`/dashboard/${boardId}`);
}

export async function updateColumns(
  items: Record<string, string[]>,
  boardId: string,
) {
  await prisma.$transaction(
    Object.entries(items).flatMap(([columnId, taskIds]) =>
      taskIds.map((taskId) =>
        prisma.task.update({
          where: { id: taskId },
          data: { columnId },
        }),
      ),
    ),
  );

  revalidatePath(`/dashboard/${boardId}`);
}

export async function deleteColumn(columnId: string, boardId: string) {
  await prisma.column.delete({
    where: { id: columnId },
  });

  revalidatePath(`/dashboard/${boardId}`);
}
