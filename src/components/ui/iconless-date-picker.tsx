import { format } from "date-fns";
import { useState } from "react"; // Import useState

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function IconlessDatePicker({ date, setDate, placeholder = "Pick a date", className, ...props }: DatePickerProps) {
  // Add a state variable to control the open/closed state of the popover
  const [open, setOpen] = useState(false);

  // A new handler function to update the date and then close the popover
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false); // Manually close the popover
  };

  return (
    // Pass the `open` state to the Popover
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal bg-white",
            !date && "text-muted-foreground",
            className
          )}
          {...props}
        >
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect} // Use the new handler here
          initialFocus
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}