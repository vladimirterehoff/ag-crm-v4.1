"use client";

import { useState, use } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Medal,
  Star,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  Calendar,
  BarChart,
  Activity,
  Award,
  Gift,
  Clock,
  Filter,
  ChevronRight,
} from "lucide-react";

interface LeaderboardPageProps {
  params: {
    subdomain: string;
  };
}

export default function LeaderboardPage({ params }: LeaderboardPageProps) {
  const { subdomain } = use(params);
  const [period, setPeriod] = useState("monthly");
  const [category, setCategory] = useState("overall");

  // Sample leaderboard data
  const leaderboardData = [
    {
      id: "1",
      name: "John Doe",
      role: "Full-stack Developer",
      avatar: "/avatars/john.jpg",
      points: 1280,
      badges: 14,
      tasks: 78,
      hours: 168,
      projects: 5,
      trend: "up",
      change: 15,
      milestones: [
        "Completed 10 tasks ahead of schedule",
        "Resolved 20 bugs in a week",
        "Received 5 peer recognitions"
      ],
      achievements: [
        { id: "a1", name: "Bug Crusher", icon: "🐞", color: "#f97316" },
        { id: "a2", name: "Code Wizard", icon: "🧙", color: "#8b5cf6" },
        { id: "a3", name: "Team Player", icon: "👥", color: "#0ea5e9" },
      ],
      rank: 1,
    },
    {
      id: "2",
      name: "Sarah Miller",
      role: "UI/UX Designer",
      avatar: "/avatars/sarah.jpg",
      points: 1150,
      badges: 12,
      tasks: 54,
      hours: 162,
      projects: 4,
      trend: "up",
      change: 8,
      milestones: [
        "Designed 5 high-fidelity prototypes in one sprint",
        "Received client praise for UI design",
        "Mentored 2 junior designers"
      ],
      achievements: [
        { id: "a4", name: "Design Guru", icon: "🎨", color: "#ec4899" },
        { id: "a5", name: "Client Favorite", icon: "🏆", color: "#f59e0b" },
      ],
      rank: 2,
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Backend Developer",
      avatar: "/avatars/michael.jpg",
      points: 1050,
      badges: 10,
      tasks: 62,
      hours: 157,
      projects: 3,
      trend: "equal",
      change: 0,
      milestones: [
        "Optimized database performance by 30%",
        "Implemented robust API security measures",
        "Lead architecture design for new platform"
      ],
      achievements: [
        { id: "a6", name: "Performance Optimizer", icon: "⚡", color: "#10b981" },
        { id: "a7", name: "Security Expert", icon: "🔒", color: "#64748b" },
      ],
      rank: 3,
    },
    {
      id: "4",
      name: "Emily Williams",
      role: "Product Manager",
      avatar: "/avatars/emily.jpg",
      points: 980,
      badges: 9,
      tasks: 45,
      hours: 170,
      projects: 6,
      trend: "up",
      change: 12,
      milestones: [
        "Successfully launched 2 products",
        "Reduced time-to-market by 25%",
        "Improved sprint planning efficiency"
      ],
      achievements: [
        { id: "a8", name: "Project Shepherd", icon: "📊", color: "#0ea5e9" },
        { id: "a9", name: "Deadline Crusher", icon: "⏱️", color: "#ef4444" },
      ],
      rank: 4,
    },
    {
      id: "5",
      name: "David Johnson",
      role: "QA Engineer",
      avatar: "/avatars/david.jpg",
      points: 920,
      badges: 8,
      tasks: 72,
      hours: 155,
      projects: 4,
      trend: "down",
      change: 5,
      milestones: [
        "Identified 45 critical bugs pre-release",
        "Developed automated testing framework",
        "Reduced regression testing time by 40%"
      ],
      achievements: [
        { id: "a10", name: "Bug Hunter", icon: "🐛", color: "#f97316" },
        { id: "a11", name: "Quality Guardian", icon: "🛡️", color: "#0284c7" },
      ],
      rank: 5,
    },
    {
      id: "6",
      name: "Lisa Taylor",
      role: "Frontend Developer",
      avatar: "/avatars/lisa.jpg",
      points: 860,
      badges: 7,
      tasks: 58,
      hours: 152,
      projects: 3,
      trend: "up",
      change: 6,
      milestones: [
        "Reduced load time by 35%",
        "Implemented responsive design across platforms",
        "Achieved 97% test coverage"
      ],
      achievements: [
        { id: "a12", name: "CSS Master", icon: "✨", color: "#8b5cf6" },
        { id: "a13", name: "Performance Pro", icon: "🚀", color: "#0ea5e9" },
      ],
      rank: 6,
    },
    {
      id: "7",
      name: "Mark Wilson",
      role: "DevOps Engineer",
      avatar: "/avatars/mark.jpg",
      points: 810,
      badges: 6,
      tasks: 42,
      hours: 158,
      projects: 5,
      trend: "down",
      change: 3,
      milestones: [
        "Reduced deployment time by 60%",
        "Set up comprehensive monitoring",
        "Achieved 99.9% uptime"
      ],
      achievements: [
        { id: "a14", name: "Deployment Ninja", icon: "🥷", color: "#475569" },
        { id: "a15", name: "Cloud Champion", icon: "☁️", color: "#3b82f6" },
      ],
      rank: 7,
    },
    {
      id: "8",
      name: "Jessica Lee",
      role: "Mobile Developer",
      avatar: "/avatars/jessica.jpg",
      points: 780,
      badges: 5,
      tasks: 49,
      hours: 145,
      projects: 2,
      trend: "up",
      change: 10,
      milestones: [
        "Released app with 4.8 star rating",
        "Reduced app size by 20%",
        "Implemented offline functionality"
      ],
      achievements: [
        { id: "a16", name: "App Wizard", icon: "📱", color: "#0f766e" },
        { id: "a17", name: "User Favorite", icon: "❤️", color: "#dc2626" },
      ],
      rank: 8,
    },
  ];

  // Function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="text-green-500 h-4 w-4" />;
      case "down":
        return <ArrowDown className="text-red-500 h-4 w-4" />;
      default:
        return <Minus className="text-gray-500 h-4 w-4" />;
    }
  };

  // Top achievers (top 3)
  const topAchievers = leaderboardData.slice(0, 3);

  // Recent achievements
  const recentAchievements = [
    {
      id: "ra1",
      user: leaderboardData[0],
      achievement: { name: "Bug Crusher", description: "Resolved 50 bugs", icon: "🐞", date: "2023-07-01" },
    },
    {
      id: "ra2",
      user: leaderboardData[1],
      achievement: { name: "Design Guru", description: "Created 10 acclaimed designs", icon: "🎨", date: "2023-06-28" },
    },
    {
      id: "ra3",
      user: leaderboardData[3],
      achievement: { name: "Project Shepherd", description: "Delivered 5 projects on time", icon: "📊", date: "2023-06-25" },
    },
    {
      id: "ra4",
      user: leaderboardData[2],
      achievement: { name: "Performance Optimizer", description: "Improved system performance by 40%", icon: "⚡", date: "2023-06-22" },
    },
    {
      id: "ra5",
      user: leaderboardData[5],
      achievement: { name: "CSS Master", description: "Created pixel-perfect UI implementations", icon: "✨", date: "2023-06-20" },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
          <p className="text-muted-foreground">
            Track achievements and recognize top performers.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="quarterly">This Quarter</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overall">Overall</SelectItem>
              <SelectItem value="tasks">Tasks Completed</SelectItem>
              <SelectItem value="hours">Hours Tracked</SelectItem>
              <SelectItem value="projects">Projects Delivered</SelectItem>
              <SelectItem value="badges">Badges Earned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topAchievers.map((achiever, index) => (
          <Card key={achiever.id} className={
            index === 0
              ? "border-2 border-yellow-400 dark:border-yellow-500 shadow-lg"
              : index === 1
                ? "border-2 border-slate-300 dark:border-slate-400 shadow-md"
                : "border-2 border-amber-600 dark:border-amber-700 shadow-md"
          }>
            <CardHeader className="space-y-0 pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="font-bold px-3">
                  {index === 0 
                    ? <Trophy className="h-4 w-4 text-yellow-500 mr-1" /> 
                    : index === 1 
                      ? <Medal className="h-4 w-4 text-slate-400 mr-1" /> 
                      : <Medal className="h-4 w-4 text-amber-600 mr-1" />}
                  Rank #{achiever.rank}
                </Badge>
                <div className="flex items-center text-muted-foreground text-sm">
                  {getTrendIcon(achiever.trend)}
                  <span className={
                    achiever.trend === "up" 
                      ? "text-green-500" 
                      : achiever.trend === "down" 
                        ? "text-red-500" 
                        : "text-gray-500"
                  }>
                    {achiever.trend !== "equal" && achiever.change + "%"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-3">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarImage src={achiever.avatar} alt={achiever.name} />
                  <AvatarFallback>
                    {achiever.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-xl font-bold">{achiever.name}</h3>
              <p className="text-sm text-muted-foreground">{achiever.role}</p>
              <div className="mt-4 flex justify-center space-x-2">
                {achiever.achievements.slice(0, 3).map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="flex items-center justify-center h-10 w-10 rounded-full text-lg" 
                    style={{ backgroundColor: achievement.color + "20", color: achievement.color }}
                    title={achievement.name}
                  >
                    {achievement.icon}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{achiever.points.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center">
                  <div className="font-semibold">{achiever.tasks}</div>
                  <div className="text-xs text-muted-foreground">Tasks</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{achiever.badges}</div>
                  <div className="text-xs text-muted-foreground">Badges</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{achiever.projects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center pb-4">
              <Button variant="outline" size="sm">View Achievements</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leaderboard">Full Leaderboard</TabsTrigger>
          <TabsTrigger value="achievements">Recent Achievements</TabsTrigger>
          <TabsTrigger value="statistics">Team Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Leaderboard</CardTitle>
              <CardDescription>
                {period === "weekly" && "Performance for this week"}
                {period === "monthly" && "Performance for this month"}
                {period === "quarterly" && "Performance for this quarter"}
                {period === "yearly" && "Performance for this year"}
                {period === "alltime" && "All-time performance"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 border-b pb-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-sm font-medium">
                      {member.rank}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
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
                    <div className="hidden md:flex gap-2">
                      {member.achievements.slice(0, 2).map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className="flex items-center justify-center h-8 w-8 rounded-full text-sm" 
                          style={{ backgroundColor: achievement.color + "20", color: achievement.color }}
                          title={achievement.name}
                        >
                          {achievement.icon}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <div className="font-semibold text-lg">{member.points.toLocaleString()}</div>
                        {getTrendIcon(member.trend)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{member.tasks} tasks</span>
                        <span>·</span>
                        <span>{member.hours} hours</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline">View Full Rankings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>
                Latest badges and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 border-b pb-4">
                    <div 
                      className="flex items-center justify-center h-10 w-10 rounded-full text-lg mt-1" 
                      style={{ backgroundColor: "#f472b620", color: "#ec4899" }}
                    >
                      {item.achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={item.user.avatar} alt={item.user.name} />
                          <AvatarFallback>
                            {item.user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{item.user.name}</span>
                        <span className="text-muted-foreground">earned</span>
                        <Badge variant="secondary">{item.achievement.name}</Badge>
                      </div>
                      <p className="text-sm mt-1">{item.achievement.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.achievement.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline">View All Achievements</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Productivity
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+24%</div>
                <p className="text-xs text-muted-foreground">
                  Increase compared to last period
                </p>
                <div className="mt-4 h-[60px] flex items-center justify-center text-muted-foreground">
                  <BarChart className="h-10 w-10" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Points Earned
                </CardTitle>
                <Activity className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,750</div>
                <p className="text-xs text-muted-foreground">
                  Team points for current period
                </p>
                <div className="mt-4 h-[60px] flex items-center justify-center text-muted-foreground">
                  <Award className="h-10 w-10" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tasks Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">460</div>
                <p className="text-xs text-muted-foreground">
                  Completed tasks this period
                </p>
                <div className="mt-4 h-[60px] flex items-center justify-center text-muted-foreground">
                  <Gift className="h-10 w-10" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>
                Productivity and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Tasks Completion Rate</div>
                    <div className="text-sm text-muted-foreground">92%</div>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">On-time Delivery</div>
                    <div className="text-sm text-muted-foreground">87%</div>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Team Engagement</div>
                    <div className="text-sm text-muted-foreground">95%</div>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Badges Distribution</div>
                    <div className="text-sm text-muted-foreground">78%</div>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="text-sm font-medium">Weekly Active Users</div>
                    <div className="text-sm text-muted-foreground">100%</div>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last updated: Today at 09:45 AM
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 