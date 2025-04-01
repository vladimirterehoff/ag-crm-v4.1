"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, isToday, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isFuture } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
  disableFutureDates?: boolean
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  disableFutureDates = false,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState(selected || new Date())
  const today = new Date()

  const handlePreviousMonth = () => {
    setMonth(prevMonth => subMonths(prevMonth, 1))
  }

  const handleNextMonth = () => {
    // When disableFutureDates is true, don't allow navigating to future months
    if (disableFutureDates) {
      const nextMonth = addMonths(month, 1)
      if (nextMonth.getMonth() > today.getMonth() && 
          nextMonth.getFullYear() >= today.getFullYear()) {
        return
      }
    }
    setMonth(prevMonth => addMonths(prevMonth, 1))
  }

  const handleSelectDate = (day: Date) => {
    // Don't allow selecting future dates when disableFutureDates is true
    if (disableFutureDates && isFuture(day)) {
      return
    }
    onSelect?.(day)
  }

  // Get days in month
  const daysInMonth = React.useMemo(() => {
    const start = startOfMonth(month)
    const end = endOfMonth(month)
    return eachDayOfInterval({ start, end })
  }, [month])

  // Get day names
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Get start of month day index (0-6)
  const firstDayOfMonth = startOfMonth(month).getDay()

  // Check if we're viewing the current month
  const isCurrentMonth = month.getMonth() === today.getMonth() && 
                         month.getFullYear() === today.getFullYear()

  // Disable next month button if we're in current month and disableFutureDates is true
  const disableNextMonth = disableFutureDates && isCurrentMonth

  return (
    <div className={cn("w-full p-3", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousMonth}
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">{format(month, "MMMM yyyy")}</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
          className="h-7 w-7"
          disabled={disableNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {dayNames.map((day) => (
          <div key={day} className="font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}
        {daysInMonth.map((day) => {
          const isCurrentMonth = isSameMonth(day, month)
          const isSelectedDay = selected ? isSameDay(day, selected) : false
          const isCurrentDay = isToday(day)
          const isFutureDay = isFuture(day)
          const isDisabled = disableFutureDates && isFutureDay
          
          return (
            <Button
              key={day.toISOString()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-full rounded-md p-0 font-normal",
                isSelectedDay && "bg-primary text-primary-foreground",
                !isSelectedDay && isCurrentDay && "border border-primary text-primary",
                !isCurrentMonth && "text-muted-foreground opacity-50",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleSelectDate(day)}
              disabled={isDisabled}
            >
              {format(day, "d")}
            </Button>
          )
        })}
      </div>
    </div>
  )
} 