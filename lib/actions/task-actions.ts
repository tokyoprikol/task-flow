"use server";

import { revalidatePath } from "next/cache";
import { generateKeyBetween } from "fractional-indexing";
import prisma from "../prisma";

export const createTask = async (
  title: string,
  description: string,
  priority: string,
  columnId: string,
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
      description,
      priority,
      position: newPosition,
      columnId,
    },
  });

  revalidatePath(`/dashboard/${boardId}`);
};

export const deleteTask = async (id: string | undefined, boardId: string) => {
  if (id) {
    await prisma.task.delete({
      where: { id },
    });
  } else {
    console.error("No task id!");
  }

  revalidatePath(`/dashboard/${boardId}`);
};
