import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Attract Group CRM
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          All-in-one project/tasks and team management platform for software
          development service businesses.
        </p>
        <div className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
          <p>
            Centralize your operations with our powerful SaaS platform designed specifically for software
            development companies. Replace scattered tools with a unified system for task tracking,
            project management, resource planning, and team productivity.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Register</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
