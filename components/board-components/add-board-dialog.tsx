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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COLORS_MAP } from "@/lib/map-configs";
import { useState } from "react";
import { addNewBoard } from "@/lib/actions/add-new-board";

export default function AddBoardDialog() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async () => {
    await addNewBoard(title, color);
    setIsOpen(false);
    setTitle("");
    setColor("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create new board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">New Board</DialogTitle>
          <DialogDescription>Give this board a name</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            placeholder="My Board"
            required
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
        <DialogFooter className="grid grid-cols-2">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
