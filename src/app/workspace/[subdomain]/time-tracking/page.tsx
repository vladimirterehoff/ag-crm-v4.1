"use client";

import { useState, use } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  Calendar,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface TimeTrackingPageProps {
  params: {
    subdomain: string;
  };
}

export default function TimeTrackingPage({ params }: TimeTrackingPageProps) {
  const { subdomain } = use(params);
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  
  // Sample time entries - in real implementation this would come from API
  const timeEntries = [
    {
      id: "1",
      project: "E-commerce Website",
      task: "Homepage Design",
      date: "2023-05-10",
      startTime: "09:30",
      endTime: "12:15",
      duration: "2h 45m",
      description: "Designing homepage mockups",
    },
    {
      id: "2",
      project: "Mobile Banking App",
      task: "User Authentication",
      date: "2023-05-10",
      startTime: "13:00",
      endTime: "17:30",
      duration: "4h 30m",
      description: "Implementing user login and registration",
    },
    {
      id: "3",
      project: "E-commerce Website",
      task: "Product Listing Page",
      date: "2023-05-09",
      startTime: "10:00",
      endTime: "15:45",
      duration: "5h 45m",
      description: "Creating product grid layout",
    },
    {
      id: "4",
      project: "CRM Integration",
      task: "API Development",
      date: "2023-05-09",
      startTime: "08:30",
      endTime: "12:00",
      duration: "3h 30m",
      description: "Creating RESTful APIs for customer data",
    },
    {
      id: "5",
      project: "Mobile Banking App",
      task: "Push Notifications",
      date: "2023-05-08",
      startTime: "14:00",
      endTime: "18:30",
      duration: "4h 30m",
      description: "Implementing push notifications for transactions",
    },
  ];

  // Sample projects for the dropdown
  const projects = [
    { id: "1", name: "E-commerce Website" },
    { id: "2", name: "Mobile Banking App" },
    { id: "3", name: "CRM Integration" },
    { id: "4", name: "Healthcare Platform" },
    { id: "5", name: "Logistics Dashboard" },
  ];

  // Sample tasks for the dropdown
  const tasks = [
    { id: "1", name: "Homepage Design" },
    { id: "2", name: "User Authentication" },
    { id: "3", name: "Product Listing Page" },
    { id: "4", name: "API Development" },
    { id: "5", name: "Push Notifications" },
  ];

  const handleStartTimer = () => {
    if (!activeTimer) {
      toast.error("Please select a project and task first");
      return;
    }
    
    setTimerRunning(true);
    toast.success(`Timer started for ${activeTimer}`);
    
    // In a real implementation, this would start tracking time
    // and update the elapsedTime state
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
    toast.success("Time entry saved");
    
    // In a real implementation, this would stop tracking time
    // and save the time entry
  };

  const handleExportTimesheet = () => {
    toast.success("Timesheet exported");
    // In a real implementation, this would generate and download
    // a CSV or PDF report of time entries
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Time Tracking</h2>
          <p className="text-muted-foreground">
            Track time spent on projects and tasks.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportTimesheet}>
            <Download className="mr-2 h-4 w-4" />
            Export Timesheet
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Timer</CardTitle>
            <CardDescription>
              Track time for the current task you&apos;re working on.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium">
                  Project
                </label>
                <Select 
                  onValueChange={(value) => {
                    const project = projects.find(p => p.id === value);
                    const task = tasks.find(t => t.id === "1"); // Default to first task
                    setActiveTimer(`${project?.name} / ${task?.name}`);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="task" className="text-sm font-medium">
                  Task
                </label>
                <Select
                  onValueChange={(value) => {
                    const task = tasks.find(t => t.id === value);
                    if (activeTimer) {
                      const projectName = activeTimer.split(' / ')[0];
                      setActiveTimer(`${projectName} / ${task?.name}`);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map((task) => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description (optional)
              </label>
              <textarea 
                className="w-full h-20 p-2 border rounded-md"
                placeholder="What are you working on?"
              />
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="text-3xl font-mono">{elapsedTime}</div>
              <div>
                {!timerRunning ? (
                  <Button 
                    onClick={handleStartTimer}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </Button>
                ) : (
                  <Button 
                    onClick={handleStopTimer}
                    variant="destructive"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Time Summary</CardTitle>
            <CardDescription>
              Overview of your time tracked this week.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                <Calendar className="inline-block mr-2 h-4 w-4" />
                May 8 - May 14, 2023
              </span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4 text-center">
                <div className="text-3xl font-bold">21h 00m</div>
                <div className="text-sm text-muted-foreground">
                  Total Hours This Week
                </div>
              </div>
              <div className="border rounded-md p-4 text-center">
                <div className="text-3xl font-bold">4h 12m</div>
                <div className="text-sm text-muted-foreground">
                  Daily Average
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Project Breakdown</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>E-commerce Website</span>
                    <span className="font-medium">8h 30m (40%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Mobile Banking App</span>
                    <span className="font-medium">9h 00m (43%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "43%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>CRM Integration</span>
                    <span className="font-medium">3h 30m (17%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "17%" }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1">
            <CardTitle>Recent Time Entries</CardTitle>
            <CardDescription>
              Your tracked time for the last 7 days.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-1 h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.project}</TableCell>
                  <TableCell>{entry.task}</TableCell>
                  <TableCell>{entry.startTime}</TableCell>
                  <TableCell>{entry.endTime}</TableCell>
                  <TableCell className="font-medium">{entry.duration}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={entry.description}>
                    {entry.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 