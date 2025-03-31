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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3,
  Clock,
  Download,
  LineChart,
  PieChart,
  Users,
} from "lucide-react";

interface AnalyticsPageProps {
  params: {
    subdomain: string;
  };
}

export default function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { subdomain } = use(params);
  const [timeframe, setTimeframe] = useState("month");
  
  // Sample data for charts - in real implementation this would come from API
  const performanceData = [
    { month: "Jan", completed: 45, delayed: 5 },
    { month: "Feb", completed: 52, delayed: 3 },
    { month: "Mar", completed: 49, delayed: 7 },
    { month: "Apr", completed: 63, delayed: 4 },
    { month: "May", completed: 58, delayed: 6 },
    { month: "Jun", completed: 64, delayed: 3 },
  ];
  
  // Summary metrics
  const metrics = {
    completedProjects: 28,
    completedTasks: 187,
    activeProjects: 6,
    teamEfficiency: 94,
    avgTimePerTask: "3.2 hours",
    revenueMTD: "$68,500",
    revenueChange: "+12%",
    profitMargin: "32%",
    profitChange: "+5%",
  };

  // Department data for pie chart
  const departmentData = [
    { department: "Development", hours: 1240 },
    { department: "Design", hours: 860 },
    { department: "Marketing", hours: 540 },
    { department: "Management", hours: 480 },
    { department: "QA", hours: 620 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics &amp; Reports</h2>
          <p className="text-muted-foreground">
            Track performance metrics and generate reports.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Projects
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.completedProjects}</div>
                <p className="text-xs text-muted-foreground">
                  +4 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Efficiency
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.teamEfficiency}%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Tasks
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.completedTasks}</div>
                <p className="text-xs text-muted-foreground">
                  +23 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Time Per Task
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.avgTimePerTask}</div>
                <p className="text-xs text-muted-foreground">
                  -0.5 hours from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>
                  Tasks completed vs delayed over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <LineChart className="h-10 w-10 mb-2" />
                  <div>Line chart showing completed vs delayed tasks will render here</div>
                  <div className="text-sm mt-2">Data: {performanceData.map(d => d.month).join(", ")}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hours by Department</CardTitle>
                <CardDescription>
                  Distribution of hours across departments
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <PieChart className="h-10 w-10 mb-2" />
                  <div>Pie chart showing department distribution will render here</div>
                  <div className="text-sm mt-2">
                    Departments: {departmentData.map(d => d.department).join(", ")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>
                Metrics for project completion rates and efficiency
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-muted-foreground flex flex-col items-center">
                <BarChart3 className="h-12 w-12 mb-2" />
                <span>Project performance charts will be displayed here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Individual and team productivity metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-muted-foreground flex flex-col items-center">
                <Users className="h-12 w-12 mb-2" />
                <span>Team performance metrics will be displayed here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue (Month to Date)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.revenueMTD}</div>
                <div className="flex items-center pt-1">
                  <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">
                    {metrics.revenueChange}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Profit Margin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.profitMargin}</div>
                <div className="flex items-center pt-1">
                  <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">
                    {metrics.profitChange}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Financial Trends</CardTitle>
              <CardDescription>
                Revenue and profit trends over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-muted-foreground flex flex-col items-center">
                <LineChart className="h-12 w-12 mb-2" />
                <span>Financial trend charts will be displayed here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 