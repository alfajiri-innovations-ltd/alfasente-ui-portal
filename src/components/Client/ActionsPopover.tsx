import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, RotateCcw, UserCircle } from "lucide-react";
import { RenameList } from "./RenameListDialog";

import { DeleteList } from "./DeleteDialog";
import { listsWithMembers } from "@/lib/interfaces/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { ViewApplication } from "../Admin/ReviewApplication";
import { ViewTransactionDialog } from "./ViewTransaction";

import { FaMoneyBillTransfer } from "react-icons/fa6";
import { getUserToken } from "@/lib/cookies/UserMangementCookie";
import { toast } from "@/hooks/use-toast";
import { retryTransaction } from "@/lib/services/RetryTransaction";
import { useState } from "react";

interface ActionProps {
  list?: listsWithMembers;
  listId?: number;
  transactionID?: string;
  id?: number;
  activeState?: string;
  bulkStatus?: string;
  failedCount?: number;
  status?: string;
  failedTransactionIds?: string[];

  clientID?: number;
  HandleClick?: (listId: number) => void;
}

export function ActionsPopover({
  list,
  clientID,
  transactionID,
  activeState,
  bulkStatus,
  status,
  failedCount,
  failedTransactionIds,
  id,
}: ActionProps) {
  const location = useLocation();
  const { pathname } = location;

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const token = getUserToken() ?? "";

  const handleRetry = async () => {
    setSubmitting(true);
    try {
      toast({
        title: "Retrying...",
        description: "Please wait.",
        variant: "default",
      });

      if (
        activeState === "bulk" &&
        id &&
        failedTransactionIds &&
        failedTransactionIds.length > 0
      ) {
        await retryTransaction(token, { transactionIDs: failedTransactionIds });
      } else if (transactionID) {
        await retryTransaction(token, { transactionID: transactionID });
      }

      toast({
        title: "Success",
        description: "Transaction(s) retried successfully.",
        variant: "success",
      });

      navigate("/transactions");
    } catch (error: any) {
      toast({
        title: "Retry failed",
        description: error?.message || "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
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
            <DeleteList listId={list?.id ?? 0} />
          </>
        )}

        {(pathname === "/transactions" ||
          pathname.startsWith("/view-transactions")) && (
          <>
            <ViewTransactionDialog
              transactionID={transactionID}
              activeState={activeState}
              id={id}
            />

            {status !== "TS" && activeState !== "bulk" && (
              <div
                className="flex items-center gap-1 cursor-pointer text-destructive"
                onClick={handleRetry}
              >
                <span>
                  <RotateCcw className="w-3 h-3 " />
                </span>
                <span>{submitting ? "Retrying" : "Retry failed"}</span>
              </div>
            )}
          </>
        )}

        {activeState === "bulk" && (
          <div
            className="flex items-center gap-1 cursor-pointer text-[#000000CC]"
            onClick={() => {
              if (id) {
                navigate(`/view-transactions/${id}`);
              }
            }}
          >
            <span>
              <FaMoneyBillTransfer className="w-3 h-3" />
            </span>
            <span>View transactions</span>
          </div>
        )}

        {bulkStatus !== "success" && activeState === "bulk" && (
          <div
            className="flex items-center gap-1 cursor-pointer text-destructive"
            onClick={handleRetry}
          >
            <span>
              <RotateCcw className="w-3 h-3 " />
            </span>
            <span>{`
            Retry failed (${failedCount})`}</span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
