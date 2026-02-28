import { Layers } from "lucide-react";
import { Button } from "./ui/button";
import ChangeTheme from "./change-theme";

export default function Header() {
  return (
    <div className="flex justify-between border-b px-10 py-5">
      <div className="flex items-center justify-center gap-2 text-xl font-semibold">
        <Button size={"icon"}>
          <Layers className="size-6" />
        </Button>
        TaskFlow
      </div>
      <div className="flex items-center gap-3">
        <ChangeTheme />
        <Button variant={"outline"}>Sign In</Button>
        <Button>Start for free</Button>
      </div>
    </div>
  );
}
