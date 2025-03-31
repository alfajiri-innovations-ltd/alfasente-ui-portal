import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, UserCircle } from "lucide-react";
import { RenameList } from "./RenameListDialog";

import { DeleteList } from "./DeleteDialog";
import { IClient, IList, listsWithMembers } from "@/lib/interfaces/interfaces";
import { useLocation } from "react-router-dom";
import { ViewApplication } from "../Admin/ReviewApplication";
import { ViewTransactionDialog } from "./ViewTransaction";

interface ActionProps {
  list?: listsWithMembers;
  listId?:number;
  transactionID?:string;
 
  clientID?: number;
  HandleClick?: (listId:number) => void
}


export function ActionsPopover({ list, clientID, HandleClick ,transactionID}: ActionProps) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="w-4 h-4 relative" />
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] text-[15px] absolute right-1 space-y-2">
        {pathname === "/applications" && (
          <ViewApplication clientID={clientID} />)
        
  }  
         
          {pathname === "/beneficiaries" && (
            <>
              <div
              className="flex items-center gap-1 cursor-pointer text-[#000000CC]"
              onClick={() => {
                if (list?.id) {
                  HandleClick?.(list.id);
                }
              }}
            >
              <UserCircle className="h-4 w-4" />

              <span>View members</span>
            </div>
            <RenameList list={list} />
            <DeleteList /></>
          )}
         
      {pathname === "/transactions"   && (<ViewTransactionDialog transactionID={transactionID}/>)}
      </PopoverContent>
    </Popover>
  );
}
