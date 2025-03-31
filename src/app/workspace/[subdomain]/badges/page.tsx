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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Award,
  Users,
  Star,
  Filter,
  Grid3X3,
  List,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BadgesPageProps {
  params: {
    subdomain: string;
  };
}

export default function BadgesPage({ params }: BadgesPageProps) {
  const { subdomain } = use(params);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showDialog, setShowDialog] = useState(false);

  // Sample badges data
  const badges = [
    {
      id: "1",
      name: "Bug Crusher",
      description: "Awarded for resolving 50+ critical bugs",
      icon: "🐞",
      category: "technical",
      color: "#f97316",
      earned: 12,
      requirements: "Resolve 50 critical bugs",
      points: 100,
    },
    {
      id: "2",
      name: "Code Wizard",
      description: "For exceptional code quality and innovation",
      icon: "🧙",
      category: "technical",
      color: "#8b5cf6",
      earned: 5,
      requirements: "Receive 10 code quality commendations",
      points: 150,
    },
    {
      id: "3",
      name: "Team Player",
      description: "Consistently helps and supports teammates",
      icon: "👥",
      category: "collaboration",
      color: "#0ea5e9",
      earned: 18,
      requirements: "Receive 15 peer recognitions",
      points: 100,
    },
    {
      id: "4",
      name: "Design Guru",
      description: "Creates outstanding UI/UX designs",
      icon: "🎨",
      category: "design",
      color: "#ec4899",
      earned: 7,
      requirements: "Receive 5 client design praises",
      points: 120,
    },
    {
      id: "5",
      name: "Client Favorite",
      description: "Consistently delivers excellent client experiences",
      icon: "🏆",
      category: "client",
      color: "#f59e0b",
      earned: 9,
      requirements: "Receive 10 positive client reviews",
      points: 150,
    },
    {
      id: "6",
      name: "Performance Optimizer",
      description: "Significantly improves application performance",
      icon: "⚡",
      category: "technical",
      color: "#10b981",
      earned: 3,
      requirements: "Improve performance metrics by 30%+",
      points: 200,
    },
    {
      id: "7",
      name: "Security Expert",
      description: "Enhances and maintains system security",
      icon: "🔒",
      category: "technical",
      color: "#64748b",
      earned: 4,
      requirements: "Identify and fix 20+ security vulnerabilities",
      points: 180,
    },
    {
      id: "8",
      name: "Project Shepherd",
      description: "Successfully guides projects from start to completion",
      icon: "📊",
      category: "management",
      color: "#0ea5e9",
      earned: 11,
      requirements: "Successfully deliver 5+ projects on time",
      points: 150,
    },
    {
      id: "9",
      name: "Deadline Crusher",
      description: "Always delivers ahead of schedule",
      icon: "⏱️",
      category: "productivity",
      color: "#ef4444",
      earned: 15,
      requirements: "Complete 20+ tasks ahead of deadline",
      points: 100,
    },
    {
      id: "10",
      name: "Bug Hunter",
      description: "Expert at finding and documenting bugs",
      icon: "🐛",
      category: "technical",
      color: "#f97316",
      earned: 8,
      requirements: "Find and document 30+ bugs",
      points: 120,
    },
    {
      id: "11",
      name: "Quality Guardian",
      description: "Maintains exceptional quality standards",
      icon: "🛡️",
      category: "technical",
      color: "#0284c7",
      earned: 6,
      requirements: "Maintain 95%+ test coverage for 3 months",
      points: 150,
    },
    {
      id: "12",
      name: "CSS Master",
      description: "Creates beautiful and efficient CSS",
      icon: "✨",
      category: "design",
      color: "#8b5cf6",
      earned: 4,
      requirements: "Create pixel-perfect implementations for 10+ designs",
      points: 120,
    },
  ];

  // Get unique categories
  const categories = Array.from(new Set(badges.map((badge) => badge.category)));
  
  // Filter badges
  const filteredBadges = badges.filter((badge) => {
    const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          badge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || badge.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Recent achievements (who earned what)
  const recentAchievements = [
    {
      id: "ra1",
      badge: badges[0],
      user: {
        name: "John Doe",
        avatar: "/avatars/john.jpg",
        role: "Full-stack Developer",
      },
      date: "2023-07-01",
      project: "Mobile Banking App",
    },
    {
      id: "ra2",
      badge: badges[3],
      user: {
        name: "Sarah Miller",
        avatar: "/avatars/sarah.jpg",
        role: "UI/UX Designer",
      },
      date: "2023-06-28",
      project: "E-commerce Website",
    },
    {
      id: "ra3",
      badge: badges[7],
      user: {
        name: "Emily Williams",
        avatar: "/avatars/emily.jpg",
        role: "Product Manager",
      },
      date: "2023-06-25",
      project: "Healthcare Platform",
    },
    {
      id: "ra4",
      badge: badges[5],
      user: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        role: "Backend Developer",
      },
      date: "2023-06-22",
      project: "CRM Integration",
    },
    {
      id: "ra5",
      badge: badges[11],
      user: {
        name: "Lisa Taylor",
        avatar: "/avatars/lisa.jpg",
        role: "Frontend Developer",
      },
      date: "2023-06-20",
      project: "E-commerce Website",
    },
  ];

  // New badge form state
  const [newBadge, setNewBadge] = useState({
    name: "",
    description: "",
    icon: "",
    category: "",
    color: "#6366f1",
    requirements: "",
    points: 100,
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual badge creation
    console.log("Creating new badge:", newBadge);
    setShowDialog(false);
    setNewBadge({
      name: "",
      description: "",
      icon: "",
      category: "",
      color: "#6366f1",
      requirements: "",
      points: 100,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Achievement Badges</h2>
          <p className="text-muted-foreground">
            Recognize and reward team accomplishments.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Badge
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Badge</DialogTitle>
                <DialogDescription>
                  Design a new achievement badge for your team.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Badge Name</Label>
                    <Input
                      id="name"
                      value={newBadge.name}
                      onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
                      placeholder="Bug Crusher"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newBadge.description}
                      onChange={(e) => setNewBadge({ ...newBadge, description: e.target.value })}
                      placeholder="Awarded for resolving critical bugs"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="icon">Icon (Emoji)</Label>
                      <Input
                        id="icon"
                        value={newBadge.icon}
                        onChange={(e) => setNewBadge({ ...newBadge, icon: e.target.value })}
                        placeholder="🐞"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={newBadge.category}
                        onChange={(e) => setNewBadge({ ...newBadge, category: e.target.value })}
                        placeholder="technical"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="color">Badge Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="color"
                          type="color"
                          value={newBadge.color}
                          onChange={(e) => setNewBadge({ ...newBadge, color: e.target.value })}
                          className="w-12 h-9 p-1"
                        />
                        <Input
                          value={newBadge.color}
                          onChange={(e) => setNewBadge({ ...newBadge, color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="points">Points Value</Label>
                      <Input
                        id="points"
                        type="number"
                        min="1"
                        max="500"
                        value={newBadge.points}
                        onChange={(e) => setNewBadge({ ...newBadge, points: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={newBadge.requirements}
                      onChange={(e) => setNewBadge({ ...newBadge, requirements: e.target.value })}
                      placeholder="What users need to accomplish to earn this badge"
                      rows={2}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Badge</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Badges
            </CardTitle>
            <Award className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {badges.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique achievement badges
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Badges Awarded
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {badges.reduce((acc, badge) => acc + badge.earned, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total badges earned by team
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Popular
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {badges.reduce((prev, current) => prev.earned > current.earned ? prev : current).name}
            </div>
            <p className="text-xs text-muted-foreground">
              Most frequently earned badge
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Categories
            </CardTitle>
            <Filter className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Different badge categories
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search badges..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="flex h-10 w-full md:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="badges">All Badges</TabsTrigger>
          <TabsTrigger value="recent">Recent Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="space-y-4">
          {view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBadges.map((badge) => (
                <Card key={badge.id} className="overflow-hidden">
                  <CardHeader className="text-center pb-2">
                    <div 
                      className="mx-auto flex items-center justify-center h-16 w-16 rounded-full text-3xl" 
                      style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                    >
                      {badge.icon}
                    </div>
                    <CardTitle className="mt-3">{badge.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {badge.category.charAt(0).toUpperCase() + badge.category.slice(1)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <div className="mt-3 flex justify-center items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{badge.points} points</span>
                    </div>
                    <div className="mt-4 text-xs text-muted-foreground">
                      <p>Requirement:</p>
                      <p className="font-medium mt-1">{badge.requirements}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between text-sm border-t pt-3">
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 text-blue-500 mr-1" />
                      <span>{badge.earned} earned</span>
                    </div>
                    <Button variant="ghost" size="sm">Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>All Badges</CardTitle>
                <CardDescription>
                  Complete list of achievement badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBadges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-4 border-b pb-4">
                      <div 
                        className="flex items-center justify-center h-12 w-12 rounded-full text-2xl" 
                        style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
                      >
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{badge.name}</h3>
                          <Badge variant="secondary">
                            {badge.category.charAt(0).toUpperCase() + badge.category.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">{badge.points} points</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {badge.earned} team members
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>
                Latest badges earned by team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 border-b pb-4">
                    <div 
                      className="flex items-center justify-center h-12 w-12 rounded-full text-2xl" 
                      style={{ backgroundColor: `${achievement.badge.color}20`, color: achievement.badge.color }}
                    >
                      {achievement.badge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={achievement.user.avatar} alt={achievement.user.name} />
                          <AvatarFallback>
                            {achievement.user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{achievement.user.name}</span>
                        <span className="text-muted-foreground">earned</span>
                        <Badge variant="outline" style={{ color: achievement.badge.color, borderColor: achievement.badge.color }}>
                          {achievement.badge.name}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                        <span>
                          {new Date(achievement.date).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>
                          {achievement.project}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                          {achievement.badge.points} points
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline">View All Achievements</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 