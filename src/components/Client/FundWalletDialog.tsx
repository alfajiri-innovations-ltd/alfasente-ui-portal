import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet } from "lucide-react";

export function FundWallet() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex px-2 py-1 gap-1 items-center cursor-pointer bg-secondary text-white text-[15px] rounded-[8px]">
          <Wallet className="h-4 w-4" />
          <span>Fund Wallet</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fund your wallet</DialogTitle>
        </DialogHeader>

        <div>
          <span>Select mobile money provider</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
