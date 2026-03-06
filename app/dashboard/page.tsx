import Link from "next/link";
import AddBoardDialog from "@/components/board-components/add-board-dialog";
import DeleteBoardMenu from "@/components/board-components/delete-board-menu";
import prisma from "@/lib/prisma";
import { CalendarDays } from "lucide-react";
import { BOARD_COLORS_MAP, COLORS } from "@/lib/configs/map-configs";

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
                className={`flex h-50 w-70 flex-col items-center justify-center rounded-lg border-3 p-5 text-2xl font-bold text-white transition hover:shadow-lg ${COLORS[board.color.toLowerCase()]} `}
              >
                <span>{board.title}</span>

                <span className="flex items-center gap-2 text-sm">
                  <CalendarDays />
                  {board.createdAt.toLocaleString("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                  <DeleteBoardMenu id={board.id} />
                </span>
              </div>
            </Link>
          ))}
          <AddBoardDialog />
        </div>
      </div>
    </div>
  );
}
