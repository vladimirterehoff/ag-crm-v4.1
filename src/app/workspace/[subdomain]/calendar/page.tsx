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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Plus,
  Users,
  Video,
  MoreVertical,
  Check,
  Briefcase,
  Calendar as CalendarFull,
  Tag
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface CalendarPageProps {
  params: {
    subdomain: string;
  };
}

export default function CalendarPage({ params }: CalendarPageProps) {
  const { subdomain } = use(params);
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month");
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(["team", "projects", "meetings"]);
  
  // Sample calendar events
  const events = [
    {
      id: "1",
      title: "Weekly Team Standup",
      start: "2023-07-05T09:00:00",
      end: "2023-07-05T09:30:00",
      location: "Meeting Room 3",
      type: "meeting",
      attendees: ["John Doe", "Sarah Miller", "Michael Chen", "Emily Williams"],
      description: "Weekly standup to discuss progress and blockers",
      color: "#4338ca",
    },
    {
      id: "2",
      title: "Project Kickoff: Mobile Banking",
      start: "2023-07-06T13:00:00",
      end: "2023-07-06T14:30:00",
      location: "Conference Room A",
      type: "project",
      attendees: ["John Doe", "Emily Williams", "Jessica Lee"],
      description: "Initial kickoff meeting for the Mobile Banking App project",
      color: "#0e7490",
    },
    {
      id: "3",
      title: "Design Review",
      start: "2023-07-07T15:00:00",
      end: "2023-07-07T16:00:00",
      location: "Zoom Meeting",
      type: "meeting",
      attendees: ["Sarah Miller", "Lisa Taylor", "Emily Williams"],
      description: "Review latest UI designs for the E-commerce Website",
      color: "#4338ca",
    },
    {
      id: "4",
      title: "John Doe - Vacation",
      start: "2023-07-10T00:00:00",
      end: "2023-07-21T23:59:59",
      type: "time-off",
      description: "Annual family vacation",
      color: "#db2777",
    },
    {
      id: "5",
      title: "E-commerce Website Sprint Planning",
      start: "2023-07-10T10:00:00",
      end: "2023-07-10T12:00:00",
      location: "Meeting Room 2",
      type: "project",
      attendees: ["Sarah Miller", "David Johnson", "Michael Chen", "Emily Williams"],
      description: "Planning session for the next sprint on the E-commerce Website project",
      color: "#0e7490",
    },
    {
      id: "6",
      title: "API Integration Discussion",
      start: "2023-07-12T14:00:00",
      end: "2023-07-12T15:00:00",
      location: "Google Meet",
      type: "meeting",
      attendees: ["Michael Chen", "Mark Wilson", "John Doe"],
      description: "Discuss API integration strategy for the CRM project",
      color: "#4338ca",
    },
    {
      id: "7",
      title: "Team Lunch",
      start: "2023-07-14T12:00:00",
      end: "2023-07-14T13:30:00",
      location: "Downtown Grill",
      type: "team",
      attendees: ["All Team Members"],
      description: "Monthly team lunch - everyone welcome!",
      color: "#16a34a",
    },
    {
      id: "8",
      title: "Client Meeting: Acme Corp",
      start: "2023-07-17T11:00:00",
      end: "2023-07-17T12:00:00",
      location: "Client Office",
      type: "meeting",
      attendees: ["Emily Williams", "Sarah Miller", "Michael Chen"],
      description: "Discuss project progress and next steps with Acme Corp",
      color: "#4338ca",
    },
    {
      id: "9",
      title: "Michael Chen - Remote Work",
      start: "2023-07-17T00:00:00",
      end: "2023-07-28T23:59:59",
      type: "time-off",
      description: "Working from parents' home",
      color: "#0d9488",
    },
  ];

  // Calendar types config
  const calendarTypes = [
    { id: "team", label: "Team Events", color: "#16a34a" },
    { id: "projects", label: "Project Milestones", color: "#0e7490" },
    { id: "meetings", label: "Meetings", color: "#4338ca" },
    { id: "time-off", label: "Time Off", color: "#db2777" },
  ];

  // Toggle calendar type visibility
  const toggleCalendar = (id: string) => {
    setSelectedCalendars(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Filter events based on selected calendars
  const visibleEvents = events.filter(event => 
    selectedCalendars.includes(event.type)
  );

  // Get upcoming events (next 5 days)
  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);
  
  const upcomingEvents = visibleEvents
    .filter(event => new Date(event.start) >= today && new Date(event.start) <= fiveDaysLater)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    type: "meeting",
    description: "",
    attendees: [] as string[],
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual event creation
    console.log("Creating new event:", newEvent);
    setShowEventDialog(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      location: "",
      type: "meeting",
      description: "",
      attendees: [],
    });
  };

  // Sample team members for attendee selection
  const teamMembers = [
    { id: "1", name: "John Doe", role: "Full-stack Developer", avatar: "/avatars/john.jpg" },
    { id: "2", name: "Sarah Miller", role: "UI/UX Designer", avatar: "/avatars/sarah.jpg" },
    { id: "3", name: "Michael Chen", role: "Backend Developer", avatar: "/avatars/michael.jpg" },
    { id: "4", name: "Emily Williams", role: "Product Manager", avatar: "/avatars/emily.jpg" },
    { id: "5", name: "David Johnson", role: "QA Engineer", avatar: "/avatars/david.jpg" },
    { id: "6", name: "Lisa Taylor", role: "Frontend Developer", avatar: "/avatars/lisa.jpg" },
    { id: "7", name: "Mark Wilson", role: "DevOps Engineer", avatar: "/avatars/mark.jpg" },
    { id: "8", name: "Jessica Lee", role: "Mobile Developer", avatar: "/avatars/jessica.jpg" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Calendar</h2>
          <p className="text-muted-foreground">
            Schedule and manage team events, meetings, and time off.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Add a new event to the team calendar.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Weekly Team Standup"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start">Start Date & Time</Label>
                      <Input
                        id="start"
                        type="datetime-local"
                        value={newEvent.start}
                        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end">End Date & Time</Label>
                      <Input
                        id="end"
                        type="datetime-local"
                        value={newEvent.end}
                        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Meeting Room 1 or Zoom link"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team">Team Event</SelectItem>
                        <SelectItem value="projects">Project Milestone</SelectItem>
                        <SelectItem value="meetings">Meeting</SelectItem>
                        <SelectItem value="time-off">Time Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Event details and agenda"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Attendees</Label>
                    <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`attendee-${member.id}`}
                            checked={newEvent.attendees.includes(member.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewEvent({
                                  ...newEvent,
                                  attendees: [...newEvent.attendees, member.name],
                                });
                              } else {
                                setNewEvent({
                                  ...newEvent,
                                  attendees: newEvent.attendees.filter(name => name !== member.name),
                                });
                              }
                            }}
                          />
                          <Label
                            htmlFor={`attendee-${member.id}`}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>
                                {member.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Event</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold">July 2023</h2>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Tabs defaultValue="month" onValueChange={(value) => setCurrentView(value as "month" | "week" | "day")}>
                    <TabsList className="grid w-auto grid-cols-3">
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="day">Day</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] flex items-center justify-center">
                <div className="text-center space-y-2 text-muted-foreground">
                  <CalendarFull className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-lg font-medium">Calendar View</div>
                  <p className="text-sm">
                    {currentView === "month" && "Monthly calendar view will be displayed here"}
                    {currentView === "week" && "Weekly calendar view will be displayed here"}
                    {currentView === "day" && "Daily calendar view will be displayed here"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {calendarTypes.map((cal) => (
                  <div key={cal.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`calendar-${cal.id}`}
                      checked={selectedCalendars.includes(cal.id)}
                      onCheckedChange={() => toggleCalendar(cal.id)}
                    />
                    <Label
                      htmlFor={`calendar-${cal.id}`}
                      className="flex items-center cursor-pointer"
                    >
                      <div
                        className="h-3 w-3 rounded-full mr-2"
                        style={{ backgroundColor: cal.color }}
                      ></div>
                      <span>{cal.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Next 5 days
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No upcoming events in the next 5 days
                  </p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="border-l-4 pl-3 py-2 cursor-pointer hover:bg-muted rounded-sm"
                      style={{ borderLeftColor: event.color }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium">{event.title}</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Event</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel Event</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1 mt-1">
                        <div className="flex items-center">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                          <span>{formatDate(event.start)}</span>
                        </div>
                        {event.type !== "time-off" && (
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {event.attendees.length > 2
                                ? `${event.attendees[0]}, ${event.attendees[1]}, +${event.attendees.length - 2} more`
                                : event.attendees.join(", ")}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Tag className="h-3.5 w-3.5 mr-1" />
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            style={{ color: event.color, borderColor: event.color }}
                          >
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 