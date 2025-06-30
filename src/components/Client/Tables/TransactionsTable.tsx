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
import { ITransaction } from "@/lib/interfaces/interfaces";

export interface ITransactionsTableProps {
  transactions?: ITransaction[];
  transaction?: ITransaction;
}
export function getStatusBadge(status: ITransaction["status"]) {
  switch (status) {
    case "FAILED":
      return "bg-[#FFEAE9] text-[#A9302D] border-[#FFD9D7]";

    case "SUCCESSFUL":
      return "bg-[#ECF8EF] text-[#308242] border-[#C5E9CD]";

    default:
      return "bg-red-100 text-red-500";
  }
}
export function TransactionsTable({ transactions }: ITransactionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Transaction Type</TableHead>
          <TableHead>Amount (UGX)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Recipient</TableHead>
          <TableHead className="">Date and Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-1">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                {transaction.transactionType === "Disbursement Transaction" ? (
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
            </TableCell>{" "}
            <TableCell>{transaction.mainAmount}</TableCell>
            <TableCell>
              <Badge
                className={`border rounded-full py-1 px-1.5 text-[14px] ${getStatusBadge(transaction.status)}`}
              >
                {transaction.status}{" "}
              </Badge>
            </TableCell>
            <TableCell>
              {transaction.beneficiaryName ||
                transaction.beneficiaryMobileNumber ||
                "Wallet"}
            </TableCell>
            <TableCell>
              {format(transaction.recordDate, "yyyy-MM-dd HH:mm")}
            </TableCell>
            <TableCell>
              <ActionsPopover transactionID={transaction.transactionID} />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
