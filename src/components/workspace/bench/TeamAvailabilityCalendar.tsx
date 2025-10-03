"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function TeamAvailabilityCalendar() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Team Availability Calendar</CardTitle>
        <CardDescription>
          View team member availability across time
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <div className="text-muted-foreground flex flex-col items-center">
          <Calendar className="h-12 w-12 mb-2" />
          <span>Availability calendar will be displayed here</span>
        </div>
      </CardContent>
    </Card>
  );
} 