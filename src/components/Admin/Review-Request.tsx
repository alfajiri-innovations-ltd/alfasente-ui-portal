import {  useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { EyeIcon, Wallet } from "lucide-react";
import { GetTransaction } from "@/lib/services/GetTransactionById";
import { Badge } from "../ui/badge";
import { getStatusBadge } from "../Client/Tables/TransactionsTable";
import { formatMoney, truncateUUID } from "@/lib/utils";
import { InitiateTopUp } from "./InitiateTopUp";

interface ViewApplicationDetails {
  transactionID?: string;
  onClose?: () => void;
}

export function ViewRequest({
  transactionID,
  onClose,
}: ViewApplicationDetails) {
  const { Transaction, loading, error } = GetTransaction(transactionID || "");

  const [DialogOpen, setIsDialogOpen] = useState(false);

  const [showInitiate, setshowInitiate] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const HandleClick = () => {
    handleClose();
    setshowInitiate(!showInitiate);
  };

  const BASERUL = `${import.meta.env.VITE_BACKEND_API_URL}`;

  return (
    <>
      <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true);
              onClose?.();
            }}
          >
            <span className="">
              <EyeIcon className="h-4 w-4" />
            </span>
            <span className=" font-normal text-[#33333]">
              <span>Review Request</span>
            </span>
          </div>
        </DialogTrigger>

        <DialogContent className="md:w-[500px] w-[90vw] lg:left-[80%] rounded-[10px] overflow-y-auto scrollbar-hide h-[90vh]">
         
            {loading ? (
              <p className="text-[13px] font-normal text-[#66666]">
                Loading...
              </p>
            ) : error ? (
              <p className="text-[13px] font-normal text-red-500">
                Error: {error}
              </p>
            ) : (
              <div className="flex flex-col gap-3 ">
                <span>Top-up Request Details</span>

                <div className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">Request ID</span>#
                      {truncateUUID(Transaction?.transactionID || "")}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">Status</span>
                      <Badge
                        className={`border rounded-full capitalize py-1 px-1.5 text-[14px] ${getStatusBadge(Transaction?.status ?? "")}`}
                      >
                        {Transaction?.status}{" "}
                      </Badge>{" "}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">User</span>
                      <span>{Transaction?.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">Organization</span>
                      <span>{Transaction?.organizationName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">Amount</span>
                      <span>{formatMoney(Transaction?.mainAmount ?? 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">Date Submitted</span>
                      <span>30 Nov, 2024 11:25 AM</span>
                    </div>
                  </div>

                  <div className="h-[1px] border border-b border-[#EDF0F7]"></div>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <Wallet className="h-4 w-4" />
                    <span>Wallet Allocation</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">
                        Airtel Money balance{" "}
                      </span>
                      <span>{formatMoney(Transaction?.airtelWalletBalance ?? 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A8397]">MTN MoMo balance</span>
                      <span>{formatMoney(Transaction?.mtnWalletBalance ?? 0)}</span>
                    </div>
                  </div>

                  <div className="h-[1px] border border-b border-[#EDF0F7] mt-3"></div>
                </div>

                {Transaction?.proofOfCredit ? (
                  <div className="bg-slate-300 h-[230px] rounded-2xl w-full overflow-hidden">
                    <img
                      src={`${BASERUL}/${Transaction.proofOfCredit}`}
                      alt="Proof of Payment"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-slate-100 h-[230px] rounded-2xl flex items-center justify-center">
                    <p className="text-sm text-gray-500">No proof uploaded</p>
                  </div>
                )}

                {/* <div>
                <h3>Review Details</h3>
                <div className="flex justify-between">
                  <span>Date submitted</span>
                  <span>{client?.clientEmail}</span>
                </div>

                <div className="flex justify-between">
                  <span>Date Reviewed</span>
                  <span>{client?.dateRejected || client?.dateApproved}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span>{client?.isApproved}</span>
                </div>
              </div> */}
              </div>
            )}

            <div className="flex justify-between mt-4 items-center">
              <Button variant={"outline"} className="text-black ">
                Cancel
              </Button>

              <div className="flex items-center gap-2">
                <Button onClick={HandleClick}>Initiate top-up</Button>
              </div>
            </div>
        </DialogContent>
      </Dialog>

      {showInitiate && (
        <InitiateTopUp
          transactionID={transactionID}
          open={true}
          onClose={() => setshowInitiate(false)}
        />
      )}
    </>
  );
}
