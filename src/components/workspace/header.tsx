"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Check,
  ChevronDown,
  CircleUser,
  HelpCircle,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceHeaderProps {
  subdomain: string;
}

export default function WorkspaceHeader({ subdomain }: WorkspaceHeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Sample notifications - in real implementation this would come from API
  const notifications = [
    {
      id: "1",
      title: "New task assigned",
      description: "You've been assigned to a new task: 'Update landing page'",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Project status updated",
      description: "Project 'Mobile App Redesign' status changed to 'In Progress'",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Meeting reminder",
      description: "Team meeting starts in 30 minutes",
      time: "2 hours ago",
      read: true,
    },
    {
      id: "4",
      title: "Document updated",
      description: "Sarah Miller updated 'Project Requirements.docx'",
      time: "Yesterday",
      read: true,
    },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Get company display name from subdomain
  const companyName = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
  
  // User data - in real implementation this would come from auth system
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    avatar: "/avatars/user.jpg",
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="hidden md:flex">
          <span className="text-lg font-semibold">{companyName}</span>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-2 md:justify-end md:gap-4">
          <form className="relative hidden md:flex w-64 lg:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 md:w-64 lg:w-80"
            />
          </form>
          
          <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  You have {unreadCount} unread notifications
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex gap-4 rounded-lg p-3",
                      !notification.read && "bg-muted"
                    )}
                  >
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {notification.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  Mark all as read
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 flex items-center gap-2 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex text-sm font-medium">
                  {user.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 