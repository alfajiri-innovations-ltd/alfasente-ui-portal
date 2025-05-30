import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountPopover } from "./Account-Popover";
import { useUser } from "@/hooks/UserContext";

interface DashboardHeaderProps {
  PageTitle: string;
}

function DashboardHeader({ PageTitle }: DashboardHeaderProps) {
  const user = useUser();
  return (
    <div className="flex justify-between border-b border-[#DCE1EC] items-center px-4 py-3 ">
      <span className="text-2xl font-bold">{PageTitle}</span>

      <div className="flex  bg-[#EDF0F7] items-center px-1 rounded-full  lg:px-3 lg:rounded-[10px]">
        <Search className=" w-3 h-3 lg:h-4 lg:w-4" />

        <Input
          type="search"
          placeholder="Search for anything here..."
          className="hidden lg:flex w-[20vw] border-none outtline-none focus:ring-0 focus-visible:ring-0 shadow-none bg-[#EDF0F7]"
        />
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1 text-sm">
          <span className="flex gap-1.5">
            {user?.firstName}

            <span>{user?.lastName}</span>
          </span>
          <span className="uppercase">{user?.role_name}</span>
        </div>

        <AccountPopover />
      </div>
    </div>
  );
}

export default DashboardHeader;
