"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function AuthButtons() {
  return (
    <>
      <Link href={"/sign-in"}>
        <Button variant={"outline"}>Sign In</Button>
      </Link>
      <Link href={"/sign-up"}>
        <Button>Start for free</Button>
      </Link>
    </>
  );
}
