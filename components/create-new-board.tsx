import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CreateNewBoard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">New Board</DialogTitle>
          <DialogDescription>Give this board a name</DialogDescription>
        </DialogHeader>
        <div>
          <Input placeholder="My Board" />
        </div>
        <DialogFooter>
          <Button size={"sm"}>Create</Button>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
