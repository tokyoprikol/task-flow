"use client";
import { useEffect, useState } from "react";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract";
import { move } from "@dnd-kit/helpers";

import TaskMenu from "./board-components/task-menu";
import AddTaskDialog from "./board-components/add-task-dialog";
import { COLUMN_COLORS_MAP } from "@/lib/configs/map-configs";
import { GripVertical } from "lucide-react";
import { Button } from "./ui/button";

interface Board {
  id: string;
  title: string;
  columns: Column[];
}
interface Column {
  id: string;
  title: string;
  order: number;
  boardId: string;
  color: string;
  tasks: Task[];
}

interface Task {
  id: string;
  columnId: string;
  title: string;
  position: string;
}

interface KanbanBoardProps {
  initialBoard: Board;
}

export default function KanbanBoard({ initialBoard }: KanbanBoardProps) {
  const initialItems = initialBoard.columns.reduce(
    (acc: Record<string, string[]>, col) => {
      acc[col.id] = col.tasks.map((task) => task.id);
      return acc;
    },
    {},
  );

  const [items, setItems] = useState(initialItems);

  const [columns, setColumns] = useState(initialBoard.columns);

  const getTask = (taskId: string) => {
    return initialBoard.columns
      .flatMap((c) => c.tasks)
      .find((t) => t.id === taskId);
  };

  useEffect(() => {
    setColumns(initialBoard.columns);
    setItems(
      initialBoard.columns.reduce((acc: Record<string, string[]>, col) => {
        acc[col.id] = col.tasks.map((task) => task.id);
        return acc;
      }, {}),
    );
  }, [initialBoard]);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="flex justify-center gap-10">
        {columns.map((col) => (
          <div key={col.id} className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{col.title} </h1>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold dark:bg-neutral-800">
                  {col.tasks.length}
                </span>
              </div>

              <AddTaskDialog columnId={col.id} boardId={initialBoard.id} />
            </div>
            <DroppableColumn id={col.id} col={col}>
              {items[col.id]?.map((taskId, index) => {
                const task = getTask(taskId);
                return (
                  <DraggableTask
                    key={taskId}
                    id={taskId}
                    index={index}
                    task={task}
                    boardId={initialBoard.id}
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
  task,
  boardId,
}: {
  id: string;
  index: number;
  task: Task | undefined;
  boardId: string;
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id,
    index,
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="group flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4 transition hover:shadow-md data-[dragging=true]:scale-[1.02] data-[dragging=true]:cursor-grabbing data-[dragging=true]:border-blue-400 data-[dragging=true]:bg-blue-50/70 data-[dragging=true]:opacity-70 data-[dragging=true]:shadow-2xl dark:bg-neutral-950"
    >
      {task ? task.title : "Untitled Task"}
      <div className="flex items-center">
        <TaskMenu taskId={task?.id} boardId={boardId} />
        <Button size={"icon-sm"} variant={"ghost"} ref={handleRef}>
          <GripVertical />
        </Button>
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
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div
      ref={ref}
      className={`min-h-110 space-y-3 rounded-lg border-2 border-l-5 ${COLUMN_COLORS_MAP[col.color.toLowerCase()]} bg-neutral-50 p-7 dark:bg-neutral-900/40`}
    >
      {children}
    </div>
  );
}
