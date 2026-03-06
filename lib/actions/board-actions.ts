"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

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
