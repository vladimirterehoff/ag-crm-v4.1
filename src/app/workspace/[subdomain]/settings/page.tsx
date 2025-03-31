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
import { toast } from "sonner";
import { Building, Save, Upload, Users, Bell, Globe, Lock, Clock } from "lucide-react";

interface SettingsPageProps {
  params: {
    subdomain: string;
  };
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { subdomain } = use(params);
  // Company profile data
  const [companyProfile, setCompanyProfile] = useState({
    name: "Attract Group",
    website: "https://attractgroup.com",
    email: "contact@attractgroup.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94107",
    description: "Leading software development company specializing in custom solutions.",
    size: "50-100",
    industry: "Software Development",
  });

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Company profile updated successfully!");
    // In a real implementation, this would save to the API
  };

  // Handle timezone update
  const handleTimezoneUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Workspace preferences updated!");
    // In a real implementation, this would save to the API
  };

  // Handle notification settings update
  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences updated!");
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
        <h2 className="text-3xl font-bold tracking-tight">Workspace Settings</h2>
        <p className="text-muted-foreground">
          Manage your workspace preferences and company profile.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <Building className="mr-2 h-4 w-4" />
            Company Profile
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Globe className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Update your company information and branding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center text-2xl font-bold">
                      {companyProfile.name.charAt(0)}
                    </div>
                    <div>
                      <Button type="button" variant="outline" size="sm" className="mb-2">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 512x512px, PNG or JPG
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input 
                        id="company-name" 
                        value={companyProfile.name}
                        onChange={(e) => setCompanyProfile({...companyProfile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        value={companyProfile.website}
                        onChange={(e) => setCompanyProfile({...companyProfile, website: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={companyProfile.email}
                        onChange={(e) => setCompanyProfile({...companyProfile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={companyProfile.phone}
                        onChange={(e) => setCompanyProfile({...companyProfile, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={companyProfile.address}
                      onChange={(e) => setCompanyProfile({...companyProfile, address: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <textarea 
                      id="description"
                      className="min-h-[100px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={companyProfile.description}
                      onChange={(e) => setCompanyProfile({...companyProfile, description: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-size">Company Size</Label>
                      <Select 
                        value={companyProfile.size}
                        onValueChange={(value) => setCompanyProfile({...companyProfile, size: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="50-100">50-100 employees</SelectItem>
                          <SelectItem value="101-500">101-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select 
                        value={companyProfile.industry}
                        onValueChange={(value) => setCompanyProfile({...companyProfile, industry: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Software Development">Software Development</SelectItem>
                          <SelectItem value="IT Services">IT Services</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Preferences</CardTitle>
              <CardDescription>
                Configure regional and display settings for your workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTimezoneUpdate} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Default Timezone</Label>
                      <Select defaultValue="America/Los_Angeles">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="Europe/Paris">Paris</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                          <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en-US">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="MM/DD/YYYY">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <Select defaultValue="12h">
                        <SelectTrigger>
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                          <SelectItem value="24h">24-hour (13:30)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="compact-view">Compact View</Label>
                        <p className="text-sm text-muted-foreground">
                          Display items in a more compact layout
                        </p>
                      </div>
                      <Switch id="compact-view" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="animations">Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable animations throughout the interface
                        </p>
                      </div>
                      <Switch id="animations" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationUpdate} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-tasks">Task Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails for task assignments and updates
                        </p>
                      </div>
                      <Switch id="email-tasks" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-projects">Project Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails for project status changes
                        </p>
                      </div>
                      <Switch id="email-projects" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-team">Team Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails for team member changes
                        </p>
                      </div>
                      <Switch id="email-team" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-marketing">Marketing & Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new features and updates
                        </p>
                      </div>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-tasks">Task Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for task assignments and updates
                        </p>
                      </div>
                      <Switch id="app-tasks" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-projects">Project Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for project status changes
                        </p>
                      </div>
                      <Switch id="app-projects" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-team">Team Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for team member changes
                        </p>
                      </div>
                      <Switch id="app-team" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-chat">Chat Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for new chat messages
                        </p>
                      </div>
                      <Switch id="app-chat" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your workspace security and authentication settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecurityUpdate} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentication</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="2fa">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Require 2FA for all admin accounts
                        </p>
                      </div>
                      <Switch id="2fa" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sso">Single Sign-On (SSO)</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable SSO authentication
                        </p>
                      </div>
                      <Switch id="sso" />
                    </div>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Settings</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue placeholder="Select session timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="480">8 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      Time before inactive users are automatically logged out
                    </p>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Privacy</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-collection">Usage Data Collection</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow anonymous usage data to be collected for product improvement
                        </p>
                      </div>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 