import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
export interface RejectApplicationProps {
  proof: string;
  onClose?: () => void;
}
export function ViewProof({ proof }: RejectApplicationProps) {
  const [DialogOpen, setIsDialogOpen] = useState(false);


  const BASERUL = `${import.meta.env.VITE_BACKEND_API_URL}`;


  //   const handleClose = () => {
  //     setIsDialogOpen(false);
  //   };

  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <span className="text-[#8D35AA] underline text-center cursor-pointer">
          View
        </span>
      </DialogTrigger>

      <DialogContent className="w-[40vw] h-[25vw] bg-slate-200 p-0 rounded-2xl overflow-hidden">
        <div className="flex justify-center items-center h-full w-full">
          <img
            src={`${BASERUL}/${proof}`}
            alt="Proof of Payment"
            className="h-full w-full  object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
