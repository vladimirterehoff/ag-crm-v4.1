'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AllocationData {
  employee: string;
  reservedHours: string;
  allocationRate: number;
  sprintAllocations: {
    [sprintName: string]: number | null; // Allocation percentage or null if N/A
  };
}

const mockAllocationData: AllocationData[] = [
  {
    employee: 'Ivan Bilenkyi',
    reservedHours: '0/8',
    allocationRate: 0,
    sprintAllocations: { 'Current': 0, 'Next': 10, 'Sprint +2': 25, 'Sprint +3': 50 },
  },
  {
    employee: 'Roman Chornyi',
    reservedHours: '40/80',
    allocationRate: 50,
    sprintAllocations: { 'Current': 50, 'Next': 50, 'Sprint +2': 60, 'Sprint +3': 40 },
  },
  {
    employee: 'Denys Diachenko',
    reservedHours: '64/72',
    allocationRate: 89,
    sprintAllocations: { 'Current': 90, 'Next': 85, 'Sprint +2': 80, 'Sprint +3': 90 },
  },
  {
    employee: 'Olga Dugina',
    reservedHours: '0/64',
    allocationRate: 0,
    sprintAllocations: { 'Current': 0, 'Next': 0, 'Sprint +2': 10, 'Sprint +3': 15 },
  },
  {
    employee: 'Anna Fedoryshyn',
    reservedHours: '0/80',
    allocationRate: 0,
    sprintAllocations: { 'Current': 0, 'Next': 5, 'Sprint +2': 20, 'Sprint +3': 30 },
  },
  {
    employee: 'Andrii Filipov',
    reservedHours: '72/72',
    allocationRate: 100,
    sprintAllocations: { 'Current': 100, 'Next': 100, 'Sprint +2': 90, 'Sprint +3': 80 },
  },
  {
    employee: 'Vyacheslav Fomenko',
    reservedHours: '80/80',
    allocationRate: 100,
    sprintAllocations: { 'Current': 100, 'Next': 100, 'Sprint +2': 100, 'Sprint +3': 95 },
  },
  {
    employee: 'Sergey Grinevich',
    reservedHours: '80/80',
    allocationRate: 100,
    sprintAllocations: { 'Current': 100, 'Next': 90, 'Sprint +2': 90, 'Sprint +3': 100 },
  },
  {
    employee: 'Vitalii Ischenko',
    reservedHours: '50/80',
    allocationRate: 63,
    sprintAllocations: { 'Current': 60, 'Next': 70, 'Sprint +2': 50, 'Sprint +3': 65 },
  },
  {
    employee: 'Ivan Khoptiar',
    reservedHours: '20/80',
    allocationRate: 25,
    sprintAllocations: { 'Current': 25, 'Next': 30, 'Sprint +2': 40, 'Sprint +3': 20 },
  },
  {
    employee: 'Oleksandr Kim',
    reservedHours: '72/72',
    allocationRate: 100,
    sprintAllocations: { 'Current': 100, 'Next': 100, 'Sprint +2': 85, 'Sprint +3': 90 },
  },
  {
    employee: 'Yevhen Knyzhnyk',
    reservedHours: '64/80',
    allocationRate: 80,
    sprintAllocations: { 'Current': 80, 'Next': 75, 'Sprint +2': 85, 'Sprint +3': 80 },
  },
];

const sprintPeriods = ['Current', 'Next', 'Sprint +2', 'Sprint +3']; // Up to ~3 months if sprints are 2 weeks

const getAllocationRateColor = (rate: number | null) => {
  if (rate === null) return 'bg-gray-200 text-gray-700';
  if (rate === 0) return 'bg-red-200 text-red-800';
  if (rate < 20) return 'bg-red-300 text-red-900';
  if (rate < 50) return 'bg-orange-300 text-orange-900';
  if (rate < 80) return 'bg-yellow-300 text-yellow-900';
  if (rate < 100) return 'bg-yellow-400 text-yellow-900';
  return 'bg-green-400 text-green-900';
};

export function TeamAllocationTab() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('2w'); // e.g., 2 weeks
  // Mock date range, in a real scenario this would be dynamic
  const dateRange = 'From 19 May - To 1 June';

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous period
        </Button>
        <div className="flex flex-col items-center">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1w">1 WEEK</SelectItem>
              <SelectItem value="2w">2 WEEKS</SelectItem>
              <SelectItem value="1m">1 MONTH</SelectItem>
              <SelectItem value="3m">3 MONTHS</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">{dateRange}</p>
        </div>
        <Button variant="outline">
          Next period
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]"># EMPLOYEE</TableHead>
            <TableHead className="w-[150px] text-center">RESERVED HOURS</TableHead>
            <TableHead className="w-[150px] text-center">ALLOCATION RATE</TableHead>
            {sprintPeriods.map((sprintName) => (
              <TableHead key={sprintName} className="w-[120px] text-center">
                {sprintName.toUpperCase()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAllocationData.map((data) => (
            <TableRow key={data.employee}>
              <TableCell className="font-medium">{data.employee}</TableCell>
              <TableCell className="text-center">{data.reservedHours}</TableCell>
              <TableCell className="text-center">
                <Badge
                  className={`w-full justify-center ${getAllocationRateColor(data.allocationRate)}`}
                >
                  {data.allocationRate}%
                </Badge>
              </TableCell>
              {sprintPeriods.map((sprintName) => (
                <TableCell key={sprintName} className="text-center">
                  {data.sprintAllocations[sprintName] !== null ? (
                    <Badge
                      className={`w-full justify-center ${getAllocationRateColor(data.sprintAllocations[sprintName])}`}
                    >
                      {data.sprintAllocations[sprintName]}%
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 