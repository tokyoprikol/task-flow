"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteBoard } from "@/lib/actions/board-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function deleteBoardMenu({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const handleDelete = async () => {
    await deleteBoard(id, userId);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"sm"}>
            <Trash2 />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              You sure you want to delete this board?
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
