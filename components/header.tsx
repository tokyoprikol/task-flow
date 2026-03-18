"use client";

import Link from "next/link";
import ChangeTheme from "./change-theme";
import AuthButtons from "./auth-buttons";
import { Button } from "./ui/button";
import { Layers } from "lucide-react";
import UserAvatar from "./user-avatar";
import { useSession } from "@/lib/auth-client";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between border-b px-10 py-5 dark:bg-neutral-900">
      <Link href={"/"}>
        <div className="flex items-center justify-center gap-2 text-xl font-semibold">
          <Button size={"icon"}>
            <Layers className="size-6" />
          </Button>
          TaskFlow
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <ChangeTheme />
        {session?.user ? <UserAvatar user={session.user} /> : <AuthButtons />}
      </div>
    </div>
  );
}
