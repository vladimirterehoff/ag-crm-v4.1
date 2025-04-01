import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Clock, Plus, Search } from "lucide-react";

interface ProjectsPageProps {
  params: {
    subdomain: string;
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { subdomain } = params;
  // Helper function to generate workspace links
  const getWorkspaceLink = (path: string) => `/workspace/${subdomain}${path}`;
  
  // Sample project data - in real implementation this would come from API
  const projects = [
    {
      id: "1",
      name: "E-commerce Website",
      client: "Fashion Retailer",
      status: "In Progress",
      progress: 45,
      team: ["John D.", "Sarah M.", "Alex K."],
      dueDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Mobile Banking App",
      client: "Financial Services Inc.",
      status: "In Progress",
      progress: 72,
      team: ["Emily R.", "David P.", "Lisa T."],
      dueDate: "2023-08-30",
    },
    {
      id: "3",
      name: "CRM Integration",
      client: "Tech Solutions",
      status: "Planning",
      progress: 10,
      team: ["Mark S.", "Julia B."],
      dueDate: "2023-09-22",
    },
    {
      id: "4",
      name: "Healthcare Platform",
      client: "MediCare Group",
      status: "Completed",
      progress: 100,
      team: ["Robert L.", "Nina K.", "Thomas J.", "Anna P."],
      dueDate: "2023-05-01",
    },
    {
      id: "5",
      name: "Logistics Dashboard",
      client: "Global Transport Ltd",
      status: "In Progress",
      progress: 60,
      team: ["Chris M.", "Helen S."],
      dueDate: "2023-07-10",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and monitor all your projects in one place.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search projects..."
              className="pl-8 h-9 w-full md:w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            A list of all projects your team is working on.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={getWorkspaceLink(`/projects/${project.id}`)}
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {project.status === "Completed" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-500" />
                      )}
                      {project.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {project.progress}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center border-2 border-background font-medium"
                          title={member}
                        >
                          {member.split(" ")[0][0]}
                          {member.split(" ")[1][0]}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs border-2 border-background">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(project.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={getWorkspaceLink(`/projects/${project.id}`)}>
                        View
                      </Link>
                    </Button>
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