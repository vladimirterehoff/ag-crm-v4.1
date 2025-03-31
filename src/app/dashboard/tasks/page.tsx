import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Clock,
  Filter,
  Plus,
} from "lucide-react";
import Link from "next/link";

// Sample tasks data - in real implementation this would come from API
const tasks = [
  {
    id: "1",
    title: "Design homepage mockup",
    project: "E-commerce Website",
    priority: "High",
    status: "In Progress",
    dueDate: "2023-05-25",
    assignee: "John D.",
  },
  {
    id: "2",
    title: "Implement payment gateway",
    project: "E-commerce Website",
    priority: "Critical",
    status: "To Do",
    dueDate: "2023-06-02",
    assignee: "Sarah M.",
  },
  {
    id: "3",
    title: "Database optimization",
    project: "Mobile Banking App",
    priority: "Medium",
    status: "In Review",
    dueDate: "2023-05-20",
    assignee: "David P.",
  },
  {
    id: "4",
    title: "API integration with third-party service",
    project: "CRM Integration",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2023-05-30",
    assignee: "Mark S.",
  },
  {
    id: "5",
    title: "User testing feedback implementation",
    project: "Healthcare Platform",
    priority: "Low",
    status: "Completed",
    dueDate: "2023-05-15",
    assignee: "Robert L.",
  },
  {
    id: "6",
    title: "Data migration planning",
    project: "Logistics Dashboard",
    priority: "High",
    status: "To Do",
    dueDate: "2023-05-28",
    assignee: "Helen S.",
  },
  {
    id: "7",
    title: "Create automated test suite",
    project: "Mobile Banking App",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2023-06-05",
    assignee: "Emily R.",
  },
];

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Manage and track tasks across all your projects.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Priority</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Assignee</DropdownMenuItem>
              <DropdownMenuItem>Project</DropdownMenuItem>
              <DropdownMenuItem>Due Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href="/dashboard/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="to-do">To Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>View and manage all tasks.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        {task.status === "Completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : task.priority === "Critical" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : task.priority === "High" ? (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-blue-500" />
                        )}
                        <h3 className="font-semibold">{task.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div>Project: {task.project}</div>
                        <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                        <div>Assignee: {task.assignee}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : task.status === "In Review"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {task.status}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/tasks/${task.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-tasks">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Tasks assigned to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                My tasks will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="to-do">
          <Card>
            <CardHeader>
              <CardTitle>To Do</CardTitle>
              <CardDescription>Tasks that need to be started.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                To Do tasks will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-progress">
          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <CardDescription>Tasks currently being worked on.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                In Progress tasks will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
              <CardDescription>Tasks that have been finished.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                Completed tasks will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 