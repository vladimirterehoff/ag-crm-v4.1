"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  CheckCircle2,
  ListChecks,
  Plus,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Calendar,
  ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";

interface TasksPageProps {
  params: {
    subdomain: string;
  };
}

export default function TasksPage({ params }: TasksPageProps) {
  const subdomain = params.subdomain;
  const [view, setView] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  
  // Sample task data - in real implementation this would come from API
  const tasks = [
    {
      id: "1",
      title: "Implement authentication flow",
      description: "Set up user authentication with NextAuth.js",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-15",
      project: "Mobile Banking App",
      tags: ["frontend", "auth"],
    },
    {
      id: "2",
      title: "Design landing page",
      description: "Create wireframes and mockups for the marketing site",
      status: "in-progress",
      priority: "medium",
      assignee: "Emily Williams",
      dueDate: "2023-06-20",
      project: "E-commerce Website",
      tags: ["design", "ui"],
    },
    {
      id: "3",
      title: "Fix navigation bug on mobile",
      description: "Navbar doesn't collapse properly on small screens",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-10",
      project: "E-commerce Website",
      tags: ["bug", "mobile"],
    },
    {
      id: "4",
      title: "Implement API endpoints for user data",
      description: "Create REST endpoints for user profile management",
      status: "done",
      priority: "medium",
      assignee: "Michael Chen",
      dueDate: "2023-06-05",
      project: "CRM Integration",
      tags: ["backend", "api"],
    },
    {
      id: "5",
      title: "Write unit tests for payment module",
      description: "Improve test coverage for payment processing",
      status: "todo",
      priority: "low",
      assignee: "Sarah Miller",
      dueDate: "2023-06-25",
      project: "Mobile Banking App",
      tags: ["testing", "payments"],
    },
    {
      id: "6",
      title: "Setup CI/CD pipeline",
      description: "Configure GitHub Actions for automated deployment",
      status: "todo",
      priority: "medium",
      assignee: "David Johnson",
      dueDate: "2023-06-18",
      project: "CRM Integration",
      tags: ["devops"],
    },
    {
      id: "7",
      title: "Optimize database queries",
      description: "Improve performance of slow database operations",
      status: "in-progress",
      priority: "high",
      assignee: "Michael Chen",
      dueDate: "2023-06-12",
      project: "CRM Integration",
      tags: ["backend", "performance"],
    },
    {
      id: "8",
      title: "Implement dark mode",
      description: "Add theme switcher and dark mode styling",
      status: "done",
      priority: "low",
      assignee: "Emily Williams",
      dueDate: "2023-06-02",
      project: "E-commerce Website",
      tags: ["frontend", "ui"],
    },
  ];

  // Sample projects for filter
  const projects = [
    { id: "all", name: "All Projects" },
    { id: "1", name: "E-commerce Website" },
    { id: "2", name: "Mobile Banking App" },
    { id: "3", name: "CRM Integration" },
  ];

  // Filter tasks based on search query and selected project
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProject === "all" || task.project === projects.find(p => p.id === selectedProject)?.name;
    
    return matchesSearch && matchesProject;
  });

  // Group tasks by status for board view
  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === "todo"),
    "in-progress": filteredTasks.filter(task => task.status === "in-progress"),
    done: filteredTasks.filter(task => task.status === "done"),
  };

  // Priority badge colors
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

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Task created successfully!");
    setIsTaskDialogOpen(false);
    
    // In a real implementation, this would create a task via API
    // and update the UI
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage and track your team's tasks.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2 items-center">
            <Button 
              variant={view === "board" ? "default" : "outline"} 
              size="sm"
              onClick={() => setView("board")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Board
            </Button>
            <Button 
              variant={view === "list" ? "default" : "outline"} 
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
          <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateTask}>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Task title" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Task description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="project">Project</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.filter(p => p.id !== "all").map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assignee">Assignee</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Doe</SelectItem>
                          <SelectItem value="emily">Emily Williams</SelectItem>
                          <SelectItem value="michael">Michael Chen</SelectItem>
                          <SelectItem value="sarah">Sarah Miller</SelectItem>
                          <SelectItem value="david">David Johnson</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input type="date" id="dueDate" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsTaskDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {view === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* To Do Column */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-medium flex items-center">
                <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                To Do
                <Badge variant="outline" className="ml-2">
                  {tasksByStatus.todo.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {tasksByStatus.todo.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex justify-between items-center text-xs mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center" title={task.assignee}>
                          {task.assignee.split(" ").map(n => n[0]).join("")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-medium flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                In Progress
                <Badge variant="outline" className="ml-2">
                  {tasksByStatus["in-progress"].length}
                </Badge>
              </h3>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {tasksByStatus["in-progress"].map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex justify-between items-center text-xs mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center" title={task.assignee}>
                          {task.assignee.split(" ").map(n => n[0]).join("")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-medium flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                Done
                <Badge variant="outline" className="ml-2">
                  {tasksByStatus.done.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {tasksByStatus.done.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex justify-between items-center text-xs mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center" title={task.assignee}>
                          {task.assignee.split(" ").map(n => n[0]).join("")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>
              View all tasks in a list format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          task.status === "done" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                            : task.status === "in-progress" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }
                      >
                        {task.status === "in-progress" ? "In Progress" : 
                          task.status === "todo" ? "To Do" : "Done"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.project}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {task.assignee.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span>{task.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 