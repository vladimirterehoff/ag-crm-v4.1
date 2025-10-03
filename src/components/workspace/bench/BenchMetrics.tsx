"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, PauseCircle, AlertCircle } from "lucide-react";

// Define a type for team members for better type safety
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  availability: "available" | "partially" | "busy" | "unavailable" | string; // string for default case
  workload: number;
  currentProject: string;
  nextAvailable: string;
  skills: string[];
  assignedTasks: number;
  completedTasks: number;
}

interface BenchMetricsProps {
  teamMembers: TeamMember[];
}

export function BenchMetrics({ teamMembers }: BenchMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Now</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {teamMembers.filter((m) => m.availability === "available").length}
          </div>
          <p className="text-xs text-muted-foreground">
            Team members ready for assignment
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Partially Available
          </CardTitle>
          <PauseCircle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {teamMembers.filter((m) => m.availability === "partially").length}
          </div>
          <p className="text-xs text-muted-foreground">
            Can take on limited tasks
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Busy</CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {teamMembers.filter((m) => m.availability === "busy").length}
          </div>
          <p className="text-xs text-muted-foreground">
            Close to capacity but managing
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unavailable</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {teamMembers.filter((m) => m.availability === "unavailable").length}
          </div>
          <p className="text-xs text-muted-foreground">
            At max capacity or on leave
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 