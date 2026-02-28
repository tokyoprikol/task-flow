import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-5 px-10 py-5">
      <h1 className="text-4xl font-bold">Your Boards:</h1>
      <div className="space-y-5">
        <span className="text-neutral-400 italic">No boards found.</span>
        <div className="flex w-full justify-center">
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
                <DialogClose>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
