"use client";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { editBoardName } from "@/lib/actions/board-actions";

export default function EditBoardDialog({ boardId }: { boardId: string }) {
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async () => {
    try {
      await editBoardName(boardId, newName);
      setIsOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Want to edit your board name?</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="New name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button onClick={handleEdit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
