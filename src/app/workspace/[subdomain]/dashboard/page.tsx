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
  ExternalLink,
  ClipboardCheck
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
  
  // Manager dashboard states
  const [selectedPM, setSelectedPM] = useState("1");
  const [managerView, setManagerView] = useState("team");
  
  // Time tracking data
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedTimeView, setSelectedTimeView] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSelectedDateToday, setIsSelectedDateToday] = useState(false);
  
  // Project allocations data - enhanced to have daily allocations
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  
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
        // Format like "Tuesday (Mar 24, 2025)"
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `${dayOfWeek} (${dateStr})`;
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
      // Sample data for Manager dashboard - Team view
      const projectManagers = [
        { id: "1", name: "Sarah Miller", team: "Team Alpha" },
        { id: "2", name: "Michael Chen", team: "Team Bravo" },
        { id: "3", name: "Emily Williams", team: "Team Charlie" },
        { id: "4", name: "David Johnson", team: "Team Delta" }
      ];
      
      // Team metrics data
      const teamCommittedCompleted = [
        { period: "Sprint 21", committed: 45, completed: 38 },
        { period: "Sprint 22", committed: 42, completed: 40 },
        { period: "Sprint 23", committed: 48, completed: 42 },
        { period: "Sprint 24", committed: 50, completed: 32 }
      ];
      
      const deliveryHealth = [
        { period: "Jan", score: 85 },
        { period: "Feb", score: 82 },
        { period: "Mar", score: 78 },
        { period: "Apr", score: 88 }
      ];
      
      const escalationRate = [
        { period: "Jan", count: 4 },
        { period: "Feb", count: 3 },
        { period: "Mar", count: 5 },
        { period: "Apr", count: 2 }
      ];
      
      const releaseFrequency = [
        { period: "Jan", count: 3 },
        { period: "Feb", count: 4 },
        { period: "Mar", count: 2 },
        { period: "Apr", count: 5 }
      ];
      
      const technicalMetrics = {
        bugRate: [
          { period: "Jan", value: 8 },
          { period: "Feb", value: 6 },
          { period: "Mar", value: 9 },
          { period: "Apr", value: 5 }
        ],
        testCoverage: [
          { period: "Jan", value: 72 },
          { period: "Feb", value: 75 },
          { period: "Mar", value: 78 },
          { period: "Apr", value: 80 }
        ],
        cicdMaturity: 3.5 // Score out of 5
      };
      
      const workloadBalance = [
        { role: "Alex Kim (Frontend)", assigned: 25 },
        { role: "Maria Garcia (Backend)", assigned: 30 },
        { role: "Jamal Brown (Mobile)", assigned: 15 },
        { role: "Sophie Patel (UI/UX)", assigned: 20 },
        { role: "Carlos Rodriguez (QA)", assigned: 10 }
      ];
      
      // PMO metrics data
      const resourceAvailability = [
        { role: "Frontend Developer (John Smith)", used: 85, capacity: 100 },
        { role: "Backend Developer (Linda Chen)", used: 95, capacity: 100 },
        { role: "UI/UX Designer (Robert Davis)", used: 60, capacity: 80 },
        { role: "QA Engineer (Patricia Lee)", used: 75, capacity: 100 },
        { role: "DevOps Engineer (James Wilson)", used: 50, capacity: 60 }
      ];
      
      const aggregatedCommittedCompleted = [
        { team: "Sarah Miller (Team Alpha)", committed: 120, completed: 105 },
        { team: "Michael Chen (Team Bravo)", committed: 95, completed: 90 },
        { team: "Emily Williams (Team Charlie)", committed: 80, completed: 65 },
        { team: "David Johnson (Team Delta)", committed: 70, completed: 68 }
      ];
      
      const aggregatedDeliveryHealth = [
        { period: "Jan", score: 82 },
        { period: "Feb", score: 79 },
        { period: "Mar", score: 83 },
        { period: "Apr", score: 85 }
      ];
      
      const aggregatedEscalationRate = [
        { period: "Jan", count: 12 },
        { period: "Feb", count: 9 },
        { period: "Mar", count: 14 },
        { period: "Apr", count: 8 }
      ];
      
      const teamTechnicalMetrics = [
        { team: "Team Alpha", bugRate: 5, testCoverage: 80, cicdMaturity: 4.0 },
        { team: "Team Bravo", bugRate: 7, testCoverage: 85, cicdMaturity: 3.5 },
        { team: "Team Charlie", bugRate: 9, testCoverage: 70, cicdMaturity: 3.0 },
        { team: "Team Delta", bugRate: 3, testCoverage: 90, cicdMaturity: 4.2 }
      ];
      
      const skillGapAnalysis = [
        { skill: "React Native", gapCount: 3, progress: 65 },
        { skill: "Microservices", gapCount: 5, progress: 40 },
        { skill: "Kubernetes", gapCount: 4, progress: 55 },
        { skill: "UI/UX Design", gapCount: 2, progress: 70 }
      ];
      
      const projectDocumentation = [
        { team: "Sarah Miller (Team Alpha)", status: "In Compliance", lastUpdated: "2023-04-10" },
        { team: "Michael Chen (Team Bravo)", status: "Needs Attention", lastUpdated: "2023-03-05" },
        { team: "Emily Williams (Team Charlie)", status: "In Compliance", lastUpdated: "2023-04-15" },
        { team: "David Johnson (Team Delta)", status: "In Compliance", lastUpdated: "2023-04-08" }
      ];
      
      const trainingSkillGap = [
        { team: "Sarah Miller (Team Alpha)", skill: "Cloud Architecture", progress: 80 },
        { team: "Michael Chen (Team Bravo)", skill: "Security Practices", progress: 55 },
        { team: "Emily Williams (Team Charlie)", skill: "React Performance", progress: 70 },
        { team: "David Johnson (Team Delta)", skill: "Automated Testing", progress: 90 }
      ];
      
      // Team view data
      const committedCompleted = [
        { sprint: "Sprint 22", committed: 45, completed: 40 },
        { sprint: "Sprint 23", committed: 42, completed: 38 },
        { sprint: "Sprint 24", committed: 50, completed: 47 }
      ];

      const teamWorkloadBalance = [
        { role: "Alex Kim (Frontend)", allocated: 85, capacity: 100 },
        { role: "Maria Garcia (Backend)", allocated: 90, capacity: 100 },
        { role: "Jamal Brown (Mobile)", allocated: 75, capacity: 100 },
        { role: "Sophie Patel (UI/UX)", allocated: 60, capacity: 80 },
        { role: "Carlos Rodriguez (QA)", allocated: 95, capacity: 100 }
      ];
      
      const roleDistribution = [
        { role: "Frontend Developer", assigned: 25 },
        { role: "Backend Developer", assigned: 30 },
        { role: "UI/UX Designer", assigned: 15 },
        { role: "QA Engineer", assigned: 20 },
        { role: "DevOps Engineer", assigned: 10 }
      ];
      
      return (
        <div className="space-y-4">
          <Tabs defaultValue="team" className="w-full" onValueChange={setManagerView}>
            <div className="flex justify-between items-center mb-4">
              <TabsList className="w-[280px] bg-muted p-0.5">
                <TabsTrigger 
                  value="team" 
                  className="flex-1 data-[state=active]:bg-background rounded-sm"
                >
                  Team Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="pmo" 
                  className="flex-1 data-[state=active]:bg-background rounded-sm"
                >
                  PMO Dashboard
                </TabsTrigger>
              </TabsList>
              
              {managerView === "team" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Project Manager:</span>
                  <Select value={selectedPM} onValueChange={setSelectedPM}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a PM" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectManagers.map((pm) => (
                        <SelectItem key={pm.id} value={pm.id}>
                          {pm.name} ({pm.team})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <TabsContent value="team" className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">
                {selectedPM ? 
                  `${projectManagers.find(pm => pm.id === selectedPM)?.name}'s Dashboard (${projectManagers.find(pm => pm.id === selectedPM)?.team})` : 
                  "Select a Project Manager"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Committed vs. Completed</CardTitle>
                    <CardDescription>Tasks committed vs. completed by sprint</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="space-y-6">
                      {teamCommittedCompleted.map((sprint) => (
                        <div key={sprint.period} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{sprint.period}</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round((sprint.completed / sprint.committed) * 100)}% completed
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Committed: {sprint.committed}</span>
                              <span>Completed: {sprint.completed}</span>
                            </div>
                            <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="absolute top-0 left-0 h-full bg-primary" 
                                style={{ width: `${Math.min(Math.round((sprint.completed / sprint.committed) * 100), 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </CardContent>
            </Card>
                
            <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Delivery Health Trend</CardTitle>
                    <CardDescription>Overall team delivery health score</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="flex items-center h-full">
                      <div className="w-full">
                        <div className="flex justify-between mb-6">
                          <div>
                            <div className="text-3xl font-bold">{deliveryHealth[deliveryHealth.length - 1].score}/100</div>
                            <div className="text-sm text-muted-foreground">Current health score</div>
                </div>
                          <Badge 
                            className={deliveryHealth[deliveryHealth.length - 1].score > deliveryHealth[deliveryHealth.length - 2].score 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            }
                          >
                            {deliveryHealth[deliveryHealth.length - 1].score > deliveryHealth[deliveryHealth.length - 2].score 
                              ? "Improving" 
                              : "Declining"
                            }
                          </Badge>
                        </div>
                        <div className="space-y-4">
                          {deliveryHealth.map((period, index) => (
                            <div key={period.period} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>{period.period}</span>
                                <span className={
                                  period.score >= 90 ? "text-green-600" :
                                  period.score >= 75 ? "text-amber-600" :
                                  "text-red-600"
                                }>
                                  {period.score}
                                </span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={
                                    period.score >= 90 ? "bg-green-500" :
                                    period.score >= 75 ? "bg-amber-500" :
                                    "bg-red-500"
                                  } 
                                  style={{ width: `${Math.min(period.score, 100)}%`, height: '100%' }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                </div>
              </CardContent>
            </Card>
          
                <Card>
              <CardHeader>
                    <CardTitle className="text-base">Escalation Rate</CardTitle>
                    <CardDescription>Number of client escalations over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="flex items-center h-full">
                      <div className="w-full">
                        <div className="flex justify-between mb-6">
                  <div>
                            <div className="text-3xl font-bold">{escalationRate[escalationRate.length - 1].count}</div>
                            <div className="text-sm text-muted-foreground">Current month escalations</div>
                  </div>
                          <Badge 
                            className={escalationRate[escalationRate.length - 1].count < escalationRate[escalationRate.length - 2].count 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }
                          >
                            {escalationRate[escalationRate.length - 1].count < escalationRate[escalationRate.length - 2].count 
                              ? `↓ ${escalationRate[escalationRate.length - 2].count - escalationRate[escalationRate.length - 1].count}` 
                              : `↑ ${escalationRate[escalationRate.length - 1].count - escalationRate[escalationRate.length - 2].count}`
                            }
                          </Badge>
                </div>
                        
                        <div className="relative h-[120px] mt-6">
                          <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
                            {/* Draw the line */}
                            <polyline
                              points={escalationRate.map((data, i) => 
                                `${(i / (escalationRate.length - 1)) * 400},${120 - (data.count / Math.max(...escalationRate.map(e => e.count))) * 100}`
                              ).join(' ')}
                              fill="none"
                              stroke={escalationRate[0].count > escalationRate[escalationRate.length - 1].count ? "#22c55e" : "#ef4444"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            
                            {/* Add dots for each data point */}
                            {escalationRate.map((data, i) => (
                              <circle
                                key={i}
                                cx={(i / (escalationRate.length - 1)) * 400}
                                cy={120 - (data.count / Math.max(...escalationRate.map(e => e.count))) * 100}
                                r="4"
                                fill={escalationRate[0].count > escalationRate[escalationRate.length - 1].count ? "#22c55e" : "#ef4444"}
                              />
                            ))}
                          </svg>
                </div>
                
                        {/* Month labels */}
                        <div className="flex justify-between mt-2">
                          {escalationRate.map((data, i) => (
                            <div key={i} className="text-center">
                              <span className="text-xs text-muted-foreground">{data.period}</span>
                        </div>
                          ))}
                      </div>
                    </div>
                </div>
              </CardContent>
            </Card>
            
                <Card>
              <CardHeader>
                    <CardTitle className="text-base">Release Frequency</CardTitle>
                    <CardDescription>Number of releases over time</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="flex items-center h-full">
                      <div className="w-full">
                        <div className="flex justify-between mb-6">
                          <div>
                            <div className="text-3xl font-bold">{releaseFrequency[releaseFrequency.length - 1].count}</div>
                            <div className="text-sm text-muted-foreground">Current month releases</div>
                  </div>
                          <Badge 
                            className={releaseFrequency[releaseFrequency.length - 1].count > releaseFrequency[releaseFrequency.length - 2].count 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            }
                          >
                            {releaseFrequency[releaseFrequency.length - 1].count > releaseFrequency[releaseFrequency.length - 2].count
                              ? `↑ ${releaseFrequency[releaseFrequency.length - 1].count - releaseFrequency[releaseFrequency.length - 2].count}` 
                              : `↓ ${releaseFrequency[releaseFrequency.length - 2].count - releaseFrequency[releaseFrequency.length - 1].count}`
                            }
                          </Badge>
                </div>
                
                        <div className="relative h-[120px] mt-6">
                          <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
                            {/* Draw the line */}
                            <polyline
                              points={releaseFrequency.map((data, i) => 
                                `${(i / (releaseFrequency.length - 1)) * 400},${120 - (data.count / Math.max(...releaseFrequency.map(e => e.count))) * 100}`
                              ).join(' ')}
                              fill="none"
                              stroke="#0ea5e9"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            
                            {/* Add dots for each data point */}
                            {releaseFrequency.map((data, i) => (
                              <circle
                                key={i}
                                cx={(i / (releaseFrequency.length - 1)) * 400}
                                cy={120 - (data.count / Math.max(...releaseFrequency.map(e => e.count))) * 100}
                                r="4"
                                fill="#0ea5e9"
                              />
                            ))}
                          </svg>
                  </div>
                        
                        {/* Month labels */}
                        <div className="flex justify-between mt-2">
                          {releaseFrequency.map((data, i) => (
                            <div key={i} className="text-center">
                              <span className="text-xs text-muted-foreground">{data.period}</span>
                  </div>
                          ))}
                </div>
                  </div>
                  </div>
                  </CardContent>
                </Card>
                </div>
                
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Technical Metrics</CardTitle>
                    <CardDescription>Bug rate, test coverage, and CI/CD maturity</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="grid grid-cols-3 gap-4 h-full">
                <div className="space-y-2">
                        <h4 className="text-sm font-medium text-center">Bug Rate</h4>
                        <div className="relative pt-5">
                          <div className="text-center">
                            <span className="text-3xl font-bold">{technicalMetrics.bugRate[technicalMetrics.bugRate.length - 1].value}</span>
                            <span className="text-sm text-muted-foreground ml-1">bugs/sprint</span>
                      </div>
                          <div className="mt-4 space-y-2">
                            {technicalMetrics.bugRate.map((period) => (
                              <div key={period.period} className="flex items-center gap-2">
                                <span className="text-xs w-8">{period.period}</span>
                                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="bg-red-500 h-full" 
                                    style={{ width: `${(period.value / 10) * 100}%` }} 
                        />
                      </div>
                                <span className="text-xs">{period.value}</span>
                    </div>
                  ))}
                </div>
          </div>
              </div>
              
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-center">Test Coverage</h4>
                        <div className="relative flex flex-col items-center justify-center h-[180px]">
                          <div className="relative w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center">
                            <div 
                              className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500"
                              style={{ 
                                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI * technicalMetrics.testCoverage[technicalMetrics.testCoverage.length - 1].value / 100)}% ${50 - 50 * Math.sin(2 * Math.PI * technicalMetrics.testCoverage[technicalMetrics.testCoverage.length - 1].value / 100)}%, ${technicalMetrics.testCoverage[technicalMetrics.testCoverage.length - 1].value >= 50 ? '100% 0%, 100% 100%, 0% 100%, 0% 0%' : ''})` 
                              }}
                            />
                            <div className="text-center">
                              <div className="text-2xl font-bold">{technicalMetrics.testCoverage[technicalMetrics.testCoverage.length - 1].value}%</div>
                              <div className="text-xs text-muted-foreground">covered</div>
                    </div>
                        </div>
                          <div className="mt-3 text-sm text-green-600">
                            ↑ {technicalMetrics.testCoverage[technicalMetrics.testCoverage.length - 1].value - technicalMetrics.testCoverage[0].value}% since Jan
                      </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-center">CI/CD Maturity</h4>
                        <div className="flex flex-col items-center justify-center h-[180px]">
                          <div className="w-full space-y-2">
                            <div className="text-center mb-4">
                              <div className="text-3xl font-bold">{technicalMetrics.cicdMaturity}</div>
                              <div className="text-sm text-muted-foreground">out of 5</div>
                        </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className="bg-blue-500 h-full" 
                                style={{ width: `${(technicalMetrics.cicdMaturity / 5) * 100}%` }} 
                              />
                      </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Basic</span>
                              <span>Advanced</span>
                    </div>
                            <div className="mt-4">
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                {technicalMetrics.cicdMaturity >= 4.5 ? "Expert" : 
                                 technicalMetrics.cicdMaturity >= 3.5 ? "Advanced" : 
                                 technicalMetrics.cicdMaturity >= 2.5 ? "Intermediate" : "Basic"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
              </div>
            </CardContent>
          </Card>
          
            <Card>
              <CardHeader>
                    <CardTitle className="text-base">Workload Balance</CardTitle>
                    <CardDescription>Task distribution by role</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="space-y-6">
                      {teamWorkloadBalance.map((role) => (
                        <div key={role.role} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium truncate max-w-[65%]">{role.role}</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round((role.allocated / role.capacity) * 100)}% allocated
                            </span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Allocated: {role.allocated}h</span>
                              <span>Capacity: {role.capacity}h</span>
                            </div>
                            <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`absolute top-0 left-0 h-full ${role.allocated > role.capacity * 0.9 ? 'bg-red-500' : 'bg-primary'}`}
                                style={{ width: `${Math.min((role.allocated / role.capacity) * 100, 100)}%` }} 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
              </CardContent>
            </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="pmo" className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">PMO Dashboard</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                    <CardTitle className="text-base">Resource Availability</CardTitle>
                    <CardDescription>Utilization vs. capacity by role</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="space-y-6">
                      {resourceAvailability.map((resource) => (
                        <div key={resource.role} className="space-y-1 pr-1">
                      <div className="flex justify-between items-center">
                            <span className="text-sm font-medium truncate max-w-[65%]">{resource.role}</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round((resource.used / resource.capacity) * 100)}% utilized
                        </span>
                      </div>
                          <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                (resource.used / resource.capacity) > 0.9 ? "bg-red-500" :
                                (resource.used / resource.capacity) > 0.75 ? "bg-amber-500" :
                                "bg-green-500"
                              }`}
                              style={{ width: `${(resource.used / resource.capacity) * 100}%` }} 
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Used: {resource.used}h</span>
                            <span>Capacity: {resource.capacity}h</span>
                          </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
                
            <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Aggregated Committed vs. Completed</CardTitle>
                    <CardDescription>Tasks completion across all teams</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="space-y-6">
                      {aggregatedCommittedCompleted.map((team) => (
                        <div key={team.team} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium truncate max-w-[65%]">{team.team}</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.round((team.completed / team.committed) * 100)}% completed
                            </span>
                </div>
                          <div className="relative h-6 w-full bg-muted rounded-md overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary flex items-center" 
                              style={{ width: `${Math.min(Math.round((team.completed / team.committed) * 100), 100)}%` }}>
                              <span className="text-xs text-white ml-2">
                                {team.completed}/{team.committed}
                              </span>
                </div>
                          </div>
                        </div>
                      ))}
                </div>
              </CardContent>
            </Card>
          
                <Card>
            <CardHeader>
                    <CardTitle className="text-base">Aggregated Delivery Health</CardTitle>
                    <CardDescription>Overall organization delivery health</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="flex items-center h-full">
                      <div className="w-full">
                        <div className="flex justify-between mb-6">
                <div>
                            <div className="text-3xl font-bold">{aggregatedDeliveryHealth[aggregatedDeliveryHealth.length - 1].score}/100</div>
                            <div className="text-sm text-muted-foreground">Organization health score</div>
                </div>
                          <Badge 
                            className={aggregatedDeliveryHealth[aggregatedDeliveryHealth.length - 1].score > aggregatedDeliveryHealth[aggregatedDeliveryHealth.length - 2].score 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            }
                          >
                            {aggregatedDeliveryHealth[aggregatedDeliveryHealth.length - 1].score > aggregatedDeliveryHealth[aggregatedDeliveryHealth.length - 2].score 
                              ? "Improving" 
                              : "Declining"
                            }
                        </Badge>
                        </div>
                        <div className="space-y-4">
                          {aggregatedDeliveryHealth.map((period, index) => (
                            <div key={period.period} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>{period.period}</span>
                                <span className={
                                  period.score >= 90 ? "text-green-600" :
                                  period.score >= 75 ? "text-amber-600" :
                                  "text-red-600"
                                }>
                                  {period.score}
                                </span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={
                                    period.score >= 90 ? "bg-green-500" :
                                    period.score >= 75 ? "bg-amber-500" :
                                    "bg-red-500"
                                  } 
                                  style={{ width: `${Math.min(period.score, 100)}%`, height: '100%' }} 
                                />
                        </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
            </CardContent>
          </Card>
          
                <Card>
              <CardHeader>
                    <CardTitle className="text-base">Aggregated Escalation Rate</CardTitle>
                    <CardDescription>Organization-wide client escalations</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="flex items-center h-full">
                      <div className="w-full">
                        <div className="flex justify-between mb-6">
                          <div>
                            <div className="text-3xl font-bold">{aggregatedEscalationRate[aggregatedEscalationRate.length - 1].count}</div>
                            <div className="text-sm text-muted-foreground">Current month escalations</div>
                          </div>
                          <Badge 
                            className={aggregatedEscalationRate[aggregatedEscalationRate.length - 1].count < aggregatedEscalationRate[aggregatedEscalationRate.length - 2].count 
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }
                          >
                            {aggregatedEscalationRate[aggregatedEscalationRate.length - 1].count < aggregatedEscalationRate[aggregatedEscalationRate.length - 2].count 
                              ? `↓ ${aggregatedEscalationRate[aggregatedEscalationRate.length - 2].count - aggregatedEscalationRate[aggregatedEscalationRate.length - 1].count}` 
                              : `↑ ${aggregatedEscalationRate[aggregatedEscalationRate.length - 1].count - aggregatedEscalationRate[aggregatedEscalationRate.length - 2].count}`
                            }
                          </Badge>
                        </div>
                        
                        <div className="relative h-[120px] mt-6">
                          <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
                            {/* Draw the line */}
                            <polyline
                              points={aggregatedEscalationRate.map((data, i) => 
                                `${(i / (aggregatedEscalationRate.length - 1)) * 400},${120 - (data.count / Math.max(...aggregatedEscalationRate.map(e => e.count))) * 100}`
                              ).join(' ')}
                              fill="none"
                              stroke={aggregatedEscalationRate[0].count > aggregatedEscalationRate[aggregatedEscalationRate.length - 1].count ? "#22c55e" : "#ef4444"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            
                            {/* Add dots for each data point */}
                            {aggregatedEscalationRate.map((data, i) => (
                              <circle
                                key={i}
                                cx={(i / (aggregatedEscalationRate.length - 1)) * 400}
                                cy={120 - (data.count / Math.max(...aggregatedEscalationRate.map(e => e.count))) * 100}
                                r="4"
                                fill={aggregatedEscalationRate[0].count > aggregatedEscalationRate[aggregatedEscalationRate.length - 1].count ? "#22c55e" : "#ef4444"}
                              />
                            ))}
                          </svg>
                        </div>
                        
                        {/* Month labels */}
                        <div className="flex justify-between mt-2">
                          {aggregatedEscalationRate.map((data, i) => (
                            <div key={i} className="text-center">
                              <span className="text-xs text-muted-foreground">{data.period}</span>
                            </div>
                          ))}
                        </div>
                  </div>
                </div>
              </CardContent>
            </Card>
              </div>
            
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
              <CardHeader>
                    <CardTitle className="text-base">Aggregated Technical Metrics</CardTitle>
                    <CardDescription>Bug rate, test coverage by team</CardDescription>
              </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                <div className="space-y-4">
                      <div className="border-b pb-3">
                        <h4 className="text-sm font-medium mb-2">Bug Rate (bugs/sprint)</h4>
                        {teamTechnicalMetrics.map((team) => (
                          <div key={`${team.team}-bug`} className="flex items-center space-x-2 mb-2">
                            <div className="w-20 text-xs truncate">{team.team}</div>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  team.bugRate > 8 ? "bg-red-500" :
                                  team.bugRate > 5 ? "bg-amber-500" :
                                  "bg-green-500"
                                }`}
                                style={{ width: `${(team.bugRate / 10) * 100}%` }} 
                        />
                      </div>
                            <div className="w-8 text-xs text-right">{team.bugRate}</div>
                      </div>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Test Coverage (%)</h4>
                        {teamTechnicalMetrics.map((team) => (
                          <div key={`${team.team}-coverage`} className="flex items-center space-x-2 mb-2">
                            <div className="w-20 text-xs truncate">{team.team}</div>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  team.testCoverage > 80 ? "bg-green-500" :
                                  team.testCoverage > 70 ? "bg-amber-500" :
                                  "bg-red-500"
                                }`}
                                style={{ width: `${Math.min(team.testCoverage, 100)}%` }} 
                              />
                            </div>
                            <div className="w-8 text-xs text-right">{team.testCoverage}%</div>
                    </div>
                  ))}
                      </div>
                </div>
              </CardContent>
            </Card>
          
                <Card>
            <CardHeader>
                    <CardTitle className="text-base">Training & Skill Gap Analysis</CardTitle>
                    <CardDescription>Progress in closing skill gaps</CardDescription>
            </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="space-y-5">
                      {skillGapAnalysis.map((skill) => (
                        <div key={skill.skill} className="space-y-1">
                          <div className="flex justify-between items-center flex-wrap">
                            <div className="max-w-[70%]">
                              <span className="text-sm font-medium mr-1 truncate inline-block">{skill.skill}</span>
                              <Badge variant="outline" className="ml-0 mt-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                {skill.gapCount} gaps
                              </Badge>
                    </div>
                            <span className="text-sm">{skill.progress}% filled</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="bg-blue-500 h-full"
                              style={{ width: `${Math.min(skill.progress, 100)}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Project Documentation & Governance</CardTitle>
                    <CardDescription>Compliance status by team</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] p-4 overflow-hidden">
                    <div className="space-y-3">
                      {projectDocumentation.map((team) => (
                        <div key={team.team} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex-1 mr-2">
                            <div className="text-sm font-medium truncate">{team.team}</div>
                            <div className="text-xs text-muted-foreground">Last updated: {new Date(team.lastUpdated).toLocaleDateString()}</div>
                    </div>
                          <Badge 
                            className={
                              team.status === "In Compliance" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            }
                          >
                            {team.status}
                          </Badge>
              </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-3 border-t">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Overall Compliance</span>
                        <Badge 
                          className={
                            (projectDocumentation.filter(t => t.status === "In Compliance").length / projectDocumentation.length) >= 0.75
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }
                        >
                          {projectDocumentation.filter(t => t.status === "In Compliance").length}/{projectDocumentation.length} Teams
                        </Badge>
                    </div>
                      <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={
                            (projectDocumentation.filter(t => t.status === "In Compliance").length / projectDocumentation.length) >= 0.75
                              ? "bg-green-500"
                              : "bg-amber-500"
                          }
                          style={{ width: `${(projectDocumentation.filter(t => t.status === "In Compliance").length / projectDocumentation.length) * 100}%`, height: '100%' }} 
                      />
                    </div>
                    </div>
                  </CardContent>
                </Card>
                  </div>
            </TabsContent>
          </Tabs>
              </div>
      );
    } else if (dashboardRole === "executive") {
      // Executive dashboard placeholder with "Coming soon" message
      return (
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Executive Dashboard</h3>
            <p className="text-muted-foreground mb-4">Coming soon</p>
            <Button variant="outline" onClick={() => setDashboardRole("developer")}>Switch to Developer View</Button>
              </div>
        </div>
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