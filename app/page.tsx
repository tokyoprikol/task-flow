import { Button } from "@/components/ui/button";
import { ArrowRight, CircleCheckBig, Shield, Zap } from "lucide-react";
import Link from "next/link";

const CARDS_BENEFITS = [
  {
    icon: <CircleCheckBig />,
    title: "Task Management",
    desc: "Organize tasks with an intuitive drag-and-drop kanban board. Track progress across multiple columns.",
  },
  {
    icon: <Zap />,
    title: "Lightning Fast",
    desc: "Built for speed and efficiency. Get more done in less time with our streamlined interface.",
  },
  {
    icon: <Shield />,
    title: "Secure & Reliable",
    desc: "Your data is protected with enterprise-grade security. Focus on what matters most.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-10 p-10">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center font-bold">
          <h1 className="text-6xl">TaskFlow</h1>
          <h3 className="text-4xl">Your tasks. In flow.</h3>
        </div>
        <div className="text-center text-neutral-400">
          <h4>Kanban board meets intelligent calendar.</h4>
          <h4>
            See progress at a glance. Plan your day without switching tabs.
            Everything stays in sync — automatically.
          </h4>
        </div>
        <div>
          <Link href="/dashboard">
            <Button>
              Get Started
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-10">
        {CARDS_BENEFITS.map((card) => (
          <div
            key={card.title}
            className="flex max-w-80 flex-col items-start gap-2 rounded-lg border p-5 transition hover:shadow-xl"
          >
            <div className="rounded-lg bg-neutral-200 p-2 dark:bg-neutral-800">
              {card.icon}
            </div>
            <div className="text-2xl font-semibold">{card.title}</div>
            <div className="text-neutral-400">{card.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
