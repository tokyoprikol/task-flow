import { Task } from "@/app/generated/prisma/client";
import { PRIORITIES } from "@/lib/configs/map-configs";

export default function TaskPriority({ task }: { task: Task | undefined }) {
  return (
    <div
      className={`flex items-center gap-1 rounded-sm p-1 text-sm ${
        task?.priority === "high"
          ? "bg-red-100 text-red-400 dark:bg-red-950 dark:text-red-300"
          : task?.priority === "medium"
            ? "bg-yellow-100 text-yellow-400 dark:bg-yellow-950 dark:text-yellow-300"
            : "bg-blue-100 text-blue-400 dark:bg-blue-950 dark:text-blue-300"
      }`}
    >
      {task?.priority && PRIORITIES[task.priority]}
      {task?.priority}
    </div>
  );
}
