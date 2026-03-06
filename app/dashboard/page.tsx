import Link from "next/link";
import AddBoardDialog from "@/components/board-components/add-board-dialog";
import DeleteBoardMenu from "@/components/board-components/delete-board-menu";
import prisma from "@/lib/prisma";
import { CalendarDays } from "lucide-react";
import {
  BOARD_COLORS_MAP,
  COLORS,
  COLUMN_COLORS_MAP,
} from "@/lib/configs/map-configs";

export default async function Dashboard() {
  const boards = await prisma.board.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  console.log(boards);

  return (
    <div className="flex-1 space-y-5 px-10 py-5">
      <h1 className="text-4xl font-bold">Your Boards:</h1>
      <div className="space-y-5">
        {boards.length === 0 && (
          <span className="text-neutral-400 italic">No boards found.</span>
        )}
        <div className="grid grid-cols-5 gap-6">
          {boards.map((board) => (
            <Link key={board.id} href={`dashboard/${board.id}`}>
              <div
                className={`flex h-50 w-70 flex-col items-start justify-between gap-5 rounded-lg border border-l-7 px-4 py-6 transition hover:shadow-lg dark:bg-neutral-900 ${COLUMN_COLORS_MAP[board.color.toLowerCase()]}`}
              >
                <span className="text-2xl font-bold">{board.title}</span>

                <div className="flex items-center gap-1 text-sm text-neutral-500">
                  <CalendarDays className="size-5" />
                  {board.createdAt.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
                <div className="w-full">
                  <DeleteBoardMenu id={board.id} />
                </div>
              </div>
            </Link>
          ))}
          <AddBoardDialog />
        </div>
      </div>
    </div>
  );
}
