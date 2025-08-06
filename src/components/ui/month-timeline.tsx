// src/components/ui/monthly-calendar.tsx
import { cn } from "@/lib/utils";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay } from "date-fns";

interface MonthlyCalendarProps {
  month: Date;
  selectedDate: Date;
  onDateClick: (date: Date) => void;
  // Make sure your type includes a count for take_home clicks
  treatmentRecord: { [date: string]: { status: string; reason?: string; count?: number; }; };
}

export function MonthlyCalendar({ month, selectedDate, onDateClick, treatmentRecord }: MonthlyCalendarProps) {
  const startDate = startOfMonth(month);
  const endDate = endOfMonth(month);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const straightThroughClass = "relative after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:h-[2px] after:bg-white after:-translate-y-1/2 after:rotate-45";

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm ">
      <h3 className="font-semibold text-lg text-center mb-4 text-blue-800">
        {format(month, 'MMMM yyyy')}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected = isSameDay(selectedDate, day);
          const dayString = format(day, 'yyyy-MM-dd');
          const record = treatmentRecord[dayString];
          const status = record?.status;
          const count = record?.count;

          let bgColor = "bg-white text-gray-700";
          let straightThrough = "";

          if (status === 'missed') {
            bgColor = "bg-red-500 text-white";
          } else if (status === 'treated') {
            bgColor = "bg-green-500 text-white";
          } else if (status === 'double_treated') {
            bgColor = "bg-green-500 text-white border-4 border-blue-700";
            straightThrough = straightThroughClass;
          } else if (status === 'take_home') {
            bgColor = "bg-pink-500 text-white";
            // This is the key condition: apply the line-through if count is > 1
            if (count && count > 1) {
              straightThrough = straightThroughClass;
            }
          } else if (isSameDay(new Date(), day)) {
            bgColor = "bg-[#ffff00] text-gray-800 font-semibold";
          }

          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className={cn(
                "w-full h-8 text-sm rounded flex items-center justify-center transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                bgColor,
                straightThrough,
                isSelected && "border-2 border-blue-500"
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}