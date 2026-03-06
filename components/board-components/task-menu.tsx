"use client";

import {
  MoreVertical,
  Edit,
  ArrowUp,
  ArrowDown,
  Trash2,
  GripVertical,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteTask } from "@/lib/actions/task-actions";

export default function TaskMenu({
  taskId,
  boardId,
}: {
  taskId: string | undefined;
  boardId: string;
}) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteTask(taskId, boardId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="opacity-0 group-hover:opacity-100"
      >
        <Button variant={"ghost"} size={"icon-sm"}>
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Edit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowUp />
          Move Up
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowDown />
          Move Down
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
