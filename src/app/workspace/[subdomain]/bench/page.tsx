"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CheckCircle2,
  PauseCircle,
  AlertCircle,
  Users,
  Calendar as CalendarIcon,
} from "lucide-react";

import { BenchMetrics } from "@/components/workspace/bench/BenchMetrics";
import { TeamAvailabilityTab } from "@/components/workspace/bench/TeamAvailabilityTab";
import { ProjectWorkloadTab } from "@/components/workspace/bench/ProjectWorkloadTab";
import { TeamAvailabilityCalendar } from "@/components/workspace/bench/TeamAvailabilityCalendar";
import { TeamAllocationTab } from "@/components/workspace/bench/TeamAllocationTab";

// Define a type for team members for better type safety
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  availability: "available" | "partially" | "busy" | "unavailable" | string;
  workload: number;
  currentProject: string;
  nextAvailable: string;
  skills: string[];
  assignedTasks: number;
  completedTasks: number;
}

// Define a type for project workload for better type safety
interface ProjectWorkload {
  name: string;
  assigned: number;
  completed: number;
  progress: number;
  team: number;
}

interface BenchPageProps {
  params: {
    subdomain: string;
  };
}

export default function BenchPage({ params }: BenchPageProps) {
  const { subdomain } = params;
  const [view, setView] = useState<"list" | "calendar">("list");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("current");

  // Sample team members with availability and workload data
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Full-stack Developer",
      avatar: "/avatars/john.jpg",
      availability: "busy",
      workload: 95,
      currentProject: "Mobile Banking App",
      nextAvailable: "2023-08-15",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      assignedTasks: 8,
      completedTasks: 3,
    },
    {
      id: "2",
      name: "Sarah Miller",
      role: "UI/UX Designer",
      avatar: "/avatars/sarah.jpg",
      availability: "available",
      workload: 30,
      currentProject: "E-commerce Website",
      nextAvailable: "now",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      assignedTasks: 3,
      completedTasks: 2,
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Backend Developer",
      avatar: "/avatars/michael.jpg",
      availability: "partially",
      workload: 65,
      currentProject: "CRM Integration",
      nextAvailable: "2023-07-05",
      skills: ["Python", "Django", "SQL", "Docker"],
      assignedTasks: 5,
      completedTasks: 4,
    },
    {
      id: "4",
      name: "Emily Williams",
      role: "Product Manager",
      avatar: "/avatars/emily.jpg",
      availability: "unavailable",
      workload: 100,
      currentProject: "Mobile Banking App",
      nextAvailable: "2023-08-20",
      skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
      assignedTasks: 12,
      completedTasks: 8,
    },
    {
      id: "5",
      name: "David Johnson",
      role: "QA Engineer",
      avatar: "/avatars/david.jpg",
      availability: "available",
      workload: 25,
      currentProject: "E-commerce Website",
      nextAvailable: "now",
      skills: ["Manual Testing", "Automated Testing", "Selenium", "Cypress"],
      assignedTasks: 2,
      completedTasks: 2,
    },
    {
      id: "6",
      name: "Lisa Taylor",
      role: "Frontend Developer",
      avatar: "/avatars/lisa.jpg",
      availability: "busy",
      workload: 85,
      currentProject: "Healthcare Platform",
      nextAvailable: "2023-07-30",
      skills: ["React", "Vue", "CSS", "JavaScript"],
      assignedTasks: 7,
      completedTasks: 4,
    },
    {
      id: "7",
      name: "Mark Wilson",
      role: "DevOps Engineer",
      avatar: "/avatars/mark.jpg",
      availability: "partially",
      workload: 50,
      currentProject: "CRM Integration",
      nextAvailable: "2023-07-10",
      skills: ["AWS", "CI/CD", "Kubernetes", "Terraform"],
      assignedTasks: 4,
      completedTasks: 2,
    },
    {
      id: "8",
      name: "Jessica Lee",
      role: "Mobile Developer",
      avatar: "/avatars/jessica.jpg",
      availability: "available",
      workload: 15,
      currentProject: "Mobile Banking App",
      nextAvailable: "now",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      assignedTasks: 1,
      completedTasks: 1,
    },
  ];

  // Project workload summary
  const projectWorkloadSummary: ProjectWorkload[] = [
    { name: "Mobile Banking App", assigned: 16, completed: 8, progress: 50, team: 3 },
    { name: "E-commerce Website", assigned: 12, completed: 9, progress: 75, team: 2 },
    { name: "CRM Integration", assigned: 9, completed: 6, progress: 67, team: 2 },
    { name: "Healthcare Platform", assigned: 7, completed: 4, progress: 57, team: 1 },
  ];

  // Get availability badge color
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "partially":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "busy":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "unavailable":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get availability icon
  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case "available":
        return <CheckCircle2 className="h-4 w-4" />;
      case "partially":
        return <PauseCircle className="h-4 w-4" />;
      case "busy":
        return <AlertCircle className="h-4 w-4" />;
      case "unavailable":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Bench (Subdomain: {subdomain})</h2>
          <p className="text-muted-foreground">
            Monitor team availability and workload allocation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2 items-center">
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              <Users className="h-4 w-4 mr-2" />
              Team List
            </Button>
            <Button
              variant={view === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("calendar")}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar View
            </Button>
          </div>
        </div>
      </div>

      <BenchMetrics teamMembers={teamMembers} />

      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team">Team Availability</TabsTrigger>
          <TabsTrigger value="projects">Project Workload</TabsTrigger>
          <TabsTrigger value="allocation">Team Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-4">
          <TeamAvailabilityTab
            teamMembers={teamMembers}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
            getAvailabilityColor={getAvailabilityColor}
            getAvailabilityIcon={getAvailabilityIcon}
          />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <ProjectWorkloadTab
            projectWorkloadSummary={projectWorkloadSummary}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <TeamAllocationTab />
        </TabsContent>
      </Tabs>

      {view === "calendar" && <TeamAvailabilityCalendar />}
    </div>
  );
} 