import { MenuIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountPopover } from "./Account-Popover";
import { useUser } from "@/hooks/UserContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { signal } from "@preact/signals";
interface DashboardHeaderProps {
  PageTitle: string;
  triggerSidebar: (x: boolean) => void,
}

function DashboardHeader({ PageTitle, triggerSidebar }: DashboardHeaderProps) {
  const user = useUser();
  const isMobile = useIsMobile();
  const trigger = signal(false);
  return (
    <div className="w-full flex justify-between border-b border-[#DCE1EC] items-center px-4 py-3 ">
      {isMobile && <div className="flex flex-row items-center justify-between">
        <MenuIcon onClick={() => {
          trigger.value = true;
          triggerSidebar(trigger.value);
        }} />
        <span className="sm:text-2xl text-lg mx-4 font-bold">{PageTitle}</span>
      </div>}
      {!isMobile && (<span className="sm:text-2xl text-lg mx-1 font-bold">{PageTitle}</span>)}
      {/* search component */}
      {!isMobile && <div className="flex  bg-[#EDF0F7] items-center px-1 rounded-full  lg:px-3 lg:rounded-[10px]">
        <Search className=" w-3 h-3 lg:h-4 lg:w-4" />

        <Input
          type="search"
          placeholder="Search for anything here..."
          className="hidden lg:flex w-[20vw] border-none outtline-none focus:ring-0 focus-visible:ring-0 shadow-none bg-[#EDF0F7]"
        />
      </div>}
      {/* component */}
      <div className="flex items-center sm:gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {!isMobile && <div className="flex flex-col gap-1 text-sm">
          <span className="flex gap-1.5">
            {user?.firstName}

            <span>{user?.lastName}</span>
          </span>
          <span className="uppercase">{user?.role_name}</span>
        </div>}

        <AccountPopover />
      </div>
    </div>
  );
}

export default DashboardHeader;
