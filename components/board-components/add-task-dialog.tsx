"use client";

import { useState } from "react";
import { createTask } from "@/lib/actions/task-actions";
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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Plus, ChevronUp, ChevronDown, Minus } from "lucide-react";

const PRIORITIES_MAP = [
  { value: "high", icon: <ChevronUp />, color: "bg-red-500" },
  { value: "medium", icon: <Minus />, color: "bg-yellow-500" },
  { value: "low", icon: <ChevronDown />, color: "bg-blue-500" },
];

export default function AddTaskDialog({
  columnId,
  boardId,
}: {
  columnId: string;
  boardId: string;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (title && description && priority) {
      setError("");
      await createTask(title, description, priority, columnId, boardId);
      setIsOpen(false);
      setTitle("");
    } else {
      setError("You must give this task some name and description.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"secondary"}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Enter the details for the new task.
          </DialogDescription>
          {error && <span className="text-red-500">{error}</span>}
        </DialogHeader>
        <div className="w-full space-y-2 py-4">
          <Input
            id="title"
            placeholder="Name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            id="title"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select value={priority} onValueChange={setPriority}>
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
