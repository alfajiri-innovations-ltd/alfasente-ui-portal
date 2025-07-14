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
import { truncateUUID, formatDateTime, getTotalCost } from "@/lib/utils.ts";

import { Download, EyeIcon } from "lucide-react";
import { useState } from "react";

import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";

interface ViewTransactionDialogProp {
  transactionID?: string;
}

export function ViewTransactionDialog({
  transactionID,
}: ViewTransactionDialogProp) {
  const { Transaction, loading, error } = GetTransaction(transactionID || "");
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="">
            <EyeIcon className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-normal text-[#33333]">
            View Details
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="md:w-[450px] w-[90vw] lg:left-[80%] rounded-[10px] h-[90vh]">
        <DialogHeader className="">
          <DialogTitle>Transation Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-[13px] font-normal text-[#66666]">Loading...</p>
        ) : error ? (
          <p className="text-[13px] font-normal text-red-500">Error: {error}</p>
        ) : (
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
                  {Transaction?.transactionType === "Disbursement Transaction"
                    ? `Sent to ${Transaction?.beneficiaryName || Transaction?.beneficiaryMobileNumber}`
                    : "Deposited to AlfaSente"}
                </span>
              </div>

              <span>
                {Transaction?.transactionType === "Disbursement Transaction"
                  ? `-UGX ${Transaction?.mainAmount}`
                  : `${Transaction?.mainAmount || ""}`}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Transaction ID
                </span>
                <span className="font-medium tetx-base text-black/80">
                  #{truncateUUID(Transaction?.transactionID || "")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Status
                </span>
                <span className="font-medium tetx-base text-black/80">
                  {Transaction?.status}
                </span>
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
                <span className="font-medium tetx-base text-black/80">
                  {Transaction?.beneficiaryName ||
                    Transaction?.beneficiaryMobileNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Beneficiary List
                </span>
                <span className="font-medium tetx-base text-black/80">
                  #TXN098657
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Moblie Number
                </span>
                <span className="font-medium tetx-base text-black/80">
                  {Transaction?.beneficiaryMobileNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Payer
                </span>
                <span className="font-medium tetx-base text-black/80">
                  #TXN098657
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Reason
                </span>
                <span className="font-medium tetx-base text-black/80">
                  {Transaction?.narration}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Amount
                </span>
                <span className="font-medium tetx-base text-black/80">
                  {Transaction?.mainAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  {Transaction?.mtnCharge ? "Mtn Charges" : "Airtel Charges"}
                </span>
                <span className="font-medium tetx-base text-black/80">
                  {Transaction?.mtnCharge
                    ? `${Transaction?.mtnCharge}`
                    : `${Transaction?.airtelCharge}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  ServiceFee
                </span>
                <span className="font-medium tetx-base text-black/80">
                  {Transaction?.alfasenteCharge}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A8397] font-medium text-base">
                  Total Cost
                </span>
                <span className="font-medium tetx-base text-black/80">
                  {Transaction ? getTotalCost(Transaction) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}
        <DialogFooter className="flex justify-self-end items-center gap-3">
          <Button type="submit" variant={"outline"} onClick={handleClose}>
            Close
          </Button>

          <Button type="submit" className="items-center gap-1">
            <Download />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
