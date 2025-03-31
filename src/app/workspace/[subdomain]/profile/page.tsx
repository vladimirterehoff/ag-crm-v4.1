"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AtSign,
  Calendar,
  CreditCard,
  Github,
  Globe,
  Save,
  Shield,
  Upload,
  User,
  Check,
  Clock,
  Lock,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface ProfilePageProps {
  params: {
    subdomain: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { subdomain } = use(params);
  // Sample user data - in real implementation this would come from API/auth
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    bio: "Full-stack developer with 5+ years of experience in web and mobile application development. Passionate about clean code and user-centered design.",
    github: "johndoe",
    website: "https://johndoe.dev",
    joinDate: "2022-03-15",
  });

  // Activity feed data
  const activities = [
    {
      id: "1",
      type: "task_completed",
      title: "Completed task",
      description: "Implement new authentication flow",
      project: "Website Redesign",
      time: "Yesterday at 2:30 PM",
    },
    {
      id: "2",
      type: "comment",
      title: "Commented on task",
      description: "The new design looks great! Let's implement this next week.",
      project: "Mobile App Development",
      time: "2 days ago at 10:15 AM",
    },
    {
      id: "3",
      type: "pull_request",
      title: "Submitted pull request",
      description: "Fix navbar responsiveness issues",
      project: "Website Redesign",
      time: "3 days ago at 5:45 PM",
    },
    {
      id: "4",
      type: "time_track",
      title: "Tracked time",
      description: "6 hours on API Development",
      project: "CRM System",
      time: "4 days ago at 4:20 PM",
    },
  ];

  // Project data
  const projects = [
    {
      id: "1",
      name: "Website Redesign",
      role: "Lead Developer",
      tasks: 23,
      completed: 18,
      progress: 78,
    },
    {
      id: "2",
      name: "Mobile App Development",
      role: "Full-stack Developer",
      tasks: 31,
      completed: 14,
      progress: 45,
    },
    {
      id: "3",
      name: "CRM System",
      role: "Backend Developer",
      tasks: 15,
      completed: 12,
      progress: 80,
    },
  ];

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    // In a real implementation, this would save to the API
  };

  // Handle security settings update
  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Security settings updated!");
    // In a real implementation, this would save to the API
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          Manage your account information and preferences.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatars/user.jpg" alt={userProfile.name} />
                <AvatarFallback className="text-2xl">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full shadow"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <p className="text-sm text-muted-foreground">{userProfile.position}</p>
              <Badge variant="outline" className="mt-2">
                {userProfile.department}
              </Badge>
            </div>
            <div className="w-full pt-2">
              <div className="flex items-center gap-2 text-sm py-1">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm py-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm py-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(userProfile.joinDate).toLocaleDateString()}</span>
              </div>
              {userProfile.github && (
                <div className="flex items-center gap-2 text-sm py-1">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span>github.com/{userProfile.github}</span>
                </div>
              )}
              {userProfile.website && (
                <div className="flex items-center gap-2 text-sm py-1">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{userProfile.website}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input 
                          id="position" 
                          value={userProfile.position}
                          onChange={(e) => setUserProfile({...userProfile, position: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select 
                          value={userProfile.department}
                          onValueChange={(value) => setUserProfile({...userProfile, department: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Product">Product</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={userProfile.location}
                          onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio"
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub Username</Label>
                        <Input 
                          id="github" 
                          value={userProfile.github}
                          onChange={(e) => setUserProfile({...userProfile, github: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Personal Website</Label>
                        <Input 
                          id="website" 
                          value={userProfile.website}
                          onChange={(e) => setUserProfile({...userProfile, website: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                  <CardDescription>
                    Projects you're currently working on.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project.id}>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4 className="text-sm font-medium">{project.name}</h4>
                            <p className="text-xs text-muted-foreground">{project.role}</p>
                          </div>
                          <Badge variant="outline">
                            {project.completed}/{project.tasks} tasks
                          </Badge>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions and updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="min-w-8 mt-0.5">
                          {activity.type === "task_completed" && (
                            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                          )}
                          {activity.type === "comment" && (
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                              <AtSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                          {activity.type === "pull_request" && (
                            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                              <Github className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                          )}
                          {activity.type === "time_track" && (
                            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-sm">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {activity.project}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and authentication settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSecurityUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                            type="password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="2fa">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="2fa" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sessions</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              <Globe className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Current Session</p>
                              <p className="text-xs text-muted-foreground">
                                San Francisco, CA • Last active: Just now
                              </p>
                            </div>
                          </div>
                          <Badge>Current</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                              <Globe className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Mobile App</p>
                              <p className="text-xs text-muted-foreground">
                                iOS • Last active: 2 days ago
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        <Shield className="mr-2 h-4 w-4" />
                        Update Security
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 