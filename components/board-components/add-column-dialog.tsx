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

export default function AddColumnDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          Add New Column
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>
            Enter the details for the new column.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-4 py-4">
          <Input id="title" placeholder="Column name" />
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Add Column</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
