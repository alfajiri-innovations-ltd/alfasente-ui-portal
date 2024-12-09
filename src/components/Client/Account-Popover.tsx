import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

export function AccountPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4"></div>
      </PopoverContent>
    </Popover>
  );
}
