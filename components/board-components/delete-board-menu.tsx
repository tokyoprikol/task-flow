"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteBoard } from "@/lib/actions/board-actions";

export default function deleteBoardMenu({ id }: { id: string }) {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await deleteBoard(id);
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleDelete}>
      <Trash2 className="size-5" />
    </Button>
  );
}
