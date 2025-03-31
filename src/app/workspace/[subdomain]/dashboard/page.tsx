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
  BarChart3,
  CheckCircle2,
  Clock,
  Users,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

interface DashboardPageProps {
  params: {
    subdomain: string;
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { subdomain } = params;
  // Get workspace and company names for display
  const companyName = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
  
  // Helper function to generate workspace links
  const getWorkspaceLink = (path: string) => `/workspace/${subdomain}${path}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to {companyName} workspace. Here&apos;s an overview of your activity.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={getWorkspaceLink("/projects/new")}>New Project</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              67% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              1 on vacation this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hours Tracked
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">168</div>
            <p className="text-xs text-muted-foreground">
              This week (Mon-Sun)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <span>Performance chart will be displayed here</span>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest activity across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="relative flex h-8 w-8 rounded-full bg-muted items-center justify-center">
                      <span className="text-xs font-medium">U{i}</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm">
                      <span className="font-medium">User {i}</span> completed a
                      task in <span className="font-medium">Project {i % 3 + 1}</span>
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {i * 13} minutes ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="my-tasks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="team-tasks">Team Tasks</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="my-tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>
                  Tasks assigned to you across all projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-2 h-2 mt-2 rounded-full ${
                            i % 3 === 0
                              ? "bg-red-500"
                              : i % 2 === 0
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <div>
                          <div className="font-medium">Task {i}</div>
                          <div className="text-sm text-muted-foreground">
                            Project {(i % 3) + 1}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Due in {i} days
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team-tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Tasks</CardTitle>
                <CardDescription>
                  Tasks assigned to your team members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground flex h-[200px] items-center justify-center">
                  Team tasks will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                  Upcoming deadlines and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground flex h-[200px] items-center justify-center">
                  Calendar will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 