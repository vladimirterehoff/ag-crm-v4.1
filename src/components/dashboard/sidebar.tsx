"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  Layout,
  Users,
  Briefcase,
  Settings,
  User,
  Medal,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Layout className="h-5 w-5" />,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Vacations",
    href: "/dashboard/vacations",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Motivation",
    href: "/dashboard/motivation",
    icon: <Medal className="h-5 w-5" />,
  },
  {
    title: "Finances",
    href: "/dashboard/finances",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: <User className="h-5 w-5" />,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex h-16 items-center px-4 border-b">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          title="Attract Group CRM"
        >
          {collapsed ? (
            <span className="text-xl font-bold">AG</span>
          ) : (
            <span className="text-xl font-bold">Attract Group CRM</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-md hover:bg-accent"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-transform", {
              "rotate-180": collapsed,
            })}
          >
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="grid gap-1">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 