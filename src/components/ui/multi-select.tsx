import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";


interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
}: MultiSelectProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between text-left">
          <span
            className={selected.length === 0 ? "text-muted-foreground" : ""}
          >
            {selected.length > 0
              ? options
                .filter((o) => selected.includes(o.value))
                .map((o) => o.label)
                .join(", ")
              : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-2" sideOffset={4} asChild>
        <div className="min-w-[var(--radix-popover-trigger-width)] max-w-full">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 p-1 hover:bg-muted rounded-sm cursor-pointer"
              onClick={() => toggle(option.value)}
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggle(option.value)}
              />
              <span className="text-sm">{option.label}</span>
              {selected.includes(option.value) && (
                <Check className="w-4 h-4 text-primary ml-auto" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
