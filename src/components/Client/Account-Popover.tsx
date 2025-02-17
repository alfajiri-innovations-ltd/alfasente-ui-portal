import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/lib/cookies/UserMangementCookie";
import { ChevronDown, LogOut } from "lucide-react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export function AccountPopover() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();

    navigate("/");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className="w-40 -translate-x-6 translate-y-6">
        <div className="flex flex-col ">
          <div className="flex items-center gap-1">
            <span>
              <CiUser />
            </span>

            <span>Profile</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer " onClick={handleLogOut}>
            <span>
              <LogOut className="w-4 h-4 text-destructive" />
            </span>
            <span className="text-destructive">Log Out</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
