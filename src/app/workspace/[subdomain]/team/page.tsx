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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Clock,
  Briefcase,
  Slash,
  Filter,
  UserCog,
  ChevronDown,
  MoreHorizontal,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamPageProps {
  params: {
    subdomain: string;
  };
}

export default function TeamPage({ params }: TeamPageProps) {
  const subdomain = params.subdomain;
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  // Sample team members data
  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      role: "Full-stack Developer",
      department: "Engineering",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      timeZone: "GMT-7",
      avatar: "/avatars/john.jpg",
      projects: ["Mobile Banking App", "CRM Integration"],
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      startDate: "2021-03-15",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Miller",
      role: "UI/UX Designer",
      department: "Design",
      email: "sarah.miller@example.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      timeZone: "GMT-4",
      avatar: "/avatars/sarah.jpg",
      projects: ["E-commerce Website"],
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      startDate: "2022-01-10",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Backend Developer",
      department: "Engineering",
      email: "michael.chen@example.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      timeZone: "GMT-5",
      avatar: "/avatars/michael.jpg",
      projects: ["CRM Integration"],
      skills: ["Python", "Django", "SQL", "Docker"],
      startDate: "2020-11-05",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Williams",
      role: "Product Manager",
      department: "Product",
      email: "emily.williams@example.com",
      phone: "+1 (555) 789-0123",
      location: "Chicago, IL",
      timeZone: "GMT-5",
      avatar: "/avatars/emily.jpg",
      projects: ["Mobile Banking App"],
      skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
      startDate: "2021-06-22",
      status: "active",
    },
    {
      id: "5",
      name: "David Johnson",
      role: "QA Engineer",
      department: "Engineering",
      email: "david.johnson@example.com",
      phone: "+1 (555) 234-5678",
      location: "Seattle, WA",
      timeZone: "GMT-7",
      avatar: "/avatars/david.jpg",
      projects: ["E-commerce Website"],
      skills: ["Manual Testing", "Automated Testing", "Selenium", "Cypress"],
      startDate: "2022-03-01",
      status: "active",
    },
    {
      id: "6",
      name: "Lisa Taylor",
      role: "Frontend Developer",
      department: "Engineering",
      email: "lisa.taylor@example.com",
      phone: "+1 (555) 345-6789",
      location: "Denver, CO",
      timeZone: "GMT-6",
      avatar: "/avatars/lisa.jpg",
      projects: ["Healthcare Platform"],
      skills: ["React", "Vue", "CSS", "JavaScript"],
      startDate: "2021-09-15",
      status: "active",
    },
    {
      id: "7",
      name: "Mark Wilson",
      role: "DevOps Engineer",
      department: "Operations",
      email: "mark.wilson@example.com",
      phone: "+1 (555) 567-8901",
      location: "Portland, OR",
      timeZone: "GMT-7",
      avatar: "/avatars/mark.jpg",
      projects: ["CRM Integration"],
      skills: ["AWS", "CI/CD", "Kubernetes", "Terraform"],
      startDate: "2020-08-03",
      status: "active",
    },
    {
      id: "8",
      name: "Jessica Lee",
      role: "Mobile Developer",
      department: "Engineering",
      email: "jessica.lee@example.com",
      phone: "+1 (555) 678-9012",
      location: "Boston, MA",
      timeZone: "GMT-4",
      avatar: "/avatars/jessica.jpg",
      projects: ["Mobile Banking App"],
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      startDate: "2022-02-14",
      status: "active",
    },
  ];

  // Get unique departments
  const departments = Array.from(new Set(teamMembers.map((member) => member.department)));
  
  // Get unique roles
  const roles = Array.from(new Set(teamMembers.map((member) => member.role)));

  // Filter team members
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  // Form state for inviting a new team member
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  // Handle invite form submission
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual invitation logic
    console.log("Inviting new member:", newMember);
    setInviteDialogOpen(false);
    setNewMember({ name: "", email: "", role: "", department: "" });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team</h2>
          <p className="text-muted-foreground">
            Manage team members and their roles.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Team Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your workspace.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInviteSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newMember.role}
                      onValueChange={(value) => setNewMember({ ...newMember, role: value })}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={newMember.department}
                      onValueChange={(value) => setNewMember({ ...newMember, department: value })}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem key={department} value={department}>
                            {department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Invitation</Button>
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
            placeholder="Search team members..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 2H2.5C2.22386 2 2 2.22386 2 2.5V7H7V2ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("list")}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44772 13 2 12.5523 2 12V3ZM3 3H12V12H3V3ZM4 5C4 4.44772 4.44772 4 5 4H10C10.5523 4 11 4.44772 11 5C11 5.55228 10.5523 6 10 6H5C4.44772 6 4 5.55228 4 5ZM4 8C4 7.44772 4.44772 7 5 7H10C10.5523 7 11 7.44772 11 8C11 8.55228 10.5523 9 10 9H5C4.44772 9 4 8.55228 4 8ZM4 11C4 10.4477 4.44772 10 5 10H10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12H5C4.44772 12 4 11.5523 4 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTeamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-16"></div>
              </CardHeader>
              <CardContent className="pt-0 relative">
                <div className="flex justify-between">
                  <Avatar className="h-16 w-16 border-4 border-background -mt-8">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 mt-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Remove from Team</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2 mt-2">
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                  <Badge variant="secondary">{member.department}</Badge>
                  <div className="grid gap-2 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{member.timeZone}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-medium text-muted-foreground mb-1">PROJECTS</div>
                    <div className="flex flex-wrap gap-1">
                      {member.projects.map((project, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage and organize your team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTeamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{member.department}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <UserCog className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Remove from Team</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 