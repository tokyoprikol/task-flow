import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

async function seed() {
  await prisma.board.create({
    data: {
      title: "My Board",
      color: "green",
      columns: {
        create: [
          {
            title: "To Do",
            order: 0,
            color: "blue",
            tasks: {
              create: [
                {
                  title: "learn Next.js",
                  position: "a0",
                },
              ],
            },
          },
          {
            title: "In Progress",
            order: 1,
            color: "yellow",
            tasks: {
              create: [
                {
                  title: "learn React",
                  position: "a1",
                },
              ],
            },
          },
          {
            title: "Done",
            order: 2,
            color: "green",
            tasks: {
              create: [
                {
                  title: "learn JavaScript",
                  position: "a2",
                },
              ],
            },
          },
        ],
      },
    },
  });
}

seed();
