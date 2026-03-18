import AddColumnDialog from "@/components/board-components/add-column-dialog";
import KanbanBoard from "@/components/kanban-board";
import { Button } from "@/components/ui/button";
import { getBoardById } from "@/lib/actions/board-actions";
import { auth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("sign-in");

  const { id } = await params;
  const board = await getBoardById(id, session.user.id);

  console.log(board);

  if (!board) return <div>No board</div>;

  return (
    <div className="flex-1 space-y-7 px-10 py-5">
      <div className="flex flex-col items-start space-y-5">
        <div className="flex items-center gap-3">
          <Link href={"/dashboard"}>
            <Button size={"sm"}>
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">{board.title}</h1>
        </div>
        {board.columns.length === 0 && (
          <h3 className="text-neutral-400 italic">No Columns.</h3>
        )}
        <AddColumnDialog boardId={board.id} />
      </div>

      <KanbanBoard initialColumns={board.columns} boardId={board.id} />
    </div>
  );
}
