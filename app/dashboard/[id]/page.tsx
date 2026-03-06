import AddColumnDialog from "@/components/board-components/add-column-dialog";
import KanbanBoard from "@/components/kanban-board";
import prisma from "@/lib/prisma";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      columns: {
        orderBy: { order: "asc" },
        include: { tasks: true },
      },
    },
  });

  console.log(board);

  return (
    <div className="flex-1 space-y-5 px-10 py-5">
      <h1 className="text-4xl font-bold">{board?.title}</h1>
      {board?.columns.length === 0 && (
        <h3 className="text-neutral-400 italic">No Columns.</h3>
      )}
      <AddColumnDialog boardId={board?.id} />

      <KanbanBoard initialBoard={board} />

      {/* <div className="flex justify-center gap-10">
        {board?.columns.map((col) => (
          <div key={col.id} className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{col.title} </h1>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">
                  {col.tasks.length}
                </span>
              </div>

              <AddTaskDialog columnId={col.id} boardId={board.id} />
            </div>
            <div
              className={`min-h-110 space-y-3 rounded-lg border-2 border-t-10 ${COLUMN_COLORS_MAP[col.color.toLowerCase()]} bg-neutral-50 p-7 dark:bg-neutral-900/40`}
            >
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition hover:shadow-md dark:bg-neutral-950"
                >
                  {task.title}

                  <TaskMenu taskId={task.id} boardId={board.id} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
