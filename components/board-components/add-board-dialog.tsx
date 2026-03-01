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

export default function AddBoardDialog() {
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
        <div className="flex items-center gap-2">
          <Input placeholder="My Board" />
          <Select>
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
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
