import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Wallet } from "lucide-react";
import FundWalletDetails from "./FundWalletDetails";

export function FundWallet() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex px-2 py-1 gap-1 items-center cursor-pointer bg-secondary text-white text-[15px] rounded-[8px]">
          <Wallet className="h-4 w-4" />
          <span>Fund Wallet</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[60vw]">
        <div className="-mt-2 bg-[#EDF0F7] rounded-full h-7 w-7 flex justify-center items-center">
          <ArrowLeft className="h-4 w-4" />
        </div>

        <div className=" my-0 mx-20">
          <FundWalletDetails />
        </div>
      </DialogContent>
    </Dialog>
  );
}
