"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  LayoutDashboard,
  Briefcase,
  TimerIcon,
  Users,
  PalmtreeIcon,
  BarChart,
  Settings,
  ListChecks,
  Calendar,
  Layers,
  Gauge,
  Trophy,
  Medal,
  Gift,
  CircleDollarSign,
  Building,
  UserCog,
  MailIcon,
  Plug,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface WorkspaceSidebarProps {
  subdomain: string;
}

export default function WorkspaceSidebar({ subdomain }: WorkspaceSidebarProps) {
  const subdomainParam = subdomain;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Define nav items by suite/module
  const workSuiteItems = [
    {
      name: "Dashboard",
      href: `/workspace/${subdomainParam}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: `/workspace/${subdomainParam}/projects`,
      icon: Briefcase,
    },
    {
      name: "Tasks",
      href: `/workspace/${subdomainParam}/tasks`,
      icon: ListChecks,
    },
    {
      name: "Sprints & Epics",
      href: `/workspace/${subdomainParam}/sprints`,
      icon: Layers,
    },
    {
      name: "Time Tracking",
      href: `/workspace/${subdomainParam}/time-tracking`,
      icon: TimerIcon,
    },
    {
      name: "Bench",
      href: `/workspace/${subdomainParam}/bench`,
      icon: Gauge,
    },
  ];

  const peopleSuiteItems = [
    {
      name: "Team",
      href: `/workspace/${subdomainParam}/team`,
      icon: Users,
    },
    {
      name: "Vacations",
      href: `/workspace/${subdomainParam}/vacations`,
      icon: PalmtreeIcon,
    },
    {
      name: "Calendar",
      href: `/workspace/${subdomainParam}/calendar`,
      icon: Calendar,
    },
  ];

  const motivationSuiteItems = [
    {
      name: "Leaderboard",
      href: `/workspace/${subdomainParam}/leaderboard`,
      icon: Trophy,
    },
    {
      name: "Badges",
      href: `/workspace/${subdomainParam}/badges`,
      icon: Medal,
    },
    {
      name: "Store",
      href: `/workspace/${subdomainParam}/store`,
      icon: Gift,
    },
  ];

  const adminSuiteItems = [
    {
      name: "Billing",
      href: `/workspace/${subdomainParam}/billing`,
      icon: CircleDollarSign,
    },
    {
      name: "Company Profile",
      href: `/workspace/${subdomainParam}/company`,
      icon: Building,
    },
    {
      name: "Team Management",
      href: `/workspace/${subdomainParam}/team-management`,
      icon: UserCog,
    },
    {
      name: "Email & Notifications",
      href: `/workspace/${subdomainParam}/notifications`,
      icon: MailIcon,
    },
    {
      name: "Integrations",
      href: `/workspace/${subdomainParam}/integrations`,
      icon: Plug,
    },
    {
      name: "Settings",
      href: `/workspace/${subdomainParam}/settings`,
      icon: Settings,
    },
  ];

  // Helper function to render navigation section
  const renderNavSection = (items, title) => {
    return (
      <div className="px-2 py-2">
        {!isCollapsed && (
          <div className="px-2 py-1.5">
            <p className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
              {title}
            </p>
          </div>
        )}
        {isCollapsed && (
          <Separator className="my-2" />
        )}
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
              pathname === item.href &&
                "bg-accent text-accent-foreground font-medium",
              isCollapsed && "justify-center px-0"
            )}
          >
            <item.icon className={cn("h-5 w-5 flex-shrink-0")} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background h-screen transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 items-center px-4 border-b">
        {!isCollapsed && (
          <span className="text-lg font-semibold">
            {subdomainParam.charAt(0).toUpperCase() + subdomainParam.slice(1)}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1">
          {/* Dashboard Link */}
          <Link
            href={`/workspace/${subdomainParam}/dashboard`}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 mx-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
              pathname === `/workspace/${subdomainParam}/dashboard` &&
                "bg-accent text-accent-foreground font-medium",
              isCollapsed && "justify-center px-0"
            )}
          >
            <LayoutDashboard className={cn("h-5 w-5 flex-shrink-0")} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          {/* Core Productivity / Project Management */}
          {renderNavSection(workSuiteItems, "Work Suite")}

          {/* HR Tools */}
          {renderNavSection(peopleSuiteItems, "People Suite")}
          
          {/* Motivation & Culture */}
          {renderNavSection(motivationSuiteItems, "Motivation Suite")}

          {/* System Settings & Administration */}
          {renderNavSection(adminSuiteItems, "System Admin")}
        </nav>
      </div>
    </div>
  );
} 