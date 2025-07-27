import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { RejectApplicationForm } from "./Forms/RejectApplicationForm";
export interface RejectApplicationProps {
  clientID: number;
  onClose: () => void;
}
export function RejectAplication({
  clientID,
  onClose,
}: RejectApplicationProps) {
  const [, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Reject Application</DialogTitle>
        </DialogHeader>
        <RejectApplicationForm clientID={clientID} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
