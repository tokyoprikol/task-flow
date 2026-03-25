"use client";
import { useEffect, useState } from "react";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { move } from "@dnd-kit/helpers";

import { useTransition } from "react";

import TaskMenu from "./board-components/task-menu";
import AddTaskDialog from "./board-components/add-task-dialog";
import { COLUMN_COLORS_MAP } from "@/lib/configs/map-configs";
import { GripVertical } from "lucide-react";
import { Button } from "./ui/button";

import { ColumnWithTasks } from "@/lib/types";
import { Task, Column } from "@/app/generated/prisma/client";

import { updateColumns } from "@/lib/actions/column-actions";
import DeleteColumnDialog from "./board-components/delete-column-dialog";
import EditColumnName from "./board-components/edit-column-dialog";
import TaskPriority from "./task-priority";

export default function KanbanBoard({
  initialColumns,
  boardId,
}: {
  initialColumns: ColumnWithTasks[];
  boardId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const initialItems = initialColumns.reduce(
    (acc: Record<string, string[]>, col) => {
      acc[col.id] = col.tasks.map((task) => task.id);
      return acc;
    },
    {},
  );

  const [items, setItems] = useState(initialItems);
  const [columns, setColumns] = useState(initialColumns);

  const getTask = (taskId: string) => {
    return initialColumns.flatMap((c) => c.tasks).find((t) => t.id === taskId);
  };

  useEffect(() => {
    setColumns(initialColumns);
    setItems(
      initialColumns.reduce((acc: Record<string, string[]>, col) => {
        acc[col.id] = col.tasks.map((task) => task.id);
        return acc;
      }, {}),
    );
  }, [initialColumns]);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
      onDragEnd={(event) => {
        if (event.canceled) return;

        startTransition(async () => {
          await updateColumns(items, boardId);
        });
      }}
    >
      <div className="flex justify-start gap-10">
        {columns.map((col) => (
          <div key={col.id} className="w-full max-w-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{col.title} </h1>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold dark:bg-neutral-800">
                  {col.tasks.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <EditColumnName columnId={col.id} boardId={boardId} />
                <DeleteColumnDialog columnId={col.id} boardId={boardId} />
                <AddTaskDialog columnId={col.id} boardId={boardId} />
              </div>
            </div>
            <DroppableColumn id={col.id} col={col}>
              {items[col.id]?.map((taskId, index) => {
                const task = getTask(taskId);
                return (
                  <DraggableTask
                    key={taskId}
                    id={taskId}
                    index={index}
                    columnId={col.id}
                    task={task}
                    boardId={boardId}
                  />
                );
              })}
            </DroppableColumn>
          </div>
        ))}
      </div>
    </DragDropProvider>
  );
}

function DraggableTask({
  id,
  index,
  columnId,
  task,
  boardId,
}: {
  id: string;
  index: number;
  columnId: string;
  task: Task | undefined;
  boardId: string;
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: columnId,
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="group space-y-4 rounded-lg border bg-white p-4 transition hover:shadow-md data-[dragging=true]:scale-[1.02] data-[dragging=true]:cursor-grabbing data-[dragging=true]:border-blue-400 data-[dragging=true]:bg-blue-50/70 data-[dragging=true]:opacity-70 data-[dragging=true]:shadow-2xl dark:bg-neutral-800/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-md font-semibold">{task?.title}</h1>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {task?.description}
          </span>
        </div>
        <div className="flex items-center">
          <TaskMenu taskId={task?.id} boardId={boardId} />
          <Button size={"icon-sm"} variant={"ghost"} ref={handleRef}>
            <GripVertical />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold">
          Added on{" "}
          {task?.createdAt.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
        <TaskPriority task={task} />
      </div>
    </div>
  );
}

function DroppableColumn({
  children,
  id,
  col,
}: {
  children: React.ReactNode;
  id: string;
  col: Column;
}) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className={`min-h-110 space-y-3 rounded-lg border-2 border-l-5 ${COLUMN_COLORS_MAP[col.color.toLowerCase()]} bg-neutral-50 p-7 dark:bg-neutral-900`}
    >
      {children}
    </div>
  );
}
