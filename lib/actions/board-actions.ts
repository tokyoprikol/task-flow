"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function getAllBoards() {
  return await prisma.board.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getBoardById(id: string) {
  return await prisma.board.findUnique({
    where: { id },
    include: {
      columns: {
        orderBy: { order: "asc" },
        include: { tasks: true },
      },
    },
  });
}

export async function addNewBoard(title: string, color: string) {
  await prisma.board.create({
    data: {
      title,
      color,
    },
  });
  revalidatePath("/dashboard");
}

export async function deleteBoard(id: string) {
  try {
    await prisma.board.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    alert(e);
  }

  revalidatePath("/dashboard");
}

export const editBoardName = async (boardId: string, title: string) => {
  await prisma.board.update({
    where: { id: boardId },
    data: { title },
  });

  revalidatePath("/dashboard");
};
