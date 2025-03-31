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

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your team&apos;s progress.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/projects/new">New Project</Link>
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
            <div className="text-2xl font-bold">12</div>
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
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-muted-foreground">
              23% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              3 on vacation this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Deadlines
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Next: Website Redesign (3d)
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
                      task in <span className="font-medium">Project</span>
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
                            Project {(i % 4) + 1}
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