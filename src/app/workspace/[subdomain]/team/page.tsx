"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  EditIcon,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface TeamPageProps {
  params: {
    subdomain: string;
  };
}

export default function TeamPage({ params }: TeamPageProps) {
  const { subdomain } = use(params);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  
  // Sample team data - in real implementation this would come from API
  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      avatar: "/avatars/john.jpg",
      joinDate: "2021-05-12",
      projects: 8,
      tasks: 24
    },
    {
      id: "2",
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      role: "Designer",
      department: "Design",
      status: "Active",
      avatar: "/avatars/sarah.jpg",
      joinDate: "2022-02-18",
      projects: 6,
      tasks: 19
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "Tech Lead",
      department: "Engineering",
      status: "Active",
      avatar: "/avatars/michael.jpg",
      joinDate: "2020-11-05",
      projects: 12,
      tasks: 42
    },
    {
      id: "4",
      name: "Emily Williams",
      email: "emily.williams@example.com",
      role: "Product Manager",
      department: "Product",
      status: "Vacation",
      avatar: "/avatars/emily.jpg",
      joinDate: "2021-08-30",
      projects: 10,
      tasks: 36
    },
    {
      id: "5",
      name: "David Johnson",
      email: "david.johnson@example.com",
      role: "QA Engineer",
      department: "Quality Assurance",
      status: "Active",
      avatar: "/avatars/david.jpg",
      joinDate: "2022-04-15",
      projects: 5,
      tasks: 28
    },
    {
      id: "6",
      name: "Jennifer Lopez",
      email: "jennifer.lopez@example.com",
      role: "Marketing Specialist",
      department: "Marketing",
      status: "Pending",
      avatar: "/avatars/jennifer.jpg",
      joinDate: "2023-01-10",
      projects: 3,
      tasks: 11
    },
  ];

  // Roles for dropdown
  const roles = [
    "Developer",
    "Designer",
    "Product Manager",
    "QA Engineer",
    "Tech Lead",
    "Marketing Specialist",
    "Sales Representative",
    "HR Manager",
    "Administrator"
  ];

  // Departments for dropdown
  const departments = [
    "Engineering",
    "Design",
    "Product",
    "Quality Assurance",
    "Marketing",
    "Sales",
    "Human Resources",
    "Administration"
  ];

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invitation sent successfully!");
    setIsInviteOpen(false);
    
    // In a real implementation, this would send an invitation
    // to the API and update the UI
  };

  const handleDeleteMember = (id: string) => {
    toast.error("Team member removed");
    
    // In a real implementation, this would remove the team member
    // from the API and update the UI
  };

  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = currentTab === "all" || 
                       (currentTab === "active" && member.status === "Active") ||
                       (currentTab === "vacation" && member.status === "Vacation") ||
                       (currentTab === "pending" && member.status === "Pending");
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">
            Manage your team members, roles, and permissions.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your workspace.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInviteMember}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role.toLowerCase()}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept.toLowerCase()}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <textarea
                      id="message"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Personal invitation message"
                      rows={3}
                    />
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

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Your company has {teamMembers.length} team members.
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Members</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="vacation">On Vacation</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeamMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No team members found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTeamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-muted-foreground">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              member.status === "Active" ? "default" : 
                              member.status === "Vacation" ? "secondary" : 
                              "outline"
                            }
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{member.projects}</TableCell>
                        <TableCell>{member.tasks}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <EditIcon className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Manage Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteMember(member.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>
              Team members by department
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground flex flex-col items-center">
              <Users className="h-12 w-12 mb-2" />
              <span>Department distribution chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Team member activities and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Sarah Miller joined Design team</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe completed onboarding</p>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Michael Chen was promoted to Tech Lead</p>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="mt-1">
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Emily Williams requested vacation</p>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 