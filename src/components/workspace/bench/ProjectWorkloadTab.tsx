"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, PieChart, Gauge } from "lucide-react";

// Define a type for project workload for better type safety
interface ProjectWorkload {
  name: string;
  assigned: number;
  completed: number;
  progress: number;
  team: number;
}

interface ProjectWorkloadTabProps {
  projectWorkloadSummary: ProjectWorkload[];
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
}

export function ProjectWorkloadTab({
  projectWorkloadSummary,
  timeframe,
  setTimeframe,
}: ProjectWorkloadTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
          />
        </div>
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Sprint</SelectItem>
            <SelectItem value="next">Next Sprint</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Allocation</CardTitle>
            <CardDescription>
              Team members assigned to each project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectWorkloadSummary.map((project, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {project.team} team members assigned
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Progress value={project.progress} className="h-2 w-20" />
                    <div className="text-xs text-muted-foreground">
                      {project.completed}/{project.assigned} tasks completed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Capacity</CardTitle>
            <CardDescription>
              Overall workload and allocation for current sprint
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center space-y-2 text-muted-foreground">
              <Gauge className="h-12 w-12 mx-auto mb-2" />
              <div className="text-lg font-medium">Team Capacity: 68%</div>
              <div>
                <span className="text-green-600">3 available</span> ·
                <span className="text-yellow-600 mx-1">2 partially</span> ·
                <span className="text-orange-600">2 busy</span> ·
                <span className="text-red-600 ml-1">1 unavailable</span>
              </div>
              <div className="text-sm mt-2">
                32% additional capacity available for allocation
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Allocation</CardTitle>
          <CardDescription>
            How team members are allocated across projects
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-muted-foreground flex flex-col items-center">
            <PieChart className="h-12 w-12 mb-2" />
            <span>Resource allocation visualization will be displayed here</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 