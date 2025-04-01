"use client";

import { useState, useEffect } from "react";
import { use } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Users,
  Briefcase,
  CalendarDays,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Play,
  ArrowUpRight,
  ArrowRight,
  BellRing,
  ChartBar,
  BarChart,
  PieChart,
  Clock4,
  Plus,
  ArrowLeft,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Minus,
  Timer,
  ArrowDown,
  RotateCcw,
  Loader2,
  Info,
  X,
  ChevronDown,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as DateCalendar } from "@/components/ui/calendar";

interface DashboardPageProps {
  params: {
    subdomain: string;
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  // Properly unwrap params with React.use()
  const { subdomain } = use(params);
  
  // Get workspace and company names for display
  const companyName = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
  
  // Helper function to generate workspace links
  const getWorkspaceLink = (path: string) => `/workspace/${subdomain}${path}`;
  
  // State for the dashboard role selector
  const [dashboardRole, setDashboardRole] = useState("developer");
  
  // State to track which metric's info popup is open
  const [openInfoId, setOpenInfoId] = useState<string | null>(null);
  
  // State to control showing all tasks or just 10
  const [showAllTasks, setShowAllTasks] = useState(false);
  
  // State to track selected task statuses for filtering
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["todo", "in-progress", "done"]);
  
  // Dummy data for the developer dashboard
  const myTasks = [
    {
      id: "1",
      title: "Implement authentication flow",
      description: "Set up user authentication with NextAuth.js",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-15",
      project: "Mobile Banking App",
      estimatedHours: 8,
      actualHours: 0,
    },
    {
      id: "2",
      title: "Fix navigation bug on mobile",
      description: "Navbar doesn't collapse properly on small screens",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-10",
      project: "E-commerce Website",
      estimatedHours: 4,
      actualHours: 2.5,
    },
    {
      id: "3",
      title: "Implement dark mode",
      description: "Add theme switcher and dark mode styling",
      status: "in-progress",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-06-18",
      project: "Mobile Banking App",
      estimatedHours: 6,
      actualHours: 1,
    },
    {
      id: "4",
      title: "Create checkout process UI",
      description: "Design and implement multi-step checkout workflow",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-22",
      project: "E-commerce Website",
      estimatedHours: 10,
      actualHours: 0,
    },
    {
      id: "5",
      title: "Optimize product search performance",
      description: "Implement caching and improve query performance",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-06-25",
      project: "E-commerce Website",
      estimatedHours: 6,
      actualHours: 0,
    },
    {
      id: "6",
      title: "Implement transaction history view",
      description: "Create paginated transaction history with filtering",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-06-19",
      project: "Mobile Banking App",
      estimatedHours: 8,
      actualHours: 0,
    },
    {
      id: "7",
      title: "Fix account balance display bug",
      description: "Balance not updating after transactions in some cases",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-12",
      project: "Mobile Banking App",
      estimatedHours: 3,
      actualHours: 1.5,
    },
    {
      id: "8",
      title: "Set up data import/export functionality",
      description: "Create CSV/Excel import and export for customer data",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-06-28",
      project: "CRM Integration",
      estimatedHours: 12,
      actualHours: 0,
    },
    {
      id: "9",
      title: "Optimize product image loading",
      description: "Implement lazy loading and image optimization",
      status: "done",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-06-05",
      project: "E-commerce Website",
      estimatedHours: 5,
      actualHours: 4.5,
    },
    {
      id: "10",
      title: "Add address validation",
      description: "Integrate with address validation API for checkout",
      status: "todo",
      priority: "low",
      assignee: "John Doe",
      dueDate: "2023-06-30",
      project: "E-commerce Website",
      estimatedHours: 4,
      actualHours: 0,
    },
    {
      id: "11",
      title: "Create API documentation",
      description: "Document all backend APIs using Swagger",
      status: "todo",
      priority: "low",
      assignee: "John Doe",
      dueDate: "2023-07-05",
      project: "Mobile Banking App",
      estimatedHours: 8,
      actualHours: 0,
    },
    {
      id: "12",
      title: "Implement notification system",
      description: "Add in-app and push notifications for important events",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-10",
      project: "Mobile Banking App",
      estimatedHours: 14,
      actualHours: 0,
    },
    {
      id: "13",
      title: "Fix product filter on category pages",
      description: "Price filter not applying correctly on some categories",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-16",
      project: "E-commerce Website",
      estimatedHours: 3,
      actualHours: 0,
    },
    {
      id: "14",
      title: "Implement customer segmentation",
      description: "Add tagging and segmentation for customer profiles",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-12",
      project: "CRM Integration",
      estimatedHours: 10,
      actualHours: 0,
    },
    {
      id: "15",
      title: "Enhance payment gateway integration",
      description: "Add support for multiple payment providers",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-02",
      project: "E-commerce Website",
      estimatedHours: 16,
      actualHours: 0,
    },
    {
      id: "16",
      title: "Create email template system",
      description: "Develop customizable email templates for notifications",
      status: "todo",
      priority: "low",
      assignee: "John Doe",
      dueDate: "2023-07-15",
      project: "CRM Integration",
      estimatedHours: 12,
      actualHours: 0,
    },
    {
      id: "17",
      title: "Implement bill payment feature",
      description: "Allow users to pay bills directly from the app",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-28",
      project: "Mobile Banking App",
      estimatedHours: 20,
      actualHours: 0,
    },
    {
      id: "18",
      title: "Add product comparison feature",
      description: "Allow users to compare multiple products side by side",
      status: "todo",
      priority: "low",
      assignee: "John Doe",
      dueDate: "2023-07-20",
      project: "E-commerce Website",
      estimatedHours: 8,
      actualHours: 0,
    },
    {
      id: "19",
      title: "Fix customer lead assignment logic",
      description: "Leads not being assigned correctly to sales reps",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-14",
      project: "CRM Integration",
      estimatedHours: 4,
      actualHours: 2,
    },
    {
      id: "20",
      title: "Implement beneficiary management",
      description: "Allow users to add and manage payment beneficiaries",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-08",
      project: "Mobile Banking App",
      estimatedHours: 12,
      actualHours: 0,
    },
    {
      id: "21",
      title: "Create inventory alerts system",
      description: "Notify when product stock falls below threshold",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-10",
      project: "E-commerce Website",
      estimatedHours: 6,
      actualHours: 0,
    },
    {
      id: "22",
      title: "Implement two-factor authentication",
      description: "Add SMS and app-based 2FA for enhanced security",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-30",
      project: "Mobile Banking App",
      estimatedHours: 16,
      actualHours: 0,
    },
    {
      id: "23",
      title: "Optimize database queries",
      description: "Identify and fix slow queries in customer dashboard",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-05",
      project: "CRM Integration",
      estimatedHours: 8,
      actualHours: 0,
    },
    {
      id: "24",
      title: "Add product recommendations engine",
      description: "Implement ML-based recommendations for products",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-25",
      project: "E-commerce Website",
      estimatedHours: 24,
      actualHours: 0,
    },
    {
      id: "25",
      title: "Create sales performance dashboard",
      description: "Build visual dashboard for sales team metrics",
      status: "todo",
      priority: "low",
      assignee: "John Doe",
      dueDate: "2023-07-20",
      project: "CRM Integration",
      estimatedHours: 20,
      actualHours: 0,
    },
    {
      id: "26",
      title: "Implement internationalization",
      description: "Add multi-language support throughout the app",
      status: "todo",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-07-15",
      project: "Mobile Banking App",
      estimatedHours: 30,
      actualHours: 0,
    },
    {
      id: "27",
      title: "Fix checkout session timeout",
      description: "Users losing cart when session expires",
      status: "todo",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-20",
      project: "E-commerce Website",
      estimatedHours: 5,
      actualHours: 0,
    },
    {
      id: "28",
      title: "Add email verification workflow",
      description: "Implement email verification for new accounts",
      status: "done",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2023-06-05",
      project: "Mobile Banking App",
      estimatedHours: 6,
      actualHours: 7,
    },
    {
      id: "29",
      title: "Create customer journey reports",
      description: "Add reports showing customer interactions over time",
      status: "todo",
      priority: "low",
      assignee: "John Doe",
      dueDate: "2023-07-30",
      project: "CRM Integration",
      estimatedHours: 16,
      actualHours: 0,
    },
    {
      id: "30",
      title: "Fix mobile viewport issues",
      description: "Address responsive design issues on small screens",
      status: "in-progress",
      priority: "medium",
      assignee: "John Doe",
      dueDate: "2023-06-18",
      project: "E-commerce Website",
      estimatedHours: 4,
      actualHours: 1.5,
    },
  ].map((task, index) => {
    // Update some task priorities to have 4 different priority levels
    let priority = task.priority;
    if (index % 4 === 0) priority = "critical";
    else if (index % 4 === 1) priority = "high";
    else if (index % 4 === 2) priority = "medium";
    else priority = "low";
    
    // Update due dates to be closer to April 2025
    const baseDate = new Date(2025, 3, 1); // April 1, 2025
    const daysOffset = [0, 4, 9, 14][index % 4]; // Distribute to 1st, 5th, 10th, 15th
    const dueDate = new Date(baseDate);
    dueDate.setDate(baseDate.getDate() + daysOffset);
    
    // For some tasks, set due date to today or past to show urgency
    if (index % 10 === 3) { // Some overdue tasks
      dueDate.setFullYear(new Date().getFullYear());
      dueDate.setMonth(new Date().getMonth());
      dueDate.setDate(new Date().getDate() - Math.floor(Math.random() * 5) - 1); // 1-5 days overdue
    } else if (index % 10 === 7) { // Some due today
      dueDate.setFullYear(new Date().getFullYear());
      dueDate.setMonth(new Date().getMonth());
      dueDate.setDate(new Date().getDate());
    }
    
    // Ensure all tasks have actual hours
    const actualHours = task.actualHours !== undefined ? 
      task.actualHours : 
      Math.round(Math.random() * task.estimatedHours * 10) / 10;
    
    return {
      ...task,
      priority,
      dueDate: dueDate.toISOString().split('T')[0],
      actualHours
    };
  });
  
  // Projects for filter
  const projects = [
    { id: "all", name: "All Projects" },
    { id: "1", name: "E-commerce Website" },
    { id: "2", name: "Mobile Banking App" },
    { id: "3", name: "CRM Integration" },
  ];
  
  // Time tracking data
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedTimeView, setSelectedTimeView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSelectedDateToday, setIsSelectedDateToday] = useState(false);
  
  // Helper function to check if a date is today
  const checkIsToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  // Initialize isSelectedDateToday on component mount
  useEffect(() => {
    setIsSelectedDateToday(checkIsToday(selectedDate));
  }, [selectedDate]);
  
  // Function to format selected date
  const formatSelectedDate = (date) => {
    return date.toLocaleDateString();
  };
  
  // Function to get the appropriate hours header based on the selected date
  const getHoursHeader = (date) => {
    if (checkIsToday(date)) {
      return "Hours Today";
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.getDate() === yesterday.getDate() && 
          date.getMonth() === yesterday.getMonth() && 
          date.getFullYear() === yesterday.getFullYear()) {
        return "Hours Yesterday";
      } else {
        // Format like "Mar 25, 2025"
        return `Hours: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    }
  };
  
  // Function to check if a date is a weekend (Saturday or Sunday)
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };
  
  // Functions to navigate between days
  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };
  
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Don't allow navigation to future dates
    if (nextDay > new Date()) {
      return;
    }
    
    setSelectedDate(nextDay);
  };
  
  // Helper function to get next Saturday
  const getNextSaturday = () => {
    const date = new Date();
    const day = date.getDay(); // 0 is Sunday, 6 is Saturday
    const daysToAdd = day === 6 ? 7 : 6 - day;
    date.setDate(date.getDate() + daysToAdd);
    return date;
  };
  
  // Helper function to get next Sunday
  const getNextSunday = () => {
    const date = new Date();
    const day = date.getDay(); // 0 is Sunday, 6 is Saturday
    const daysToAdd = day === 0 ? 7 : 7 - day;
    date.setDate(date.getDate() + daysToAdd);
    return date;
  };
  
  const timeEntries = [
    // Today
    {
      id: "1",
      project: "E-commerce Website",
      task: "Fix navigation bug on mobile",
      date: new Date().toISOString().split('T')[0],
      startTime: "09:30",
      endTime: "12:15",
      duration: "2h 45m",
      description: "Working on navbar collapse issue",
    },
    {
      id: "2",
      project: "Mobile Banking App",
      task: "Implement dark mode",
      date: new Date().toISOString().split('T')[0],
      startTime: "13:00",
      endTime: "14:30",
      duration: "1h 30m",
      description: "Setting up theme switcher",
    },
    
    // Saturday - Weekend work
    {
      id: "weekend-1",
      project: "E-commerce Website",
      task: "Critical bug fix for payment gateway",
      date: getNextSaturday().toISOString().split('T')[0],
      startTime: "10:00",
      endTime: "12:30",
      duration: "2h 30m",
      description: "Emergency fix for payment processing issue",
    },
    
    // Sunday - Empty time log to demonstrate the message
    
    // Yesterday (1 day ago) - Multiple tasks
    {
      id: "3",
      project: "CRM Integration",
      task: "Fix customer lead assignment logic",
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
      startTime: "10:00",
      endTime: "13:30",
      duration: "3h 30m",
      description: "Debugging lead assignment issues",
    },
    {
      id: "4",
      project: "Mobile Banking App",
      task: "Implement bill payment feature",
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
      startTime: "14:30",
      endTime: "17:00",
      duration: "2h 30m",
      description: "Creating payment form UI",
    },
    {
      id: "5",
      project: "Mobile Banking App",
      task: "Extended debugging session",
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
      startTime: "17:30",
      endTime: "19:00",
      duration: "1h 30m",
      description: "Overtime to fix critical issues",
    },
    
    // 2 days ago - Full day on single task
    {
      id: "6",
      project: "E-commerce Website",
      task: "Product Catalog Redesign",
      date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
      startTime: "09:00",
      endTime: "17:30",
      duration: "8h 30m",
      description: "Complete redesign of product listings and filtering system",
    },
    
    // 3 days ago - Multiple tasks
    {
      id: "7",
      project: "CRM Integration",
      task: "Create email template system",
      date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
      startTime: "09:15",
      endTime: "11:45",
      duration: "2h 30m",
      description: "Building customizable email templates",
    },
    {
      id: "8",
      project: "Mobile Banking App",
      task: "Implement two-factor authentication",
      date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
      startTime: "12:30",
      endTime: "17:00",
      duration: "4h 30m",
      description: "Adding SMS and app-based 2FA for enhanced security",
    },
    {
      id: "9",
      project: "CRM Integration",
      task: "Fix broken charts in dashboard",
      date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
      startTime: "17:15",
      endTime: "18:45",
      duration: "1h 30m",
      description: "Overtime to fix data visualization in manager dashboard",
    },
    
    // 4 days ago - Another full day single task
    {
      id: "10",
      project: "Mobile Banking App",
      task: "Sprint Planning & Architecture Design",
      date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0],
      startTime: "09:00",
      endTime: "18:00",
      duration: "9h 0m",
      description: "Full day collaboration with team on sprint planning and system architecture",
    },
    
    // 5 days ago - Multiple tasks
    {
      id: "11",
      project: "E-commerce Website",
      task: "Fix checkout session timeout",
      date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
      startTime: "09:00",
      endTime: "10:30",
      duration: "1h 30m",
      description: "Users losing cart when session expires",
    },
    {
      id: "12",
      project: "CRM Integration",
      task: "Optimize database queries",
      date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
      startTime: "10:45",
      endTime: "13:15",
      duration: "2h 30m",
      description: "Identify and fix slow queries in customer dashboard",
    },
    {
      id: "13",
      project: "E-commerce Website",
      task: "Add product comparison feature",
      date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
      startTime: "14:00",
      endTime: "17:30",
      duration: "3h 30m",
      description: "Allow users to compare multiple products side by side",
    },
    
    // 6 days ago - Mixed length tasks
    {
      id: "14",
      project: "Mobile Banking App",
      task: "Beneficiary Management UI",
      date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().split('T')[0],
      startTime: "09:30",
      endTime: "13:00",
      duration: "3h 30m",
      description: "Implement UI for adding and managing payment beneficiaries",
    },
    {
      id: "15",
      project: "CRM Integration",
      task: "Sales Performance Dashboard",
      date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().split('T')[0],
      startTime: "13:45",
      endTime: "18:15",
      duration: "4h 30m",
      description: "Building visual dashboard for sales team metrics",
    },
    
    // Entries for future date (for testing future date handling)
    {
      id: "16",
      project: "E-commerce Website",
      task: "Optimize product search performance",
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      startTime: "09:00",
      endTime: "12:00",
      duration: "3h 0m",
      description: "Implementing caching for search results",
    },
    {
      id: "17",
      project: "CRM Integration",
      task: "Implement customer segmentation",
      date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
      startTime: "13:00",
      endTime: "16:30",
      duration: "3h 30m",
      description: "Adding tagging system for segmentation",
    }
  ];
  
  // Filter time entries for the selected date
  const selectedDateFormatted = selectedDate.toISOString().split('T')[0];
  const filteredTimeEntries = timeEntries.filter(entry => entry.date === selectedDateFormatted);
  
  // Calculate daily hours total for selected date
  const dailyTotal = filteredTimeEntries.reduce((total, entry) => {
    // Convert duration like "2h 45m" to hours (2.75)
    const durationStr = entry.duration;
    const hourMatch = durationStr.match(/(\d+)h/);
    const minuteMatch = durationStr.match(/(\d+)m/);
    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
    return total + hours + (minutes / 60);
  }, 0);
  
  // Calculate the percentage of daily hours compared to target (8 hours)
  const targetHours = 8;
  const dailyHoursPercentage = Math.min((dailyTotal / targetHours) * 100, 100);
  
  // Project bookings/reservations
  const projectBookings = [
    {
      id: "1",
      project: "E-commerce Website",
      allocation: 50, // percentage
      period: "Current Week",
      startDate: "2023-06-05",
      endDate: "2023-06-09",
    },
    {
      id: "2",
      project: "Mobile Banking App",
      allocation: 50,
      period: "Current Week",
      startDate: "2023-06-05",
      endDate: "2023-06-09",
    },
    {
      id: "3", 
      project: "E-commerce Website",
      allocation: 25,
      period: "Next Week",
      startDate: "2023-06-12",
      endDate: "2023-06-16",
    },
    {
      id: "4",
      project: "Mobile Banking App",
      allocation: 75,
      period: "Next Week",
      startDate: "2023-06-12",
      endDate: "2023-06-16",
    }
  ];
  
  // Sprint progress
  const sprintData = {
    name: "Sprint 24",
    startDate: "2023-05-29",
    endDate: "2023-06-11",
    progress: 65,
    totalTasks: 24,
    completedTasks: 16,
    myTasks: 6,
    myCompletedTasks: 3,
  };
  
  // Enhanced performance metrics with clearer historical data for trends
  const performanceMetrics = [
    {
      name: "Estimation Accuracy",
      value: "85%",
      description: "Estimated vs. Actual Time",
      trend: "increasing",
      icon: <Timer className="h-5 w-5" />,
      history: [
        { label: "4 weeks ago", value: 75 },
        { label: "3 weeks ago", value: 78 },
        { label: "2 weeks ago", value: 80 },
        { label: "Last week", value: 82 },
        { label: "This week", value: 85 }
      ],
      explanation: "This metric shows how accurately you estimate task completion times. Higher percentage means your estimates are closer to actual time spent.",
      examples: {
        good: "Above 85% means your estimations are reliable and help the team plan effectively.",
        bad: "Below 70% indicates significant discrepancies between estimated and actual time, which can disrupt sprint planning."
      },
      improvement: "Break tasks into smaller components, track time spent on similar tasks in the past, and account for unexpected issues in your estimates. Review previous tasks where estimates were off by a large margin.",
      goodThreshold: 85,
    },
    {
      name: "Task Duration",
      value: "2.4 days",
      description: "Average time from start to done",
      trend: "stable",
      icon: <Loader2 className="h-5 w-5" />,
      history: [
        { label: "4 weeks ago", value: 2.6 },
        { label: "3 weeks ago", value: 2.5 },
        { label: "2 weeks ago", value: 2.4 },
        { label: "Last week", value: 2.4 },
        { label: "This week", value: 2.4 }
      ],
      explanation: "The average time it takes for you to complete a task from when you start working on it until it's marked as done.",
      examples: {
        good: "Under 3 days indicates efficient task completion, keeping work moving through the pipeline smoothly.",
        bad: "Over 5 days suggests tasks may be too large or you're facing obstacles that slow progress."
      },
      improvement: "Break large tasks into smaller subtasks, minimize context switching, address blockers promptly, and use focused work sessions. Consider using time blocking techniques.",
      goodThreshold: 3,
    },
    {
      name: "Review Time",
      value: "8.5 hrs",
      description: "Average time in code review",
      trend: "decreasing",
      icon: <RotateCcw className="h-5 w-5" />,
      history: [
        { label: "4 weeks ago", value: 14 },
        { label: "3 weeks ago", value: 12 },
        { label: "2 weeks ago", value: 10 },
        { label: "Last week", value: 9 },
        { label: "This week", value: 8.5 }
      ],
      explanation: "The average time your code spends in review before being approved or requiring changes.",
      examples: {
        good: "Under 12 hours means your code moves quickly through the review process, maintaining team velocity.",
        bad: "Over 24 hours indicates potential bottlenecks in the review process that delay feature completion."
      },
      improvement: "Create smaller, more focused pull requests, provide clear documentation, address feedback promptly, and proactively request reviews from available team members.",
      goodThreshold: 12,
    },
    {
      name: "QA Return Rate",
      value: "15%",
      description: "Tasks returned from QA testing",
      trend: "decreasing",
      icon: <ArrowDown className="h-5 w-5" />,
      history: [
        { label: "4 weeks ago", value: 25 },
        { label: "3 weeks ago", value: 22 },
        { label: "2 weeks ago", value: 18 },
        { label: "Last week", value: 16 },
        { label: "This week", value: 15 }
      ],
      explanation: "The percentage of tasks that QA returns due to bugs or issues. Lower is better, indicating fewer defects in your deliverables.",
      examples: {
        good: "Below 15% indicates high-quality code with few defects found during testing.",
        bad: "Above 25% suggests more thorough testing is needed before submitting work to QA."
      },
      improvement: "Implement more thorough unit testing, create test cases before coding, perform self-review before submitting to QA, and establish a pre-QA checklist for common issues.",
      goodThreshold: 15,
    }
  ];
  
  // Filtering tasks based on selected project and status
  const filteredTasks = myTasks.filter(task => {
    const projectMatch = selectedProject === "all" 
      ? true
      : task.project === projects.find(p => p.id === selectedProject)?.name;
      
    const statusMatch = selectedStatuses.includes(task.status);
    
    return projectMatch && statusMatch;
  });
  
  // Project allocations data - enhanced to have daily allocations
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  
  // Function to get date for a specific day offset from today
  const getDateWithOffset = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date;
  };
  
  // Function to get the start of the week (Monday) for a given week offset
  const getWeekStart = (weekOffset: number) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to get Monday
    
    const monday = new Date(now);
    monday.setDate(now.getDate() + daysToMonday + (weekOffset * 7));
    return monday;
  };
  
  // Get dates for the current week view
  const weekStart = getWeekStart(currentWeekOffset);
  const weekDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });
  
  // Format date as "MMM D" (e.g., "Jun 5")
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Format date as "YYYY-MM-DD" for comparison
  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Weekly project allocations with more realistic daily assignments and gray colors
  const projectAllocations = {
    // Current Week (Mar 31 - Apr 4)
    [formatDateKey(new Date())]: [ // Today
      { project: "E-commerce Website", hours: 4, color: "bg-gray-500" },
      { project: "Mobile Banking App", hours: 3, color: "bg-gray-400" },
      { project: "API Gateway Project", hours: 1, color: "bg-gray-600" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 1)))]: [ // Tomorrow
      { project: "E-commerce Website", hours: 3, color: "bg-gray-500" },
      { project: "Mobile Banking App", hours: 3, color: "bg-gray-400" },
      // Partial day - only 6 hours allocated
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 2)))]: [ // Day after tomorrow
      { project: "E-commerce Website", hours: 2, color: "bg-gray-500" },
      { project: "Mobile Banking App", hours: 4, color: "bg-gray-400" },
      { project: "CRM Integration", hours: 2, color: "bg-gray-600" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 3)))]: [ // 3 days from now
      { project: "Mobile Banking App", hours: 6, color: "bg-gray-400" },
      // Partial day - only 6 hours allocated
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 4)))]: [ // 4 days from now
      { project: "E-commerce Website", hours: 3, color: "bg-gray-500" },
      { project: "CRM Integration", hours: 5, color: "bg-gray-600" },
    ],
    // Previous Week
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() - 3)))]: [
      { project: "E-commerce Website", hours: 8, color: "bg-gray-500" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() - 4)))]: [
      { project: "E-commerce Website", hours: 5, color: "bg-gray-500" },
      { project: "Mobile Banking App", hours: 3, color: "bg-gray-400" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() - 5)))]: [ 
      { project: "Mobile Banking App", hours: 4, color: "bg-gray-400" },
      { project: "Data Analytics Dashboard", hours: 4, color: "bg-gray-700" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() - 6)))]: [
      // Partial day - only 4 hours allocated
      { project: "E-commerce Website", hours: 4, color: "bg-gray-500" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() - 7)))]: [
      { project: "CRM Integration", hours: 5, color: "bg-gray-600" },
      { project: "Data Analytics Dashboard", hours: 3, color: "bg-gray-700" },
    ],
    // Next Week
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 7)))]: [
      { project: "E-commerce Website", hours: 2, color: "bg-gray-500" },
      { project: "Mobile Banking App", hours: 6, color: "bg-gray-400" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 8)))]: [
      { project: "Mobile Banking App", hours: 4, color: "bg-gray-400" },
      { project: "API Gateway Project", hours: 4, color: "bg-gray-600" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 9)))]: [
      { project: "Mobile Banking App", hours: 3, color: "bg-gray-400" },
      { project: "CRM Integration", hours: 3, color: "bg-gray-600" },
      { project: "API Gateway Project", hours: 2, color: "bg-gray-600" },
    ],
    [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 10)))]: [
      { project: "Mobile Banking App", hours: 3, color: "bg-gray-400" },
      { project: "CRM Integration", hours: 5, color: "bg-gray-600" },
    ],
    // Empty allocation for day to show "No Allocation"
  };
  
  // Generate the week's date range string (e.g., "Jun 5 - Jun 9")
  const weekRangeString = `${formatDate(weekDates[0])} - ${formatDate(weekDates[4])}`;
  
  // Helper to get total hours allocated for a day
  const getDailyTotalHours = (date: Date) => {
    const dateKey = formatDateKey(date);
    const allocations = projectAllocations[dateKey] || [];
    return allocations.reduce((total, allocation) => total + allocation.hours, 0);
  };
  
  // Helper to get allocation for specific day and project
  const getProjectAllocation = (date: Date, project: string) => {
    const dateKey = formatDateKey(date);
    const allocations = projectAllocations[dateKey] || [];
    return allocations.find(a => a.project === project);
  };
  
  // Get unique projects across displayed week
  const getWeekProjects = () => {
    const projects = new Set<string>();
    weekDates.forEach(date => {
      const dateKey = formatDateKey(date);
      const allocations = projectAllocations[dateKey] || [];
      allocations.forEach(allocation => {
        projects.add(allocation.project);
      });
    });
    return Array.from(projects);
  };
  
  const weekProjects = getWeekProjects();
  
  // Get color for a project
  const getProjectColor = (project: string) => {
    // Find any allocation with this project to get its color
    for (const dateKey in projectAllocations) {
      const allocations = projectAllocations[dateKey];
      const allocation = allocations.find(a => a.project === project);
      if (allocation) {
        return allocation.color;
      }
    }
    return "bg-gray-500"; // Default color
  };
  
  // Helper function to determine trend icon and color
  const getTrendDetails = (trend: string, name: string) => {
    if (trend === "increasing" && name !== "QA Return Rate") {
      return { 
        icon: <TrendingUp className="h-3 w-3" />, 
        color: "text-green-600",
        text: "Improving" 
      };
    } else if (trend === "decreasing" && name === "QA Return Rate") {
      return { 
        icon: <TrendingDown className="h-3 w-3" />, 
        color: "text-green-600",
        text: "Improving" 
      };
    } else if (trend === "decreasing" && name !== "QA Return Rate") {
      return { 
        icon: <TrendingDown className="h-3 w-3" />, 
        color: "text-red-600",
        text: "Declining" 
      };
    } else {
      return { 
        icon: <Minus className="h-3 w-3" />, 
        color: "text-blue-600",
        text: "Stable" 
      };
    }
  };
  
  // Helper function to generate sparkline SVG from history data
  const generateSparkline = (data: {label: string, value: number}[], metricName: string) => {
    const width = 200;
    const height = 50;
    const padding = 5;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Determine min and max values for scaling
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1; // Avoid division by zero
    
    // Create points for the polyline
    const points = data.map((d, i) => {
      const x = padding + (i * (chartWidth / (data.length - 1)));
      // Invert the y value for SVG coordinates (0 is top)
      // For some metrics lower is better, for others higher is better
      const normalizedValue = (d.value - min) / range;
      let y;
      if (metricName === "QA Return Rate" || metricName === "Review Time") {
        // For these metrics, lower is better
        y = padding + (normalizedValue * chartHeight);
      } else {
        // For other metrics, higher is better
        y = padding + ((1 - normalizedValue) * chartHeight);
      }
      return `${x},${y}`;
    }).join(' ');
    
    // Determine color based on trend
    let strokeColor;
    if (metricName === "QA Return Rate" || metricName === "Review Time") {
      // For these metrics, lower is better
      strokeColor = values[0] > values[values.length-1] ? "#22c55e" : "#ef4444";
    } else {
      // For other metrics, higher is better
      strokeColor = values[0] < values[values.length-1] ? "#22c55e" : "#ef4444";
    }
    
    // For stable metrics, use a neutral color
    if (values[0] === values[values.length-1]) {
      strokeColor = "#f59e0b";
    }
    
    return (
      <div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          <polyline
            points={points}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Add dots for each time point */}
          {data.map((d, i) => {
            const x = padding + (i * (chartWidth / (data.length - 1)));
            const normalizedValue = (d.value - min) / range;
            let y;
            if (metricName === "QA Return Rate" || metricName === "Review Time") {
              y = padding + (normalizedValue * chartHeight);
            } else {
              y = padding + ((1 - normalizedValue) * chartHeight);
            }
            
            return (
              <circle 
                key={i} 
                cx={x} 
                cy={y} 
                r="2" 
                fill={strokeColor}
              />
            );
          })}
        </svg>
        
        {/* Time labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>4 weeks ago</span>
          <span className="text-center">This week</span>
        </div>
      </div>
    );
  };
  
  // Render based on selected role
  const renderDashboard = () => {
    if (dashboardRole === "developer") {
      return (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  My Open Tasks
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredTasks.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across {projects.length - 1} projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sprint Progress</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sprintData.progress}%</div>
                <div className="mt-2">
                  <Progress value={sprintData.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {sprintData.myCompletedTasks} of {sprintData.myTasks} tasks completed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Time Tracking Section - restructured with left and right columns */}
          <Card className="mt-4">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Time Tracking</CardTitle>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Button variant="ghost" size="sm" onClick={goToPreviousDay}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="flex items-center gap-2 font-normal"
                      >
                        <CalendarDays className="h-4 w-4" />
                        <span className="font-medium">{formatSelectedDate(selectedDate)}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <DateCalendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        disableFutureDates={true}
                      />
                    </PopoverContent>
                  </Popover>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={goToNextDay}
                    disabled={isSelectedDateToday}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              </CardHeader>
              <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Left side - Hours Today summary */}
                <div className="md:col-span-2 flex flex-col justify-between pr-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{getHoursHeader(selectedDate)}</h3>
                    <div className="text-3xl font-bold mb-3">
                      {dailyTotal.toFixed(1)}h
                    </div>
                    <Progress 
                      value={Math.min(dailyTotal / 8 * 100, 100)} 
                      className="h-2 mb-2"
                      indicatorClassName={
                        dailyTotal > 8.5 ? "bg-red-500" : 
                        dailyTotal > 8 ? "bg-orange-500" : 
                        "bg-green-500"
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      {dailyTotal.toFixed(1)} of 8h target
                    </p>
                    
                    {isWeekend(selectedDate) ? (
                      <div className="mt-6 p-3 bg-purple-500/10 border border-purple-500/30 rounded-md">
                        <h4 className="text-sm font-medium flex items-center text-purple-600 dark:text-purple-400">
                          <Info className="h-4 w-4 mr-1" />
                          Weekend Day
                        </h4>
                        <p className="text-xs mt-1 text-muted-foreground">
                          {dailyTotal > 0 
                            ? `You've logged ${dailyTotal.toFixed(1)}h on this weekend day. Make sure to take time to rest too!` 
                            : `It's the weekend! Enjoy time with your family and friends.`}
                        </p>
                      </div>
                    ) : dailyTotal > 8 ? (
                      <div className="mt-6 p-3 bg-orange-500/10 border border-orange-500/30 rounded-md">
                        <h4 className="text-sm font-medium flex items-center text-orange-600 dark:text-orange-400">
                          <Info className="h-4 w-4 mr-1" />
                          Overtime Notice
                        </h4>
                        <p className="text-xs mt-1 text-muted-foreground">
                          You've logged {(dailyTotal - 8).toFixed(1)}h over the standard workday. 
                          Consider balancing your hours across the week.
                        </p>
                      </div>
                    ) : dailyTotal < 8 ? (
                      <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-md">
                        <h4 className="text-sm font-medium flex items-center text-blue-600 dark:text-blue-400">
                          <Info className="h-4 w-4 mr-1" />
                          Remaining Hours
                        </h4>
                        <p className="text-xs mt-1 text-muted-foreground">
                          You have {(8 - dailyTotal).toFixed(1)}h remaining to complete the standard workday.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-md">
                        <h4 className="text-sm font-medium flex items-center text-green-600 dark:text-green-400">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Workday Complete
                        </h4>
                        <p className="text-xs mt-1 text-muted-foreground">
                          You've completed the standard 8-hour workday.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weekly Total:</span>
                      <span className="font-medium">18.5h / 40h</span>
                    </div>
                    <Progress value={18.5/40*100} className="h-1.5" />
                  </div>
                </div>
                
                {/* Right side - Time logs visualization */}
                <div className="md:col-span-3">
                  <div className="rounded-md border overflow-hidden h-full">
                    {/* Styled like weekly allocations */}
                    <div className="min-h-[250px] relative py-2">
                      <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                        <div>8h</div>
                        <div>4h</div>
                        <div>0h</div>
                      </div>
                      
                      {/* Remove vertical time guidelines */}
                      
                      <div className="flex flex-col h-full p-1">
                        {filteredTimeEntries.length > 0 ? (
                          <>
                            {filteredTimeEntries.map((entry) => {
                              // Convert duration like "2h 45m" to hours (2.75)
                              const durationStr = entry.duration;
                              const hourMatch = durationStr.match(/(\d+)h/);
                              const minuteMatch = durationStr.match(/(\d+)m/);
                              const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
                              const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
                              const entryHours = hours + (minutes / 60);
                              
                              // Assign different colors based on project
                              let bgColor = "bg-gray-500";
                              if (entry.project === "E-commerce Website") {
                                bgColor = "bg-gray-500";
                              } else if (entry.project === "Mobile Banking App") {
                                bgColor = "bg-gray-400";
                              } else if (entry.project === "CRM Integration") {
                                bgColor = "bg-gray-600";
                              }
                              
                              return (
                                <div 
                                  key={entry.id} 
                                  className={`rounded-sm p-2 mb-1 ${bgColor} text-white text-xs flex flex-col`}
                                  style={{ height: `${(entryHours / 8) * 100}%`, minHeight: '30px' }}
                                >
                                  <div className="font-medium truncate">{entry.task}</div>
                                  <div className="text-xs opacity-90 truncate">{entry.project}</div>
                                  <div className="text-xs mt-1 flex justify-between">
                                    <span>{entry.startTime} - {entry.endTime}</span>
                                    <span>{entry.duration}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                            No time entries for {formatSelectedDate(selectedDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>
          
          {/* My Tasks Section */}
          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold leading-none tracking-tight">
                      My Tasks: {selectedProject === "all" ? "All Projects" : 
                        projects.find(p => p.id === selectedProject)?.name}
                      {selectedProject !== "all" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                asChild 
                                variant="ghost" 
                                size="icon" 
                                className="ml-2 h-6 w-6 inline-flex align-top -translate-y-0.5"
                              >
                                <Link href={getWorkspaceLink("/tasks")}>
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="font-normal text-xs">
                              <p>Open {projects.find(p => p.id === selectedProject)?.name} Project Page</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Show projects</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuLabel>Select Project</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {projects.map((project) => (
                          <DropdownMenuItem 
                            key={project.id} 
                            onClick={() => setSelectedProject(project.id)}
                            className={selectedProject === project.id ? "bg-muted" : ""}
                          >
                            {project.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>
                    Tasks assigned to you
                  </CardDescription>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[180px]">
                    Status: {selectedStatuses.length === 3 ? "All" : `${selectedStatuses.length} selected`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedStatuses.includes("todo")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, "todo"]);
                      } else {
                        setSelectedStatuses(selectedStatuses.filter(s => s !== "todo"));
                      }
                    }}
                  >
                    To Do
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedStatuses.includes("in-progress")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, "in-progress"]);
                      } else {
                        setSelectedStatuses(selectedStatuses.filter(s => s !== "in-progress"));
                      }
                    }}
                  >
                    In Progress
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedStatuses.includes("done")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, "done"]);
                      } else {
                        setSelectedStatuses(selectedStatuses.filter(s => s !== "done"));
                      }
                    }}
                  >
                    Done
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No tasks found
                  </div>
                ) : (
                  <>
                    {/* Show first 10 tasks initially */}
                    {filteredTasks.slice(0, showAllTasks ? filteredTasks.length : 10).map((task) => (
                      <div key={task.id} className="flex items-start justify-between gap-4 border-b pb-4 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div 
                              className={`w-2 h-2 rounded-full cursor-help ${
                                task.priority === "critical" 
                                  ? "bg-red-500" 
                                  : task.priority === "high" 
                                  ? "bg-orange-500" 
                                  : task.priority === "medium" 
                                  ? "bg-green-500" 
                                  : "bg-gray-400"
                              }`}
                              title={`Priority: ${
                                task.priority === "critical" 
                                  ? "Critical" 
                                  : task.priority === "high" 
                                  ? "High" 
                                  : task.priority === "medium" 
                                  ? "Medium" 
                                  : "Low"
                              }`}
                            />
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge 
                              variant="outline" 
                              className={
                                task.status === "done" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                                  : task.status === "in-progress" 
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" 
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }
                            >
                              {task.status === "in-progress" ? "In Progress" : 
                                task.status === "todo" ? "To Do" : "Done"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {task.project}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {/* Color code due dates */}
                              <span className={
                                new Date(task.dueDate).toDateString() === new Date().toDateString() 
                                  ? "text-orange-500 font-medium" 
                                  : new Date(task.dueDate) < new Date() 
                                  ? "text-red-500 font-medium" 
                                  : ""
                              }>
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Est: {task.estimatedHours}h
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              Log: {task.actualHours}h
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="mt-1">
                          {task.id === "2" || task.id === "7" ? "Close Timeline" : "Start Task"}
                        </Button>
                      </div>
                    ))}
                    
                    {/* Show "Show All Tasks" button if tasks > 10 */}
                    {filteredTasks.length > 10 && (
                      <div className="flex justify-center pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAllTasks(!showAllTasks)}
                        >
                          {showAllTasks ? "Show Less" : `Show All Tasks (${filteredTasks.length})`}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              {/* "Create New Task" button removed */}
            </CardFooter>
          </Card>
          
          {/* Updated Project Allocations Section */}
          <Card className="mt-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Weekly Allocations</CardTitle>
                  <CardDescription>
                    Your project assignments for {weekRangeString}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentWeekOffset(0)}
                    className={currentWeekOffset === 0 ? "bg-muted" : ""}
                  >
                    Current Week
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Weekly project allocation calendar */}
              <div className="rounded-md border overflow-hidden">
                {/* Project legend */}
                <div className="flex items-center gap-4 p-4 border-b bg-muted/50">
                  <div className="text-sm font-medium">Projects:</div>
                  {weekProjects.map((project) => (
                    <div key={project} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full ${getProjectColor(project)}`}></div>
                      <span className="text-sm">{project}</span>
                    </div>
                  ))}
                </div>
                
                {/* Weekly calendar grid */}
                <div className="grid grid-cols-5 divide-x">
                  {/* Headers - Days of the week */}
                  {weekDates.map((date, index) => {
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = date.getDate();
                    const isToday = formatDateKey(date) === formatDateKey(new Date());
                    const totalHours = getDailyTotalHours(date);
                    
                    return (
                      <div key={index} className="flex flex-col">
                        <div className={`p-2 text-center border-b ${isToday ? 'bg-primary/10 font-bold' : 'bg-muted/50'}`}>
                          <div className="text-sm font-medium">{dayName}</div>
                          <div className="text-xs">{formatDate(date)}</div>
                        </div>
                        <div className="min-h-[200px] relative py-2">
                          {/* Hours scale on the left of first column */}
                          {index === 0 && (
                            <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground">
                              <div>8h</div>
                              <div>4h</div>
                              <div>0h</div>
                            </div>
                          )}
                        
                          {/* Project allocations for this day */}
                          {projectAllocations[formatDateKey(date)] ? (
                            <div className="flex flex-col h-full p-1">
                              {projectAllocations[formatDateKey(date)].map((allocation, allocationIndex) => (
                                <div 
                                  key={`${allocation.project}-${allocationIndex}`}
                                  className={`rounded-sm p-1 mb-1 ${allocation.color} text-white text-xs flex flex-col`}
                                  style={{ height: `${(allocation.hours / 8) * 100}%`, minHeight: '20px' }}
                                >
                                  <div className="font-medium truncate">{allocation.project}: {allocation.hours}h</div>
                                </div>
                              ))}
                              
                              {/* Empty space if less than 8 hours allocated */}
                              {totalHours < 8 && (
                                <div 
                                  className="bg-gray-100 dark:bg-gray-800 rounded-sm p-1 flex items-center justify-center text-xs text-muted-foreground"
                                  style={{ height: `${((8 - totalHours) / 8) * 100}%`, minHeight: '20px' }}
                                >
                                  No Allocation: {8 - totalHours}h
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                              No Allocation: 8h
                            </div>
                          )}
                        </div>
                        {/* Hour summary with color coding based on hours worked */}
                        <div 
                          className={`p-1 text-center border-t text-xs ${
                            totalHours === 8 ? "bg-green-500 text-white" : 
                            totalHours >= 6 ? "bg-green-400 text-white" : 
                            totalHours >= 4 ? "bg-green-300 text-gray-800" : 
                            totalHours >= 2 ? "bg-gray-300 text-gray-800" : 
                            "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {totalHours}/8h
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Enhanced Performance Metrics */}
          <Card className="mt-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Your personal performance indicators (tracked weekly)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {performanceMetrics.map((metric, index) => {
                  const { icon, color, text } = getTrendDetails(metric.trend, metric.name);
                  const isGood = metric.name === "QA Return Rate" 
                    ? parseFloat(metric.value) < metric.goodThreshold 
                    : parseFloat(metric.value) > metric.goodThreshold;
                    
                  return (
                    <Card key={index}>
                      <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                        <div className="flex items-center justify-center w-full">
                          <div className="p-2 rounded-full bg-muted">
                            {metric.icon}
                          </div>
                        </div>
                        
                        <div className="text-3xl font-bold">{metric.value}</div>
                        
                        <div className="font-semibold text-base flex items-center gap-1">
                          {metric.name}
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="p-0 h-5 w-5 rounded-full inline-flex"
                              onClick={() => {
                                // Toggle info for this specific metric
                                setOpenInfoId(openInfoId === metric.name ? null : metric.name);
                              }}
                            >
                              <Info className="h-3.5 w-3.5" />
                            </Button>
                            
                            {openInfoId === metric.name && (
                              <div className="absolute z-50 mt-1 -right-4 w-72 p-3 bg-popover rounded-md shadow-md text-left border border-border">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium">{metric.name}</h4>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-5 w-5 p-0"
                                    onClick={() => setOpenInfoId(null)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                                
                                <p className="text-xs mb-3">{metric.explanation}</p>
                                
                                <div className="mb-3">
                                  <h5 className="text-xs font-medium mb-1">Examples:</h5>
                                  <div className="pl-2 border-l-2 border-green-500 mb-1.5">
                                    <p className="text-xs text-green-700 dark:text-green-400">
                                      <span className="font-medium">Good: </span>
                                      {metric.examples.good}
                                    </p>
                                  </div>
                                  <div className="pl-2 border-l-2 border-red-500">
                                    <p className="text-xs text-red-700 dark:text-red-400">
                                      <span className="font-medium">Needs Improvement: </span>
                                      {metric.examples.bad}
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h5 className="text-xs font-medium mb-1">How to improve:</h5>
                                  <p className="text-xs">{metric.improvement}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {metric.description}
                        </div>
                        
                        {/* Trend line visualization */}
                        <div className="mt-3 px-2">
                          {generateSparkline(metric.history, metric.name)}
                        </div>
                        
                        <div className="flex items-center justify-center mt-2">
                          {metric.trend === "increasing" && (
                            <Badge variant={metric.name === "Estimation Accuracy" 
                                ? "outline" 
                                : "destructive"} 
                              className={metric.name === "Estimation Accuracy" 
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600" 
                                : "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"}>
                              {metric.name === "Estimation Accuracy" ? (
                                <><TrendingUp className="mr-1 h-3 w-3" /> Improving</>
                              ) : (
                                <><TrendingUp className="mr-1 h-3 w-3" /> Declining</>
                              )}
                            </Badge>
                          )}
                          {metric.trend === "decreasing" && (
                            <Badge variant={metric.name === "QA Return Rate" || metric.name === "Review Time" 
                                ? "outline" 
                                : "destructive"} 
                              className={metric.name === "QA Return Rate" || metric.name === "Review Time" 
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600" 
                                : "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"}>
                              {metric.name === "QA Return Rate" || metric.name === "Review Time" ? (
                                <><TrendingDown className="mr-1 h-3 w-3" /> Improving</>
                              ) : (
                                <><TrendingDown className="mr-1 h-3 w-3" /> Declining</>
                              )}
                            </Badge>
                          )}
                          {metric.trend === "stable" && (
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 hover:text-orange-600">
                              <Minus className="mr-1 h-3 w-3" /> Stable
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      );
    } else if (dashboardRole === "manager") {
      // Sample data for Manager dashboard
      const teamTasks = [
        { status: "todo", count: 12, label: "To Do" },
        { status: "in-progress", count: 8, label: "In Progress" },
        { status: "review", count: 5, label: "In Review" },
        { status: "done", count: 18, label: "Done" },
      ];
      
      const teamMembers = [
        { id: "1", name: "John Doe", avatar: "/avatars/user.jpg", role: "Frontend Developer", tasks: 5, overdue: 1 },
        { id: "2", name: "Emily Williams", avatar: "/avatars/user.jpg", role: "UI/UX Designer", tasks: 3, overdue: 0 },
        { id: "3", name: "Michael Chen", avatar: "/avatars/user.jpg", role: "Backend Developer", tasks: 7, overdue: 2 },
        { id: "4", name: "Sarah Miller", avatar: "/avatars/user.jpg", role: "QA Engineer", tasks: 4, overdue: 0 },
      ];
      
      const blockerTasks = [
        { id: "1", title: "API integration failing", project: "Mobile Banking App", assignee: "Michael Chen", daysOverdue: 3 },
        { id: "2", title: "Design assets missing", project: "E-commerce Website", assignee: "Emily Williams", daysOverdue: 1 },
        { id: "3", title: "Database optimization needed", project: "CRM Integration", assignee: "John Doe", daysOverdue: 2 },
      ];
      
      const sprintVelocity = [
        { sprint: "Sprint 21", planned: 45, completed: 38 },
        { sprint: "Sprint 22", planned: 42, completed: 40 },
        { sprint: "Sprint 23", planned: 48, completed: 42 },
        { sprint: "Sprint 24", planned: 50, completed: 32 },
      ];
      
      const currentSprint = {
        name: "Sprint 24",
        startDate: "2023-05-29",
        endDate: "2023-06-11",
        progress: 65,
        totalStoryPoints: 50,
        completedStoryPoints: 32,
        addedScope: 5,
        removedScope: 2,
      };
      
      const teamTimeLogsByDay = [
        { day: "Monday", total: 56, target: 64, overlogged: 0, underlogged: 8 },
        { day: "Tuesday", total: 62, target: 64, overlogged: 0, underlogged: 2 },
        { day: "Wednesday", total: 68, target: 64, overlogged: 4, underlogged: 0 },
        { day: "Thursday", total: 58, target: 64, overlogged: 0, underlogged: 6 },
        { day: "Friday", total: 52, target: 64, overlogged: 0, underlogged: 12 },
      ];
      
      const qaStats = [
        { id: "1", name: "John Doe", returnRate: 15, avgFixTime: "4.5h" },
        { id: "2", name: "Emily Williams", returnRate: 8, avgFixTime: "2.3h" },
        { id: "3", name: "Michael Chen", returnRate: 22, avgFixTime: "6.1h" },
        { id: "4", name: "Sarah Miller", returnRate: 5, avgFixTime: "1.8h" },
      ];
      
      const resourceDistribution = [
        { id: "1", name: "John Doe", allocation: 85, status: "Optimal", projects: 2 },
        { id: "2", name: "Emily Williams", allocation: 60, status: "Available", projects: 1 },
        { id: "3", name: "Michael Chen", allocation: 110, status: "Overallocated", projects: 3 },
        { id: "4", name: "Sarah Miller", allocation: 75, status: "Optimal", projects: 2 },
        { id: "5", name: "David Johnson", allocation: 100, status: "Full", projects: 1 },
      ];
      
      return (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamTasks.reduce((acc, task) => acc + task.count, 0)}</div>
                <p className="text-xs text-muted-foreground">
                  Across {projects.length - 1} projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamMembers.length}</div>
                <p className="text-xs text-muted-foreground">
                  {teamMembers.reduce((acc, member) => acc + member.overdue, 0)} overdue tasks
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sprint Progress</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentSprint.progress}%</div>
                <div className="mt-2">
                  <Progress value={currentSprint.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentSprint.completedStoryPoints} of {currentSprint.totalStoryPoints} story points
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Hours
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0)}h
                </div>
                <div className="mt-2">
                  <Progress value={teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0) / teamTimeLogsByDay.reduce((acc, day) => acc + day.target, 0) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0) / teamTimeLogsByDay.reduce((acc, day) => acc + day.target, 0) * 100)}% of target
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Team Task Overview */}
          <div className="grid gap-4 md:grid-cols-7 mt-4">
            <Card className="md:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Task Overview</CardTitle>
                    <CardDescription>
                      Current task distribution and status
                    </CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={getWorkspaceLink("/tasks")}>
                      View All Tasks
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {teamTasks.map((task) => (
                    <Card key={task.status} className="bg-muted/50">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{task.count}</div>
                          <div className="text-sm font-medium mt-1">{task.label}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <h3 className="text-sm font-medium mb-2">Top Blockers / Overdue Tasks</h3>
                <div className="space-y-4">
                  {blockerTasks.map((task) => (
                    <div key={task.id} className="flex justify-between items-start gap-4 border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                          {task.title}
                        </h4>
                        <div className="text-sm text-muted-foreground mt-1">
                          <span>{task.project}</span>
                          <span className="mx-2">•</span>
                          <span>Assigned to {task.assignee}</span>
                        </div>
                      </div>
                      <Badge variant="destructive">{task.daysOverdue} days overdue</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Sprint Overview */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Sprint Overview</CardTitle>
                <CardDescription>
                  Sprint {currentSprint.name} • {new Date(currentSprint.startDate).toLocaleDateString()} - {new Date(currentSprint.endDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Progress</h3>
                    <span className="text-sm">{currentSprint.progress}%</span>
                  </div>
                  <Progress value={currentSprint.progress} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="border rounded-md p-3 flex-1 mr-2 text-center">
                    <div className="text-2xl font-bold">{currentSprint.totalStoryPoints}</div>
                    <div className="text-xs text-muted-foreground">Total Points</div>
                  </div>
                  <div className="border rounded-md p-3 flex-1 ml-2 text-center">
                    <div className="text-2xl font-bold">{currentSprint.completedStoryPoints}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <h3 className="text-sm font-medium">Scope Changes</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Added</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      +{currentSprint.addedScope} points
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Removed</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                      -{currentSprint.removedScope} points
                    </Badge>
                  </div>
                </div>
                
                <h3 className="text-sm font-medium mb-2">Velocity Trend</h3>
                <div className="space-y-2">
                  {sprintVelocity.map((sprint) => (
                    <div key={sprint.sprint} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{sprint.sprint}</span>
                        <span className="text-sm font-medium">{Math.round(sprint.completed / sprint.planned * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${Math.round(sprint.completed / sprint.planned * 100)}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Team Time Logs */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Team Time Logs Summary</CardTitle>
              <CardDescription>
                Weekly overview of team time tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Total Hours</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Difference</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamTimeLogsByDay.map((day) => (
                      <TableRow key={day.day}>
                        <TableCell>{day.day}</TableCell>
                        <TableCell>{day.total}h</TableCell>
                        <TableCell>{day.target}h</TableCell>
                        <TableCell>
                          {day.overlogged > 0 ? 
                            <span className="text-green-600">+{day.overlogged}h</span> : 
                            <span className="text-red-600">-{day.underlogged}h</span>
                          }
                        </TableCell>
                        <TableCell>
                          {day.overlogged > 0 ? 
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Over-logged</Badge> : 
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Under-logged</Badge>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Estimation Accuracy Heatmap</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-6">
                    <div className="text-muted-foreground">
                      <BarChart3 className="h-16 w-16 mx-auto mb-2" />
                      <p>Estimation accuracy visualization will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Weekly Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Total Hours Logged</span>
                          <span className="font-medium">{teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0)}h</span>
                        </div>
                        <Progress value={teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0) / teamTimeLogsByDay.reduce((acc, day) => acc + day.target, 0) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Target Hours</span>
                          <span className="font-medium">{teamTimeLogsByDay.reduce((acc, day) => acc + day.target, 0)}h</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Difference</span>
                          <span className={`font-medium ${
                            teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0) > teamTimeLogsByDay.reduce((acc, day) => acc + day.target, 0) ? 
                            "text-green-600" : "text-red-600"
                          }`}>
                            {teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0) > teamTimeLogsByDay.reduce((acc, day) => acc + day.target, 0) ?
                            "+" : "-"}
                            {Math.abs(teamTimeLogsByDay.reduce((acc, day) => acc + day.total, 0) - teamTimeLogsByDay.reduce((acc, day) => acc + day.target, 0))}h
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          {/* QA Feedback Stats & Resource Distribution */}
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>QA Feedback Stats</CardTitle>
                <CardDescription>
                  QA return rates and fix turnaround times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Developer</TableHead>
                      <TableHead>Return Rate</TableHead>
                      <TableHead>Avg. Fix Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qaStats.map((dev) => (
                      <TableRow key={dev.id}>
                        <TableCell>{dev.name}</TableCell>
                        <TableCell>{dev.returnRate}%</TableCell>
                        <TableCell>{dev.avgFixTime}</TableCell>
                        <TableCell>
                          <Badge className={
                            dev.returnRate < 10 ? 
                            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                            dev.returnRate < 20 ? 
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : 
                            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }>
                            {dev.returnRate < 10 ? "Good" : dev.returnRate < 20 ? "Average" : "Needs Improvement"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resource Distribution</CardTitle>
                <CardDescription>
                  Developer capacity and allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {resourceDistribution.map((resource) => (
                    <div key={resource.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2 
                            {resource.status === 'Overallocated' ? 'bg-red-500' : 
                             resource.status === 'Full' ? 'bg-amber-500' : 
                             resource.status === 'Optimal' ? 'bg-green-500' : 'bg-blue-500'}"></div>
                          {resource.name}
                        </span>
                        <Badge className={
                          resource.status === "Overallocated" ? 
                          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : 
                          resource.status === "Full" ? 
                          "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" : 
                          resource.status === "Optimal" ? 
                          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : 
                          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }>
                          {resource.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{resource.projects} projects</span>
                        <span>{resource.allocation}% allocated</span>
                      </div>
                      <Progress 
                        value={resource.allocation} 
                        className={`h-2 ${
                          resource.allocation > 100 ? "bg-red-200" : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      );
    } else if (dashboardRole === "executive") {
      // Sample data for Executive dashboard
      const projectHealth = [
        { id: "1", name: "E-commerce Website", status: "on-track", progress: 85, budget: { total: 320, used: 260 } },
        { id: "2", name: "Mobile Banking App", status: "at-risk", progress: 62, budget: { total: 480, used: 350 } },
        { id: "3", name: "CRM Integration", status: "delayed", progress: 45, budget: { total: 240, used: 180 } },
        { id: "4", name: "Healthcare Platform", status: "on-track", progress: 78, budget: { total: 400, used: 290 } },
      ];
      
      const teamProductivity = [
        { week: "Week 1", avgHours: 35, output: 92 },
        { week: "Week 2", avgHours: 38, output: 95 },
        { week: "Week 3", avgHours: 37, output: 90 },
        { week: "Week 4", avgHours: 40, output: 98 },
      ];
      
      const teamOutput = [
        { team: "Frontend Team", output: 87, target: 90 },
        { team: "Backend Team", output: 92, target: 90 },
        { team: "Design Team", output: 78, target: 85 },
        { team: "QA Team", output: 95, target: 90 },
      ];
      
      const financialSummary = {
        totalLogged: 960,
        billable: 840,
        nonBillable: 120,
        utilization: 87.5,
        monthlySummary: [
          { month: "Jan", logged: 890, billable: 780 },
          { month: "Feb", logged: 920, billable: 810 },
          { month: "Mar", logged: 960, billable: 840 },
        ]
      };
      
      const getStatusColor = (status: string) => {
        switch(status) {
          case "on-track":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
          case "at-risk":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
          case "delayed":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
          default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        }
      };
      
      return (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Projects
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectHealth.length}</div>
                <p className="text-xs text-muted-foreground">
                  {projectHealth.filter(p => p.status === "on-track").length} on track, {projectHealth.filter(p => p.status !== "on-track").length} need attention
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Utilization
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{financialSummary.utilization}%</div>
                <div className="mt-2">
                  <Progress value={financialSummary.utilization} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {financialSummary.billable}h billable / {financialSummary.totalLogged}h total
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Hours/Dev</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamProductivity[teamProductivity.length - 1].avgHours}h</div>
                <p className="text-xs text-muted-foreground">
                  {teamProductivity[teamProductivity.length - 1].avgHours > teamProductivity[teamProductivity.length - 2].avgHours ? 
                    `+${(teamProductivity[teamProductivity.length - 1].avgHours - teamProductivity[teamProductivity.length - 2].avgHours).toFixed(1)}h` : 
                    `${(teamProductivity[teamProductivity.length - 1].avgHours - teamProductivity[teamProductivity.length - 2].avgHours).toFixed(1)}h`} from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Budget Utilization
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(projectHealth.reduce((acc, project) => acc + project.budget.used, 0) / 
                    projectHealth.reduce((acc, project) => acc + project.budget.total, 0) * 100)}%
                </div>
                <div className="mt-2">
                  <Progress 
                    value={projectHealth.reduce((acc, project) => acc + project.budget.used, 0) / 
                      projectHealth.reduce((acc, project) => acc + project.budget.total, 0) * 100} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {projectHealth.reduce((acc, project) => acc + project.budget.used, 0)}h of {projectHealth.reduce((acc, project) => acc + project.budget.total, 0)}h total budget
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Project Health Summary */}
          <Card className="mt-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Project Health Summary</CardTitle>
                  <CardDescription>
                    Status of active projects
                  </CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={getWorkspaceLink("/projects")}>
                    View All Projects
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Budget Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectHealth.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status === "on-track" ? "On Track" : 
                            project.status === "at-risk" ? "At Risk" : "Delayed"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="h-2 w-[100px]" />
                          <span className="text-xs">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={project.budget.used / project.budget.total * 100} 
                            className="h-2 w-[100px]" 
                          />
                          <span className="text-xs">{project.budget.used}h / {project.budget.total}h</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={getWorkspaceLink(`/projects/${project.id}`)}>
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Team Productivity Trends */}
          <div className="grid gap-4 md:grid-cols-7 mt-4">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Team Productivity Trends</CardTitle>
                <CardDescription>
                  Weekly average hours and output
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full items-center justify-center">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Productivity chart will be displayed here</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Team Output Performance</CardTitle>
                <CardDescription>
                  Output compared to targets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamOutput.map((team) => (
                    <div key={team.team} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{team.team}</span>
                        <span className="text-sm font-medium">
                          {team.output >= team.target ? 
                            <span className="text-green-600">{Math.round(team.output / team.target * 100)}%</span> :
                            <span className="text-amber-600">{Math.round(team.output / team.target * 100)}%</span>
                          }
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${team.output >= team.target ? 'bg-green-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(Math.round(team.output / team.target * 100), 100)}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Output score: {team.output}</span>
                        <span>Target: {team.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Financial Burn Summary */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Financial Burn Summary</CardTitle>
              <CardDescription>
                Billable vs. non-billable hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{financialSummary.totalLogged}h</div>
                      <div className="text-sm font-medium mt-1">Total Hours</div>
                      <div className="text-xs text-muted-foreground mt-1">All logged hours this month</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{financialSummary.billable}h</div>
                      <div className="text-sm font-medium mt-1">Billable Hours</div>
                      <div className="text-xs text-muted-foreground mt-1">{financialSummary.utilization}% utilization rate</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{financialSummary.nonBillable}h</div>
                      <div className="text-sm font-medium mt-1">Non-Billable Hours</div>
                      <div className="text-xs text-muted-foreground mt-1">{100 - financialSummary.utilization}% of total time</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-sm font-medium mt-6 mb-3">Monthly Trends</h3>
              <div className="space-y-4">
                {financialSummary.monthlySummary.map((month) => (
                  <div key={month.month} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{month.month}</span>
                      <span className="text-sm font-medium">{Math.round(month.billable / month.logged * 100)}% billable</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full" 
                        style={{ width: `${Math.round(month.billable / month.logged * 100)}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Total: {month.logged}h</span>
                      <span>Billable: {month.billable}h</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button asChild variant="outline">
                  <Link href={getWorkspaceLink("/reports/financial")}>
                    View Detailed Financial Report
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      );
    } else if (dashboardRole === "account-manager") {
      // ... existing account manager dashboard placeholder code ...
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Account Manager Dashboard</h3>
            <p className="text-muted-foreground mb-4">Coming soon</p>
            <Button variant="outline">Switch to Developer View</Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to {companyName} workspace. Here&apos;s an overview of your activity.
          </p>
        </div>
        <div>
          <Select value={dashboardRole} onValueChange={setDashboardRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select dashboard" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="manager">Manager/BA</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
              <SelectItem value="account-manager">Account Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {renderDashboard()}
    </div>
  );
} 