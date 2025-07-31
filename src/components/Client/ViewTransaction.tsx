import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { GetTransaction } from "@/lib/services/GetTransactionById";
import {
  truncateUUID,
  formatDateTime,
  getTotalCost,
  formatMoney,
} from "@/lib/utils.ts";

import { Download, EyeIcon } from "lucide-react";
import { useState } from "react";

import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { Badge } from "../ui/badge";

import { GetBulkTransaction } from "@/lib/services/fetchBulkTransactionById";
import { getStatusBadge } from "./Tables/TransactionsTable";

interface ViewTransactionDialogProp {
  transactionID?: string;
  activeState?: string;
  id?: number;
}

export function ViewTransactionDialog({
  transactionID,
  activeState,
  id,
}: ViewTransactionDialogProp) {
  const { Transaction, loading, error } = GetTransaction(transactionID || "");
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const bulkTransactionResult =
    id !== undefined ? GetBulkTransaction(id) : undefined;

  const transactions = bulkTransactionResult?.Transaction;


  const handleClose = () => {
    setIsDialogOpen(false);
  };
  function getBadgeStatus(proofOfCredit: string | undefined) {
    if (proofOfCredit) {
      return "bg-[#FFECD1] text-[#B46600] border-[#F5DFFD]";
    } else {
      return "bg-[#F9EBFE] text-[#7E249A] border-[#F5DFFD]";
    }

    // switch (proofOfCredit) {
    //   case "FAILED":
    //     return "bg-[#F9EBFE] text-[#7E249A] border-[#F5DFFD]";

    //   case "SUCCESSFUL":
    //     return "bg-[#ECF8EF] text-[#308242] border-[#C5E9CD]";

    //   default:
    //     return "bg-[#FFECD1] text-red-500";
    // }
  }


  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="">
            <EyeIcon className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-normal text-[#33333]">
            View {activeState === "bulk" ? "list" : "Details"}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="md:w-[450px] w-[90vw] lg:left-[80%] rounded-[10px] h-[90vh]">
        <DialogHeader className="">
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className=" overflow-y-auto scrollbar-hide">
          {loading ? (
            <p className="text-[13px] font-normal text-[#66666]">Loading...</p>
          ) : error ? (
            <p className="text-[13px] font-normal text-red-500">
              Error: {error}
            </p>
          ) : activeState !== "bulk" ? (
            <div className="flex flex-col    ">
              <div className="flex items-center justify-between border -top-2 mb-2 border-[#C8CFDE] p-2 rounded-[10px]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                    {Transaction?.transactionType ===
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

                  <span>
                    {Transaction?.transactionType ===
                      "Disbursement Transaction" || transactions
                      ? `Sent to ${
                          Transaction?.beneficiaryName ||
                          Transaction?.beneficiaryMobileNumber ||
                          "Wallet"
                        }`
                      : "Deposited to Wallet"}

                    {Transaction?.transactionType !==
                      "Disbursement Transaction" && (
                      <Badge
                        className={`text-[10px] font-extralight px-1 mx-1  ${getBadgeStatus(Transaction?.proofOfCredit)}`}
                      >
                        {" "}
                        {Transaction?.proofOfCredit ? "Self" : "Manual"}
                      </Badge>
                    )}
                  </span>
                </div>

                <span>
                  {Transaction?.transactionType === "Disbursement Transaction"
                    ? `- ${formatMoney(Transaction?.mainAmount ?? 0)}`
                    : `${formatMoney(Transaction?.mainAmount ?? 0)}`}
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Transaction ID
                  </span>
                  <span className="font-medium text-base text-black/80">
                    #{truncateUUID(Transaction?.transactionID || "")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Status
                  </span>
                  <Badge
                    className={`border rounded-full py-1 px-1.5 text-[14px] ${getStatusBadge(Transaction?.status ?? "")}`}
                  >
                    {Transaction?.status}{" "}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Transaction date
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {Transaction?.recordDate
                      ? `${formatDateTime(new Date(Transaction.recordDate)).date} ${formatDateTime(new Date(Transaction.recordDate)).time}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Completed On
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {Transaction?.liquidationDate
                      ? `${formatDateTime(new Date(Transaction.liquidationDate)).date} ${formatDateTime(new Date(Transaction.liquidationDate)).time}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Recipient
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {Transaction?.beneficiaryName || "Wallet"}
                  </span>
                </div>
                {Transaction?.transactionType ===
                  "Disbursement Transaction" && (
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Beneficiary List
                    </span>
                    <span className="font-medium text-base text-black/80">
                      {Transaction?.listName || "N/A"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Moblie Number
                  </span>
                  <span className="font-medium text-base text-black/80">
                    0
                    {Transaction?.beneficiaryMobileNumber ||
                      Transaction?.sourceOfFunds}
                  </span>
                </div>

                {Transaction?.transactionType === "Disbursement Transaction" ? (
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Payer
                    </span>
                    <span className="font-medium text-base text-black/80">
                      {Transaction?.payer}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Funded By
                    </span>
                    <span className="font-medium text-base text-black/80">
                      {Transaction?.userName}
                    </span>
                  </div>
                )}

                {Transaction?.transactionType ===
                  " Disbursement Transaction" && (
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-base">
                      Reason
                    </span>
                    <span className="font-medium text-base text-black/80">
                      {Transaction?.narration}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Amount
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {formatMoney(Transaction?.mainAmount ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    {Transaction?.mtnCharge ? "Mtn Charges" : "Airtel Charges"}
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {Transaction?.mtnCharge
                      ? `${formatMoney(Transaction?.mtnCharge ?? 0)}`
                      : `${formatMoney(Transaction?.airtelCharge ?? 0)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    ServiceFee
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {formatMoney(Transaction?.alfasenteCharge ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Total Cost
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {Transaction
                      ? formatMoney(getTotalCost(Transaction))
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="  ">
              <div className="flex items-center justify-between border  mb-2 border-[#C8CFDE] p-2 rounded-[10px]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                    <MdOutlineArrowUpward
                      style={{
                        fill: "#7F1F26",
                      }}
                    />
                  </span>

                  <span>{`Sent to ${transactions?.name}`}</span>
                </div>

                <span>
                  {`- ${formatMoney(transactions?.totalAmount ?? 0)}`}
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Bulk payments ID
                  </span>
                  <span className="font-medium text-base text-black/80">
                    #BP{transactions?.id || ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Status
                  </span>
                  <Badge
                    className={`border rounded-full py-1 px-1.5 text-[14px] capitalize ${getStatusBadge(transactions?.status ?? "")}`}
                  >
                    {transactions?.status}{" "}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Transaction date
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {transactions?.createdAt
                      ? `${formatDateTime(new Date(transactions.createdAt)).date} ${formatDateTime(new Date(transactions.createdAt)).time}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Completed On
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {transactions?.completedDate
                      ? `${formatDateTime(new Date(transactions.completedDate)).date} ${formatDateTime(new Date(transactions.completedDate)).time}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Beneficiary List
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium text-base capitalize text-black/80">
                      {transactions?.name}
                    </span>
                    <span className="font-medium text-base text-[#5C6474]">
                      {transactions?.members}recipient(s)
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Sender
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {transactions?.sender}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Amount
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {formatMoney(transactions?.totalAmount ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Airtel Charges
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {formatMoney(transactions?.airtelCharges ?? 0)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Mtn Charges
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {formatMoney(transactions?.mtnCharges ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Platform Fee
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {formatMoney(transactions?.serviceFee ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Total Cost
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {formatMoney(transactions?.totalAmount ?? 0)}
                  </span>
                </div>
              </div>

              <div className="border-b h-1 my-3  border-[#EDF0F7] "></div>

              <div className="">
                <h5 className="text-base font-medium">Status breakdown</h5>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-sm">
                      Success
                    </span>
                    <span className="text-[#3DA755] text-xs">
                      {transactions?.success}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-sm">
                      Failed
                    </span>
                    <span className="text-[#D93E39] text-xs">
                      {transactions?.failed}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A8397] font-medium text-sm">
                      Pending
                    </span>
                    <span className="text-[#E59339] text-xs">
                      {transactions?.pending}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between items-center gap-3 mt-6">
            <Button type="submit" variant={"outline"} onClick={handleClose}>
              Close
            </Button>

            <Button type="submit" className="items-center gap-1">
              <Download />
              Export
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
