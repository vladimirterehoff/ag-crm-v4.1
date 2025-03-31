"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronLeft,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  Layers,
  MenuIcon,
  Package,
  SlidersHorizontal,
  BarChart,
  FileIcon,
  Settings,
  TimerIcon,
  Users,
  Briefcase,
  PalmtreeIcon,
  LayoutDashboard,
} from "lucide-react";

interface WorkspaceSidebarProps {
  subdomain: string;
}

export default function WorkspaceSidebar({ subdomain }: WorkspaceSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: `/workspace/${subdomain}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: `/workspace/${subdomain}/projects`,
      icon: Briefcase,
    },
    {
      name: "Time Tracking",
      href: `/workspace/${subdomain}/time-tracking`,
      icon: TimerIcon,
    },
    {
      name: "Team",
      href: `/workspace/${subdomain}/team`,
      icon: Users,
    },
    {
      name: "Vacations",
      href: `/workspace/${subdomain}/vacations`,
      icon: PalmtreeIcon,
    },
    {
      name: "Files",
      href: `/workspace/${subdomain}/files`,
      icon: FileIcon,
    },
    {
      name: "Analytics",
      href: `/workspace/${subdomain}/analytics`,
      icon: BarChart,
    },
    {
      name: "Settings",
      href: `/workspace/${subdomain}/settings`,
      icon: Settings,
    },
  ];

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
            {subdomain.charAt(0).toUpperCase() + subdomain.slice(1)}
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
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
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
        </nav>
      </div>
    </div>
  );
} 