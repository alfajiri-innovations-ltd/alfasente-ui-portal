import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
export interface RejectApplicationProps {
  proof: string;
  onClose?: () => void;
}
export function ViewProof({ proof }: RejectApplicationProps) {
  const [DialogOpen, setIsDialogOpen] = useState(false);

  console.log(proof);

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

      <DialogContent className="w-[30vw]">
        <div className="flex justify-center items-center h-full">
          <img
            src={proof}
            alt="Proof of Payment"
            className="max-h-[400px] max-w-full object-cover"
          />
        </div>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
