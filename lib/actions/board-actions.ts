"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function getAllBoards(userId: string) {
  return await prisma.board.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      userId,
    },
  });
}

export async function getBoardById(id: string, userId: string) {
  return await prisma.board.findUnique({
    where: { id, userId },
    include: {
      columns: {
        orderBy: { order: "asc" },
        include: { tasks: true },
      },
    },
  });
}

export async function addNewBoard(
  title: string,
  color: string,
  userId: string,
) {
  await prisma.board.create({
    data: {
      title,
      color,
      userId,
    },
  });
  revalidatePath("/dashboard");
}

export async function deleteBoard(id: string, userId: string) {
  try {
    await prisma.board.delete({
      where: {
        id,
        userId,
      },
    });
  } catch (e) {
    alert(e);
  }

  revalidatePath("/dashboard");
}

export const editBoardName = async (
  boardId: string,
  title: string,
  userId: string,
) => {
  await prisma.board.update({
    where: { id: boardId },
    data: { title, userId },
  });

  revalidatePath("/dashboard");
};
