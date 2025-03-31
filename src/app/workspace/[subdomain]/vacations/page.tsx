"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  CalendarCheck,
  Check,
  Clock,
  Plus,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import { toast } from "sonner";

interface VacationsPageProps {
  params: {
    subdomain: string;
  };
}

export default function VacationsPage({ params }: VacationsPageProps) {
  const { subdomain } = use(params);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  
  // Sample vacation data - in real implementation this would come from API
  const vacations = [
    {
      id: "1",
      employee: "John Doe",
      type: "Annual Leave",
      startDate: "2023-06-15",
      endDate: "2023-06-22",
      days: 6,
      status: "Approved",
    },
    {
      id: "2",
      employee: "Sarah Miller",
      type: "Sick Leave",
      startDate: "2023-05-05",
      endDate: "2023-05-08",
      days: 2,
      status: "Approved",
    },
    {
      id: "3",
      employee: "David Johnson",
      type: "Annual Leave",
      startDate: "2023-07-10",
      endDate: "2023-07-21",
      days: 10,
      status: "Pending",
    },
    {
      id: "4",
      employee: "Emily Williams",
      type: "Work From Home",
      startDate: "2023-05-25",
      endDate: "2023-05-25",
      days: 1,
      status: "Approved",
    },
    {
      id: "5",
      employee: "Michael Brown",
      type: "Annual Leave",
      startDate: "2023-08-01",
      endDate: "2023-08-10",
      days: 8,
      status: "Pending",
    },
  ];

  // Sample vacation types
  const vacationTypes = [
    { id: "annual", name: "Annual Leave" },
    { id: "sick", name: "Sick Leave" },
    { id: "wfh", name: "Work From Home" },
    { id: "personal", name: "Personal Leave" },
    { id: "unpaid", name: "Unpaid Leave" },
  ];

  const handleRequestVacation = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vacation request submitted successfully!");
    setIsRequestOpen(false);
    
    // In a real implementation, this would submit the vacation request
    // to the API and update the UI
  };

  const handleApproveVacation = (id: string) => {
    toast.success("Vacation approved successfully!");
    
    // In a real implementation, this would update the vacation status
    // in the API and update the UI
  };

  const handleRejectVacation = (id: string) => {
    toast.error("Vacation request rejected");
    
    // In a real implementation, this would update the vacation status
    // in the API and update the UI
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vacations</h2>
          <p className="text-muted-foreground">
            Manage and request time off.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Request Time Off
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request Time Off</DialogTitle>
                <DialogDescription>
                  Fill in the details below to request time off.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRequestVacation}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type of Leave</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type of leave" />
                      </SelectTrigger>
                      <SelectContent>
                        {vacationTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <div className="flex">
                        <Input
                          id="startDate"
                          type="date"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <div className="flex">
                        <Input
                          id="endDate"
                          type="date"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason (Optional)</Label>
                    <textarea
                      id="reason"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Provide a reason for your absence"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Vacation Days Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Annual leave remaining this year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Sick Days Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              Sick leave remaining this year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Time Off
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Next: June 15 - June 22
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Calendar</CardTitle>
          <CardDescription>
            View upcoming time off for your team.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Calendar will be displayed here</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Off Requests</CardTitle>
          <CardDescription>
            View and manage all time off requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vacations.map((vacation) => (
              <div
                key={vacation.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">{vacation.employee}</h3>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        vacation.status === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : vacation.status === "Pending"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {vacation.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {vacation.type} • {vacation.days} {vacation.days === 1 ? 'day' : 'days'}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(vacation.startDate).toLocaleDateString()} - {new Date(vacation.endDate).toLocaleDateString()}
                  </div>
                </div>
                
                {vacation.status === "Pending" && (
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-green-600"
                      onClick={() => handleApproveVacation(vacation.id)}
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 text-red-600"
                      onClick={() => handleRejectVacation(vacation.id)}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 