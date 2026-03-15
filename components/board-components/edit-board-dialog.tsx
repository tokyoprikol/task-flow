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

export default function EditBoardDialog() {
  const handleEdit = () => {};

  return (
    <Dialog>
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
          <Input placeholder="New name..." />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
