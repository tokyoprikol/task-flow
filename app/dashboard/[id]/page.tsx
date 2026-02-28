import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Plus, Trash2 } from "lucide-react";

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
    <div className="flex-1 space-y-15 px-10 py-5">
      <h1 className="text-4xl font-bold">{board?.title}</h1>
      <div className="flex justify-center gap-10">
        {board?.columns.map((col) => (
          <div key={col.id} className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">{col.title} </h1>
                <span className="rounded-full px-3.5 py-2 text-xs font-bold dark:bg-neutral-800">
                  {col.tasks.length}
                </span>
              </div>

              <Button size={"icon"}>
                <Plus className="size-5" />
              </Button>
            </div>
            <div className="gap-3 rounded-lg border-2 p-7 dark:bg-neutral-900/40">
              {col.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border px-4 py-4 shadow dark:bg-neutral-950"
                >
                  {task.title}

                  <Button size={"icon"}>
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
