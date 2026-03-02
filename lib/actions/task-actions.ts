"use server";

import { revalidatePath } from "next/cache";
import { generateKeyBetween } from "fractional-indexing";
import prisma from "../prisma";

export const createTask = async (
  columnId: string,
  title: string,
  boardId: string,
) => {
  const lastTask = await prisma.task.findFirst({
    where: { columnId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const newPosition = lastTask
    ? generateKeyBetween(lastTask.position, null)
    : generateKeyBetween(null, null);

  await prisma.task.create({
    data: {
      title,
      position: newPosition,
      columnId,
    },
  });

  revalidatePath(`/dashboard/${boardId}`);
};

export const deleteTask = async (id: string, boardId: string) => {
  await prisma.task.delete({
    where: { id },
  });
  revalidatePath(`/dashboard/${boardId}`);
};
