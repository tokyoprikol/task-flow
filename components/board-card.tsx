import Link from "next/link";
import DeleteBoardMenu from "./board-components/delete-board-menu";
import { Board } from "@/app/generated/prisma/client";
import { CalendarDays } from "lucide-react";
import { COLUMN_COLORS_MAP } from "@/lib/configs/map-configs";
import EditBoardDialog from "./board-components/edit-board-dialog";

export default function BoardCard({
  board,
  userId,
}: {
  board: Board;
  userId: string;
}) {
  return (
    <div
      className={`flex h-50 w-70 flex-col items-start justify-between gap-5 rounded-lg border border-l-7 px-4 py-6 transition hover:shadow-lg dark:bg-neutral-900 ${COLUMN_COLORS_MAP[board.color.toLowerCase()]}`}
    >
      <div className="flex w-full items-center justify-between">
        <Link
          href={`dashboard/${board.id}`}
          className="text-2xl font-bold transition hover:text-neutral-500"
        >
          {board.title}
        </Link>

        <EditBoardDialog boardId={board.id} />
      </div>

      <div className="flex items-center gap-1 text-sm text-neutral-500">
        <CalendarDays className="size-5" />
        {board.createdAt.toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </div>
      <div className="w-full">
        <DeleteBoardMenu id={board.id} userId={userId} />
      </div>
    </div>
  );
}
