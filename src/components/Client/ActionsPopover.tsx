import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  MoreHorizontal, UserCircle } from "lucide-react";
import { RenameList } from "./RenameListDialog";

import { DeleteList } from "./DeleteDialog";
import { listsWithMembers } from "@/lib/interfaces/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { ViewApplication } from "../Admin/ReviewApplication";
import { ViewTransactionDialog } from "./ViewTransaction";
import { ViewRequest } from "../Admin/Review-Request";
import { InitiateTopUp } from "../Admin/InitiateTopUp";

interface ActionProps {
  list?: listsWithMembers;
  listId?: number;
  transactionID?: string;

  clientID?: number;
  HandleClick?: (listId: number) => void;
}

export function ActionsPopover({
  list,
  clientID,
  transactionID,
}: ActionProps) {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();
  return (
    <Popover>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <MoreHorizontal className="w-4 h-4 relative" />
      </PopoverTrigger>
      <PopoverContent className="w-[15vw] text-[15px] absolute right-1 space-y-2">
        {pathname === "/applications" && (
          <ViewApplication clientID={clientID} />
        )}

        {pathname === "/beneficiaries" && (
          <>
            <div
              className="flex items-center gap-1 cursor-pointer text-[#000000CC]"
              onClick={() => {
                if (list?.id) {
                  navigate(`/view-members/${list.id}`);
                }
              }}
            >
              <UserCircle className="h-4 w-4" />

              <span>View members</span>
            </div>
            <RenameList list={list} />
            <DeleteList />
          </>
        )}

        {pathname === "/transactions" && (
          <ViewTransactionDialog transactionID={transactionID} />
        )}

        {pathname === "/admin/manuals" && (
          <>
            {" "}
            <ViewRequest transactionID={transactionID} />
            <InitiateTopUp transactionID={transactionID} triggerMode />
            
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
