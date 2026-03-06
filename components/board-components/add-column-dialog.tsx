"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { COLORS_MAP } from "@/lib/configs/map-configs";
import { addColumn } from "@/lib/actions/column-actions";
import { useState } from "react";

export default function AddColumnDialog({
  boardId,
}: {
  boardId: string | undefined;
}) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (title && boardId) {
      setError("");
      await addColumn(title, color, boardId);
      setIsOpen(false);
      setTitle("");
      setColor("");
    } else {
      if (!title) setError("You must give this column some name.");
      if (!boardId) console.error("No boardId given to function");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          Add Column
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>
            Enter the details for the new column.
          </DialogDescription>
          {error && <span className="text-red-500">{error}</span>}
        </DialogHeader>
        <div className="grid w-full items-center gap-4 py-4">
          <Input
            id="title"
            placeholder="Column name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent position={"popper"}>
              <SelectGroup>
                {COLORS_MAP.map((item) => (
                  <SelectItem value={item.name} key={item.name}>
                    {item.name}
                    <div className={`${item.color} h-4 w-4 rounded-full`} />
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
          <Button onClick={handleCreate}>Add Column</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
