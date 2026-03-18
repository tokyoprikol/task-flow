import BoardCard from "@/components/board-card";
import AddBoardDialog from "@/components/board-components/add-board-dialog";
import { getAllBoards } from "@/lib/actions/board-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("sign-in");

  const boards = await getAllBoards(session.user.id);
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
            <BoardCard key={board.id} board={board} userId={session.user.id} />
          ))}
          <AddBoardDialog userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}
