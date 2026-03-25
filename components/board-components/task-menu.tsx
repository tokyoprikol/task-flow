"use client";

import {
  MoreVertical,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteTask, editTaskName } from "@/lib/actions/task-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Task } from "@/app/generated/prisma/client";

const PRIORITIES_MAP = [
  { value: "high", icon: <ChevronUp />, color: "bg-red-500" },
  { value: "medium", icon: <Minus />, color: "bg-yellow-500" },
  { value: "low", icon: <ChevronDown />, color: "bg-blue-500" },
];

export default function TaskMenu({
  taskId,
  boardId,
  task,
}: {
  taskId: string | undefined;
  boardId: string;
  task: Task | undefined;
}) {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState("");

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const onOpenEdit = () => {
    if (!task) return;

    setNewName(task.title ?? "");
    setNewDesc(task.description ?? "");
    setNewPriority(task.priority ?? "");

    setIsEditOpen(true);
  };

  const handleEdit = async () => {
    try {
      if (taskId)
        await editTaskName(taskId, newName, newDesc, newPriority, boardId);
      setIsEditOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteTask(taskId, boardId);
  };

  return (
    <>
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
          <DropdownMenuItem onClick={onOpenEdit}>
            <Edit />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Want to edit your task ?
            </DialogTitle>
          </DialogHeader>

          <div className="w-full space-y-2 py-4">
            <Input
              id="title"
              placeholder="New name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Textarea
              id="title"
              placeholder="New description..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <Select value={newPriority} onValueChange={setNewPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent position={"popper"}>
                <SelectGroup>
                  {PRIORITIES_MAP.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.icon}
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex justify-center!">
            <DialogClose asChild>
              <Button variant={"outline"}>Close</Button>
            </DialogClose>
            <Button onClick={handleEdit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              You sure you want to delete this task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
