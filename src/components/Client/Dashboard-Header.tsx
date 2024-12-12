import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountPopover } from "./Account-Popover";

interface DashboardHeaderProps {
  PageTitle: string;
}

function DashboardHeader({ PageTitle }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center px-4 py-3 shadow-sm">
      <span className="text-2xl font-bold">{PageTitle}</span>

      <div className="flex  bg-[#EDF0F7] items-center px-1 rounded-full  lg:px-3 lg:rounded-[10px]">
        <Search className=" w-3 h-3 lg:h-4 lg:w-4" />

        <Input
          type="search"
          placeholder="Search for anything here..."
          className="hidden lg:flex w-[20vw] border-none outtline-none focus:ring-0 focus-visible:ring-0 shadow-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col text-sm">
          <span>George Kizza</span>
          <span>Administrator</span>
        </div>

        <AccountPopover />
      </div>
    </div>
  );
}

export default DashboardHeader;
