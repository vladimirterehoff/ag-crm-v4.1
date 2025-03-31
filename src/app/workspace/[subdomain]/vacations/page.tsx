"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Search,
  Filter,
  PlusCircle,
  CheckCircle,
  XCircle,
  Clock,
  CalendarDays,
  CalendarOff,
  User,
  MapPin,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface VacationsPageProps {
  params: {
    subdomain: string;
  };
}

export default function VacationsPage({ params }: VacationsPageProps) {
  const subdomain = params.subdomain;
  const [activeTab, setActiveTab] = useState("requests");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("upcoming");
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  
  // Sample vacation requests
  const vacationRequests = [
    {
      id: "1",
      employeeName: "John Doe",
      employeeRole: "Full-stack Developer",
      employeeAvatar: "/avatars/john.jpg",
      type: "vacation",
      startDate: "2023-07-10",
      endDate: "2023-07-21",
      duration: 10,
      status: "approved",
      reason: "Annual family vacation",
      approvedBy: "Sarah Miller",
      requestDate: "2023-06-15",
    },
    {
      id: "2",
      employeeName: "Sarah Miller",
      employeeRole: "UI/UX Designer",
      employeeAvatar: "/avatars/sarah.jpg",
      type: "sick",
      startDate: "2023-07-05",
      endDate: "2023-07-07",
      duration: 3,
      status: "pending",
      reason: "Doctor appointment and recovery",
      approvedBy: "",
      requestDate: "2023-07-04",
    },
    {
      id: "3",
      employeeName: "Michael Chen",
      employeeRole: "Backend Developer",
      employeeAvatar: "/avatars/michael.jpg",
      type: "remote",
      startDate: "2023-07-17",
      endDate: "2023-07-28",
      duration: 10,
      status: "approved",
      reason: "Working from parents' home",
      approvedBy: "Emily Williams",
      requestDate: "2023-06-30",
    },
    {
      id: "4",
      employeeName: "Emily Williams",
      employeeRole: "Product Manager",
      employeeAvatar: "/avatars/emily.jpg",
      type: "vacation",
      startDate: "2023-08-07",
      endDate: "2023-08-18",
      duration: 10,
      status: "pending",
      reason: "Summer holiday",
      approvedBy: "",
      requestDate: "2023-07-01",
    },
    {
      id: "5",
      employeeName: "David Johnson",
      employeeRole: "QA Engineer",
      employeeAvatar: "/avatars/david.jpg",
      type: "vacation",
      startDate: "2023-09-11",
      endDate: "2023-09-15",
      duration: 5,
      status: "pending",
      reason: "Wedding anniversary trip",
      approvedBy: "",
      requestDate: "2023-07-03",
    },
    {
      id: "6",
      employeeName: "Lisa Taylor",
      employeeRole: "Frontend Developer",
      employeeAvatar: "/avatars/lisa.jpg",
      type: "sick",
      startDate: "2023-07-03",
      endDate: "2023-07-03",
      duration: 1,
      status: "approved",
      reason: "Migraine",
      approvedBy: "John Doe",
      requestDate: "2023-07-03",
    },
    {
      id: "7",
      employeeName: "Mark Wilson",
      employeeRole: "DevOps Engineer",
      employeeAvatar: "/avatars/mark.jpg",
      type: "vacation",
      startDate: "2023-07-24",
      endDate: "2023-08-04",
      duration: 10,
      status: "rejected",
      reason: "Family reunion",
      approvedBy: "Emily Williams",
      requestDate: "2023-06-20",
      rejectionReason: "Critical deployment scheduled during this period",
    },
  ];

  // Filter vacation requests
  const filteredRequests = vacationRequests.filter((request) => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filter === "all" || request.status === filter;
    const today = new Date();
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    
    let matchesDateRange = true;
    if (dateRange === "upcoming") {
      matchesDateRange = startDate >= today;
    } else if (dateRange === "past") {
      matchesDateRange = endDate < today;
    } else if (dateRange === "current") {
      matchesDateRange = startDate <= today && endDate >= today;
    }
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Sample employee time-off balances
  const employeeBalances = [
    {
      id: "1",
      name: "John Doe",
      role: "Full-stack Developer",
      avatar: "/avatars/john.jpg",
      vacationTotal: 25,
      vacationUsed: 12,
      vacationRemaining: 13,
      sickTotal: 10,
      sickUsed: 2,
      sickRemaining: 8,
    },
    {
      id: "2",
      name: "Sarah Miller",
      role: "UI/UX Designer",
      avatar: "/avatars/sarah.jpg",
      vacationTotal: 25,
      vacationUsed: 8,
      vacationRemaining: 17,
      sickTotal: 10,
      sickUsed: 5,
      sickRemaining: 5,
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Backend Developer",
      avatar: "/avatars/michael.jpg",
      vacationTotal: 20,
      vacationUsed: 5,
      vacationRemaining: 15,
      sickTotal: 10,
      sickUsed: 0,
      sickRemaining: 10,
    },
    {
      id: "4",
      name: "Emily Williams",
      role: "Product Manager",
      avatar: "/avatars/emily.jpg",
      vacationTotal: 25,
      vacationUsed: 15,
      vacationRemaining: 10,
      sickTotal: 10,
      sickUsed: 3,
      sickRemaining: 7,
    },
  ];

  // Sample team calendar events (who's out when)
  const calendarEvents = [
    {
      id: "1",
      title: "John Doe - Vacation",
      start: "2023-07-10",
      end: "2023-07-21",
      backgroundColor: "#4f46e5",
    },
    {
      id: "3",
      title: "Michael Chen - Remote Work",
      start: "2023-07-17",
      end: "2023-07-28",
      backgroundColor: "#059669",
    },
    {
      id: "6",
      title: "Lisa Taylor - Sick Day",
      start: "2023-07-03",
      end: "2023-07-03",
      backgroundColor: "#d97706",
    },
  ];

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Get type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "vacation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "sick":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "remote":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Form state for new request
  const [newRequest, setNewRequest] = useState({
    type: "vacation",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Handle request form submission
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual request submission logic
    console.log("Submitting new request:", newRequest);
    setRequestDialogOpen(false);
    setNewRequest({
      type: "vacation",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Time Off & Vacations</h2>
          <p className="text-muted-foreground">
            Manage vacation requests and track time-off balances.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Request Time Off
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Time Off</DialogTitle>
                <DialogDescription>
                  Submit a new time off request for approval.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRequestSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type of Leave</Label>
                    <Select 
                      value={newRequest.type} 
                      onValueChange={(value) => setNewRequest({ ...newRequest, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="remote">Remote Work</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe the reason for your time off request"
                      value={newRequest.reason}
                      onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vacationRequests.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review and approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Team Members Out Today
            </CardTitle>
            <CalendarOff className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calendarEvents.filter(e => {
                const today = new Date().toISOString().split('T')[0];
                return new Date(e.start) <= new Date(today) && new Date(e.end) >= new Date(today);
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              People on vacation or leave today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your Vacation Balance
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employeeBalances[0].vacationRemaining} days
            </div>
            <div className="flex items-center pt-1">
              <Progress value={(employeeBalances[0].vacationUsed / employeeBalances[0].vacationTotal) * 100} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              {employeeBalances[0].vacationUsed} used of {employeeBalances[0].vacationTotal} total days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="balances">Time-Off Balances</TabsTrigger>
          <TabsTrigger value="calendar">Team Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-4">
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search by name..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="current">Currently Active</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Time Off Requests</CardTitle>
              <CardDescription>
                View and manage employee time off requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={request.employeeAvatar} alt={request.employeeName} />
                            <AvatarFallback>
                              {request.employeeName.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employeeName}</div>
                            <div className="text-sm text-muted-foreground">{request.employeeRole}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(request.type)}>
                          {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {new Date(request.startDate).toLocaleDateString()} 
                          </span>
                          <span className="text-sm text-muted-foreground">
                            to {new Date(request.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.duration} {request.duration === 1 ? 'day' : 'days'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="truncate max-w-[200px] block" title={request.reason}>
                          {request.reason}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-8 text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 text-red-600">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {request.status !== "pending" && (
                          <Button size="sm" variant="ghost" className="h-8">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balances" className="space-y-4">
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search by name..." 
                className="pl-8" 
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Time-Off Balances</CardTitle>
              <CardDescription>
                Track employee vacation and sick day balances.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Vacation Days</TableHead>
                    <TableHead>Sick Days</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeBalances.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>
                              {employee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {employee.vacationRemaining} of {employee.vacationTotal} remaining
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round((employee.vacationRemaining / employee.vacationTotal) * 100)}%
                            </span>
                          </div>
                          <Progress value={(employee.vacationRemaining / employee.vacationTotal) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {employee.sickRemaining} of {employee.sickTotal} remaining
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round((employee.sickRemaining / employee.sickTotal) * 100)}%
                            </span>
                          </div>
                          <Progress value={(employee.sickRemaining / employee.sickTotal) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">
                          <User className="h-4 w-4 mr-1" />
                          Adjust Balance
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Time Off Calendar</CardTitle>
                <CardDescription>
                  See when team members are out of office.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex items-center justify-center">
                <div className="text-muted-foreground flex flex-col items-center">
                  <Calendar className="h-12 w-12 mb-2" />
                  <span>Team calendar will be displayed here</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:w-80">
              <CardHeader>
                <CardTitle>Upcoming Time Off</CardTitle>
                <CardDescription>
                  Team members out in the next 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {calendarEvents
                    .filter(event => {
                      const now = new Date();
                      const thirtyDaysFromNow = new Date();
                      thirtyDaysFromNow.setDate(now.getDate() + 30);
                      const startDate = new Date(event.start);
                      return startDate >= now && startDate <= thirtyDaysFromNow;
                    })
                    .map((event) => {
                      const member = vacationRequests.find(
                        (req) => req.id === event.id
                      );
                      return (
                        <div key={event.id} className="flex items-center gap-3 pb-3 border-b">
                          {member && (
                            <Avatar>
                              <AvatarImage src={member.employeeAvatar} alt={member.employeeName} />
                              <AvatarFallback>
                                {member.employeeName.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{event.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(event.start).toLocaleDateString()} - {new Date(event.end).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  View All Out of Office
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 