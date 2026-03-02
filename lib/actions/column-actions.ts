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
