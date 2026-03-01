import AddColumnDialog from "@/components/board-components/add-column-dialog";
import AddTaskDialog from "@/components/board-components/add-task-dialog";
import TaskMenu from "@/components/board-components/task-menu";
import { COLUMN_COLORS_MAP } from "@/lib/map-configs";
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
        include: {
          tasks: true,
        },
      },
    },
  });

  console.log(board);

  return (
    <div className="flex-1 space-y-10 px-10 py-5">
      <h1 className="text-4xl font-bold">{board?.title}</h1>
      <AddColumnDialog />

      <div className="flex justify-center gap-10">
        {board?.columns.map((col) => (
          <div key={col.id} className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{col.title} </h1>
                <span className="rounded-full bg-neutral-200 px-3.5 py-2 text-xs font-bold dark:bg-neutral-800">
                  {col.tasks.length}
                </span>
              </div>

              <AddTaskDialog />
            </div>
            <div
              className={`min-h-120 gap-3 rounded-lg border-2 border-t-10 ${COLUMN_COLORS_MAP[col.color]} bg-neutral-50 p-7 dark:bg-neutral-900/40`}
            >
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-white px-4 py-4 transition hover:shadow-md dark:bg-neutral-950"
                >
                  {task.title}

                  <TaskMenu />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
