import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useState } from "react";
import { RejectApplicationForm } from "./Forms/RejectApplicationForm";
export interface RejectApplicationProps {
    clientID: number;
    onClose: () => void;
}
export function RejectAplication({ clientID ,onClose }: RejectApplicationProps) {
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
        onClick={() => { 
          setIsDialogOpen(true);
          onClose();
        }}
          variant={"outline"}
          className=" bg-[#D93E39] text-white justify-self-end  "
        >
          Reject {" "}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Reject Application</DialogTitle>
        </DialogHeader>
        <RejectApplicationForm clientID={clientID} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
