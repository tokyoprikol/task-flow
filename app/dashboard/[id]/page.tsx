import AddColumnDialog from "@/components/board-components/add-column-dialog";
import KanbanBoard from "@/components/kanban-board";
import { getBoardById } from "@/lib/actions/board-actions";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = await getBoardById(id);

  console.log(board);

  if (!board) return <div>No board</div>;

  return (
    <div className="flex-1 space-y-5 px-10 py-5">
      <h1 className="text-4xl font-bold">{board.title}</h1>
      {board.columns.length === 0 && (
        <h3 className="text-neutral-400 italic">No Columns.</h3>
      )}
      <AddColumnDialog boardId={board.id} />

      <KanbanBoard initialBoard={board} />
    </div>
  );
}
