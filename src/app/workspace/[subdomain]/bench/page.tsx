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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  Clock,
  Search,
  SlidersHorizontal,
  Calendar,
  Briefcase,
  PieChart,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  ArrowUpRight,
  Users,
  Filter,
  Gauge,
} from "lucide-react";

interface BenchPageProps {
  params: {
    subdomain: string;
  };
}

export default function BenchPage({ params }: BenchPageProps) {
  const { subdomain } = use(params);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("current");
  
  // Sample team members with availability and workload data
  const teamMembers = [
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

  // Filter team members based on availability and search query
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || member.availability === filter;
    
    return matchesSearch && matchesFilter;
  });

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

  // Project workload summary
  const projectWorkloadSummary = [
    { name: "Mobile Banking App", assigned: 16, completed: 8, progress: 50, team: 3 },
    { name: "E-commerce Website", assigned: 12, completed: 9, progress: 75, team: 2 },
    { name: "CRM Integration", assigned: 9, completed: 6, progress: 67, team: 2 },
    { name: "Healthcare Platform", assigned: 7, completed: 4, progress: 57, team: 1 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Bench</h2>
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
              <Calendar className="h-4 w-4 mr-2" />
              Calendar View
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Now
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.availability === "available").length}
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
              {teamMembers.filter(m => m.availability === "partially").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Can take on limited tasks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Busy
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.availability === "busy").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Close to capacity but managing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unavailable
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers.filter(m => m.availability === "unavailable").length}
            </div>
            <p className="text-xs text-muted-foreground">
              At max capacity or on leave
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="team" className="space-y-4">
        <TabsList>
          <TabsTrigger value="team">Team Availability</TabsTrigger>
          <TabsTrigger value="projects">Project Workload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team" className="space-y-4">
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search team members..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="partially">Partially Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Team Availability</CardTitle>
              <CardDescription>
                Current workload and availability of team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Current Project</TableHead>
                    <TableHead>Next Available</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getAvailabilityColor(member.availability)}>
                          <span className="flex items-center gap-1">
                            {getAvailabilityIcon(member.availability)}
                            {member.availability.charAt(0).toUpperCase() + member.availability.slice(1)}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={member.workload} className="h-2 w-20" />
                          <span className="text-sm">
                            {member.workload}% ({member.completedTasks}/{member.assignedTasks} tasks)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                          {member.currentProject}
                        </span>
                      </TableCell>
                      <TableCell>
                        {member.nextAvailable === "now" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Now</Badge>
                        ) : (
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                            {new Date(member.nextAvailable).toLocaleDateString()}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 2).map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 2 && (
                            <Badge variant="outline">+{member.skills.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
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
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
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
                    <div key={idx} className="flex items-center justify-between">
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
        </TabsContent>
      </Tabs>

      {view === "calendar" && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Team Availability Calendar</CardTitle>
            <CardDescription>
              View team member availability across time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center">
              <Calendar className="h-12 w-12 mb-2" />
              <span>Availability calendar will be displayed here</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 