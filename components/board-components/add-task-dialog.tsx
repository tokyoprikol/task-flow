"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { createTask } from "@/lib/actions/task-actions";

export default function AddTaskDialog({
  columnId,
  boardId,
}: {
  columnId: string;
  boardId: string;
}) {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async () => {
    if (title) {
      await createTask(columnId, title, boardId);
      setIsOpen(false);
      setTitle("");
    } else {
      alert("Please enter task name");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Plus className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Enter the details for the new task.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="title"
              placeholder="Task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
