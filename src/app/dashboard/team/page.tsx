import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail, MoreHorizontal, Plus, Search, UserPlus } from "lucide-react";
import Link from "next/link";

// Sample team data - in real implementation this would come from API
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@attractgroup.com",
    role: "Full Stack Developer",
    department: "Engineering",
    location: "New York",
    avatar: "/avatars/01.png",
    status: "Active",
    tasks: 8,
    projects: 3,
  },
  {
    id: "2",
    name: "Sarah Miller",
    email: "sarah.miller@attractgroup.com",
    role: "UI/UX Designer",
    department: "Design",
    location: "London",
    avatar: "/avatars/02.png",
    status: "Active",
    tasks: 5,
    projects: 2,
  },
  {
    id: "3",
    name: "Alex Kim",
    email: "alex.kim@attractgroup.com",
    role: "Frontend Developer",
    department: "Engineering",
    location: "San Francisco",
    avatar: "/avatars/03.png",
    status: "Active",
    tasks: 6,
    projects: 2,
  },
  {
    id: "4",
    name: "Emily Roberts",
    email: "emily.roberts@attractgroup.com",
    role: "Backend Developer",
    department: "Engineering",
    location: "Berlin",
    avatar: "/avatars/04.png",
    status: "On Vacation",
    tasks: 0,
    projects: 2,
  },
  {
    id: "5",
    name: "David Patel",
    email: "david.patel@attractgroup.com",
    role: "DevOps Engineer",
    department: "Operations",
    location: "Sydney",
    avatar: "/avatars/05.png",
    status: "Active",
    tasks: 4,
    projects: 1,
  },
  {
    id: "6",
    name: "Lisa Turner",
    email: "lisa.turner@attractgroup.com",
    role: "Project Manager",
    department: "Management",
    location: "Toronto",
    avatar: "/avatars/06.png",
    status: "Active",
    tasks: 3,
    projects: 4,
  },
  {
    id: "7",
    name: "Mark Smith",
    email: "mark.smith@attractgroup.com",
    role: "QA Engineer",
    department: "Quality Assurance",
    location: "Chicago",
    avatar: "/avatars/07.png",
    status: "Active",
    tasks: 7,
    projects: 2,
  },
  {
    id: "8",
    name: "Julia Black",
    email: "julia.black@attractgroup.com",
    role: "Data Scientist",
    department: "Data",
    location: "Amsterdam",
    avatar: "/avatars/08.png",
    status: "Active",
    tasks: 2,
    projects: 1,
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team</h2>
          <p className="text-muted-foreground">
            Manage your team members and their permissions.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search team members..."
              className="pl-8 h-9 w-full md:w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button asChild>
            <Link href="/dashboard/team/invite">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="relative pb-2">
              <div className="absolute right-4 top-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 focus:ring-0"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Assign task</DropdownMenuItem>
                    <DropdownMenuItem>Send message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Remove from team
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {member.role}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted-foreground">Department:</span>
                    <p>{member.department}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p>{member.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                  <div>
                    <span className="text-muted-foreground">Tasks:</span>
                    <p className="font-semibold">{member.tasks}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Projects:</span>
                    <p className="font-semibold">{member.projects}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium inline-block ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add new team member card */}
        <Card className="flex flex-col items-center justify-center border-dashed h-full">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mb-2 font-medium">Add Team Member</p>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Invite a new member to join your team
            </p>
            <Button variant="outline" asChild>
              <Link href="/dashboard/team/invite">Invite Member</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 