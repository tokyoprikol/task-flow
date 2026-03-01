import AddBoardDialog from "@/components/board-components/add-board-dialog";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const boards = await prisma.board.findMany();
  console.log(boards);

  return (
    <div className="flex-1 space-y-5 px-10 py-5">
      <h1 className="text-4xl font-bold">Your Boards:</h1>
      <div className="space-y-5">
        {boards.length === 0 && (
          <span className="text-neutral-400 italic">No boards found.</span>
        )}
        <div className="flex items-center gap-10">
          {boards.map((board) => (
            <Link key={board.id} href={`dashboard/${board.id}`}>
              <div className="rounded-lg border-2 p-10 text-2xl font-bold transition hover:shadow-lg">
                {board.title}
              </div>
            </Link>
          ))}
          <AddBoardDialog />
        </div>
      </div>
    </div>
  );
}
