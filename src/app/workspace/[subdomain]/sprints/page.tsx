"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Plus,
  ChevronRight,
  Search,
  CalendarDays,
  Layers,
  Target,
  ChevronsUpDown,
  Flag,
  ListChecks,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface SprintsPageProps {
  params: {
    subdomain: string;
  };
}

export default function SprintsPage({ params }: SprintsPageProps) {
  const subdomain = params.subdomain;
  const [activeTab, setActiveTab] = useState("epics");
  const [showNewSprintDialog, setShowNewSprintDialog] = useState(false);
  const [showNewEpicDialog, setShowNewEpicDialog] = useState(false);

  // Sample epics data
  const epics = [
    {
      id: "epic-1",
      name: "User Authentication & Authorization",
      description: "Implement secure auth system with role-based permissions",
      status: "in-progress",
      progress: 65,
      startDate: "2023-05-01",
      targetDate: "2023-07-15",
      priority: "high",
      assignee: "John Doe",
      totalStories: 18,
      completedStories: 12,
    },
    {
      id: "epic-2",
      name: "Payment Processing Integration",
      description: "Integrate with Stripe and PayPal for secure payments",
      status: "planning",
      progress: 20,
      startDate: "2023-06-01",
      targetDate: "2023-08-30",
      priority: "high",
      assignee: "Sarah Miller",
      totalStories: 14,
      completedStories: 3,
    },
    {
      id: "epic-3",
      name: "Mobile Responsive Design",
      description: "Ensure website works seamlessly across all devices",
      status: "in-progress",
      progress: 40,
      startDate: "2023-05-15",
      targetDate: "2023-07-30",
      priority: "medium",
      assignee: "Emily Williams",
      totalStories: 12,
      completedStories: 5,
    },
    {
      id: "epic-4",
      name: "Analytics Dashboard",
      description: "Implement realtime analytics dashboard for administrators",
      status: "not-started",
      progress: 0,
      startDate: "2023-08-01",
      targetDate: "2023-10-15",
      priority: "low",
      assignee: "Michael Chen",
      totalStories: 10,
      completedStories: 0,
    },
    {
      id: "epic-5",
      name: "Product Recommendations Engine",
      description: "Build ML-based recommendations for related products",
      status: "done",
      progress: 100,
      startDate: "2023-03-01",
      targetDate: "2023-05-15",
      priority: "medium",
      assignee: "David Johnson",
      totalStories: 16,
      completedStories: 16,
    },
  ];

  // Sample sprints data
  const sprints = [
    {
      id: "sprint-1",
      name: "Sprint 23.06.1",
      status: "completed",
      startDate: "2023-06-01",
      endDate: "2023-06-15",
      goal: "Implement user authentication and basic checkout flow",
      completedStories: 14,
      totalStories: 14,
      progress: 100,
      team: ["John Doe", "Sarah Miller", "Emily Williams"],
    },
    {
      id: "sprint-2",
      name: "Sprint 23.06.2",
      status: "active",
      startDate: "2023-06-16",
      endDate: "2023-06-30",
      goal: "Complete payment integration and mobile responsiveness",
      completedStories: 7,
      totalStories: 12,
      progress: 58,
      team: ["John Doe", "Sarah Miller", "Michael Chen", "David Johnson"],
    },
    {
      id: "sprint-3",
      name: "Sprint 23.07.1",
      status: "planned",
      startDate: "2023-07-01",
      endDate: "2023-07-15",
      goal: "Finalize user profiles and implement social sharing",
      completedStories: 0,
      totalStories: 15,
      progress: 0,
      team: ["Emily Williams", "Michael Chen", "David Johnson"],
    },
    {
      id: "sprint-4",
      name: "Sprint 23.07.2",
      status: "planned",
      startDate: "2023-07-16",
      endDate: "2023-07-31",
      goal: "API optimizations and performance improvements",
      completedStories: 0,
      totalStories: 13,
      progress: 0,
      team: ["John Doe", "Michael Chen"],
    },
  ];

  const handleCreateEpic = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Epic created successfully!");
    setShowNewEpicDialog(false);
  };

  const handleCreateSprint = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Sprint created successfully!");
    setShowNewSprintDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "done":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "active":
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "planned":
      case "planning":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sprints & Epics</h2>
          <p className="text-muted-foreground">
            Plan and track your development cycles.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showNewEpicDialog} onOpenChange={setShowNewEpicDialog}>
            <DialogTrigger asChild>
              <Button variant={activeTab === "epics" ? "default" : "outline"}>
                <Plus className="mr-2 h-4 w-4" />
                New Epic
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateEpic}>
                <DialogHeader>
                  <DialogTitle>Create New Epic</DialogTitle>
                  <DialogDescription>
                    Add a new epic to track large features or initiatives.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="epicName">Epic Name</Label>
                    <Input id="epicName" placeholder="Epic name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="epicDescription">Description</Label>
                    <Input id="epicDescription" placeholder="Epic description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input type="date" id="startDate" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="targetDate">Target Completion Date</Label>
                      <Input type="date" id="targetDate" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Set priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assignee">Epic Owner</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign owner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Doe</SelectItem>
                          <SelectItem value="sarah">Sarah Miller</SelectItem>
                          <SelectItem value="emily">Emily Williams</SelectItem>
                          <SelectItem value="michael">Michael Chen</SelectItem>
                          <SelectItem value="david">David Johnson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setShowNewEpicDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Epic</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewSprintDialog} onOpenChange={setShowNewSprintDialog}>
            <DialogTrigger asChild>
              <Button variant={activeTab === "sprints" ? "default" : "outline"}>
                <Plus className="mr-2 h-4 w-4" />
                New Sprint
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateSprint}>
                <DialogHeader>
                  <DialogTitle>Create New Sprint</DialogTitle>
                  <DialogDescription>
                    Plan a new sprint for your development cycle.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sprintName">Sprint Name</Label>
                    <Input id="sprintName" placeholder="Sprint name (e.g. Sprint 23.07.1)" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sprintGoal">Sprint Goal</Label>
                    <Input id="sprintGoal" placeholder="What do you want to achieve in this sprint?" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="sprintStartDate">Start Date</Label>
                      <Input type="date" id="sprintStartDate" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="sprintEndDate">End Date</Label>
                      <Input type="date" id="sprintEndDate" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setShowNewSprintDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Sprint</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="epics" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="epics">Epics</TabsTrigger>
          <TabsTrigger value="sprints">Sprints</TabsTrigger>
        </TabsList>
        
        <TabsContent value="epics" className="space-y-4">
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search epics..." 
                className="pl-8" 
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {epics.map((epic) => (
              <Card key={epic.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Flag className="h-4 w-4 mr-2 text-primary" />
                        {epic.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {epic.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(epic.status)}>
                      {epic.status === "in-progress" ? "In Progress" : 
                       epic.status === "not-started" ? "Not Started" : 
                       epic.status.charAt(0).toUpperCase() + epic.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Priority</p>
                      <Badge className={getPriorityColor(epic.priority)}>
                        {epic.priority.charAt(0).toUpperCase() + epic.priority.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Owner</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {epic.assignee.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm">{epic.assignee}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Timeline</p>
                      <div className="flex items-center text-sm mt-1">
                        <CalendarDays className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>
                          {new Date(epic.startDate).toLocaleDateString()} - {new Date(epic.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={epic.progress} className="h-2" />
                        <span className="text-sm">{epic.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <ListChecks className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>
                        {epic.completedStories} / {epic.totalStories} stories completed
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sprints" className="space-y-4">
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search sprints..." 
                className="pl-8" 
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {sprints.map((sprint) => (
              <Card key={sprint.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{sprint.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {sprint.goal}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(sprint.status)}>
                      {sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Sprint Duration</p>
                      <div className="flex items-center text-sm mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>
                          {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Team</p>
                      <div className="flex -space-x-2 mt-1">
                        {sprint.team.slice(0, 3).map((member, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center border-2 border-background"
                            title={member}
                          >
                            {member.split(" ").map(n => n[0]).join("")}
                          </div>
                        ))}
                        {sprint.team.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs border-2 border-background">
                            +{sprint.team.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={sprint.progress} className="h-2" />
                        <span className="text-sm">{sprint.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <ListChecks className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>
                        {sprint.completedStories} / {sprint.totalStories} stories completed
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 