"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { convertError } from "@/lib/utils";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.SubmitEvent) => {
    e.preventDefault();

    await signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);
          setError(null);
          redirect("/dashboard");
        },
        onError: (ctx) => {
          setLoading(false);
          setError(convertError(ctx.error.message));
        },
      },
    );
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 px-10 py-5">
      {error && (
        <Alert
          variant="destructive"
          className="max-w-xs border-red-200 bg-red-100"
        >
          <AlertCircleIcon />
          <AlertTitle>Sign Up failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your credentials below to create an account
          </CardDescription>
          <CardAction>
            <Link href={"/sign-in"}>
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="form" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            form="form"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
