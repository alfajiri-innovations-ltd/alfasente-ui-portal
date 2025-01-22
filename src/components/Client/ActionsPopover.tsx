import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, UserCircle } from "lucide-react";
import { RenameList } from "./RenameListDialog";

import { DeleteList } from "./DeleteDialog";
import { IList } from "@/lib/interfaces/interfaces";

interface ActionProps {
  list?: IList;
  HandleClick?: () => void;
}
export function ActionsPopover({ list, HandleClick }: ActionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="w-4 h-4 relative" />
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] text-[15px] absolute right-1 space-y-2">
        <div
          className="flex items-center gap-1 cursor-pointer text-[#000000CC]"
          onClick={HandleClick}
        >
          <UserCircle className="h-4 w-4" />

          <span>View members</span>
        </div>
        <RenameList list={list} />
        <DeleteList />
      </PopoverContent>
    </Popover>
  );
}
