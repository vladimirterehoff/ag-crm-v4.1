"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  Search,
  SlidersHorizontal,
  Briefcase,
  ArrowUpRight,
  CheckCircle2,
  PauseCircle,
  AlertCircle,
} from "lucide-react";

// Define a type for team members for better type safety
interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  availability: "available" | "partially" | "busy" | "unavailable" | string;
  workload: number;
  currentProject: string;
  nextAvailable: string;
  skills: string[];
  assignedTasks: number;
  completedTasks: number;
}

interface TeamAvailabilityTabProps {
  teamMembers: TeamMember[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  getAvailabilityColor: (availability: string) => string;
  getAvailabilityIcon: (availability: string) => React.ReactNode;
}

export function TeamAvailabilityTab({
  teamMembers,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  getAvailabilityColor,
  getAvailabilityIcon,
}: TeamAvailabilityTabProps) {
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || member.availability === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search team members..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="partially">Partially Available</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="unavailable">Unavailable</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Availability</CardTitle>
          <CardDescription>
            Current workload and availability of team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Current Project</TableHead>
                <TableHead>Next Available</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAvailabilityColor(member.availability)}>
                      <span className="flex items-center gap-1">
                        {getAvailabilityIcon(member.availability)}
                        {member.availability.charAt(0).toUpperCase() +
                          member.availability.slice(1)}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={member.workload} className="h-2 w-20" />
                      <span className="text-sm">
                        {member.workload}% ({member.completedTasks}/{
                          member.assignedTasks
                        }{ " " }
                        tasks)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      {member.currentProject}
                    </span>
                  </TableCell>
                  <TableCell>
                    {member.nextAvailable === "now" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Now
                      </Badge>
                    ) : (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                        {new Date(member.nextAvailable).toLocaleDateString()}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 2).map((skill, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 2 && (
                        <Badge variant="outline">+{member.skills.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 