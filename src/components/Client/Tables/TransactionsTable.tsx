import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionsPopover } from "../ActionsPopover";

import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { BulkList, ITransaction } from "@/lib/interfaces/interfaces";
import { formatMoney } from "@/lib/utils";
import { useLocation } from "react-router-dom";

interface TransactionsTableProps {
  transactions?: ITransaction[] | BulkList[];
  activeState?: "all" | "bulk";
}

// export interface ITransactionsTableProps {
// transactions?: ITransaction[] | BulkList[];
//   transaction?: ITransaction;
// }
export function getStatusBadge(status: ITransaction["status"]) {
  switch (status) {
    case "FAILED":
      return "bg-[#FFEAE9] text-[#A9302D] border-[#FFD9D7]";

    case "SUCCESSFUL":
      return "bg-[#ECF8EF] text-[#308242] border-[#C5E9CD]";

    case "success":
      return "bg-[#ECF8EF] text-[#308242] border-[#C5E9CD]";

    case "partial":
      return "bg-[#E6F4FF] text-[#006AB5] border-[#B0DEFF]";

    case "processing":
      return "bg-[#FFECD1] text-[#B46600] border-[#FFDDB1]";

    default:
      return "bg-red-100 text-red-500";
  }
}

export function TransactionsTable({
  transactions,
  activeState,
}: TransactionsTableProps) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {pathname.startsWith("/view-transactions") ? (
            <>
              <TableHead className="">TransactionID</TableHead>
            </>
          ) : (
            <>
              <TableHead className="">
                {activeState === "bulk" ? "Bulk details" : "Transaction Type"}
              </TableHead>
            </>
          )}

          <TableHead>Amount (UGX)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Recipient</TableHead>
          <TableHead className="">Date and Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((transaction, index) => (
          <TableRow key={index}>
            {pathname.startsWith("/view-transactions") ? (
              <>
                <TableCell>
                  {"transactionID" in transaction && `#TXN${transaction.transactionID.slice(0, 6)}`}
                </TableCell>
              </>
            ) : activeState !== "bulk" && "transactionType" in transaction ? (
              <TableCell className="font-medium flex items-center gap-1">
                <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                  {transaction.transactionType ===
                  "Disbursement Transaction" ? (
                    <MdOutlineArrowUpward
                      style={{
                        fill: "#7F1F26",
                      }}
                    />
                  ) : (
                    <MdOutlineArrowDownward
                      style={{
                        fill: "#3DA755",
                      }}
                    />
                  )}
                </span>

                {transaction.transactionType === "Disbursement Transaction"
                  ? "Sent"
                  : "Deposited"}
              </TableCell>
            ) : (
              <TableCell className="font-medium flex items-center gap-1">
                {"id" in transaction ? `Bulk #${transaction.id}` : "Bulk"}
              </TableCell>
            )}
            <TableCell>
              {"mainAmount" in transaction
                ? formatMoney(transaction.mainAmount)
                : "amount" in transaction
                  ? formatMoney(
                      typeof transaction.amount === "string"
                        ? transaction.amount
                        : 0
                    )
                  : " -"}
            </TableCell>
            <TableCell>
              <Badge
                className={`border rounded-full capitalize py-1 px-1.5 text-[14px] ${getStatusBadge(transaction.status)}`}
              >
                {transaction.status}{" "}
              </Badge>
            </TableCell>
            <TableCell>
              {"beneficiaryName" in transaction
                ? transaction.beneficiaryName ||
                  transaction.beneficiaryMobileNumber ||
                  "Wallet"
                : "name" in transaction
                  ? transaction.name
                  : "-"}
            </TableCell>
            <TableCell>
              {"recordDate" in transaction && transaction.recordDate
                ? format(transaction.recordDate as Date, "yyyy-MM-dd HH:mm")
                : "createdAt" in transaction &&
                    typeof transaction.createdAt === "string"
                  ? format(new Date(transaction.createdAt), "yyyy-MM-dd HH:mm")
                  : " -"}
            </TableCell>
            <TableCell>
              {"transactionID" in transaction ? (
                <ActionsPopover transactionID={transaction.transactionID} />
              ) : "id" in transaction ? (
                <ActionsPopover id={transaction.id} />
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
