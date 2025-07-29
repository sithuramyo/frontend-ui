import * as React from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandGroup,
    CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // className merge helper
import { Skeleton } from "./skeleton";

type SearchableSelectProps<T> = {
    options: T[];
    value: string | null;
    onChange: (val: string | null) => void;
    placeholder?: string;
    idKey: keyof T;
    valueKey: keyof T;
    loading: boolean;
};

export function SearchableSelect<T>({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    idKey,
    valueKey,
    loading
}: SearchableSelectProps<T>) {
    const safeOptions = options ?? [];
    const [open, setOpen] = React.useState(false);

    const selectedLabel = safeOptions.find(
        (opt) => String(opt[idKey]) === value
    )?.[valueKey];

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-sm font-normal"
                    disabled={loading}
                >
                    {selectedLabel ? String(selectedLabel) : placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[--radix-popover-trigger-width] p-0 max-w-sm"
                align="start"
            >
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        className="h-9 text-sm placeholder:text-muted-foreground"
                    />
                    <CommandList>
                        {loading ? (
                            <div className="p-2 space-y-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-4 w-full rounded-sm" />
                                ))}
                            </div>
                        ) : (
                            <>
                                <CommandEmpty className="text-sm p-2">No results found.</CommandEmpty>
                                <CommandGroup>
                                    {safeOptions.map((opt) => {
                                        const optionId = String(opt[idKey]);
                                        const isSelected = value === optionId;

                                        return (
                                            <CommandItem
                                                key={optionId}
                                                onSelect={() => {
                                                    onChange(optionId);
                                                    setOpen(false);
                                                }}
                                                className={cn(
                                                    "text-sm cursor-pointer flex items-center",
                                                    isSelected && "bg-muted"
                                                )}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        isSelected ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {String(opt[valueKey])}
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
