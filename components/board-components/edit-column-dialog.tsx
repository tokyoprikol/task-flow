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
import { editColumnName } from "@/lib/actions/column-actions";

export default function EditColumnName({
  columnId,
  boardId,
}: {
  columnId: string;
  boardId: string;
}) {
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async () => {
    await editColumnName(columnId, newName, boardId);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"xs"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Want to edit your column name?
          </DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="New name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <DialogFooter className="flex justify-center!">
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button onClick={handleEdit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
