import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RejectListForm, RejectListFormProps } from "./Forms/RejectListForm";
import { Button } from "../ui/button";
import { useState } from "react";
export interface RejectListProps {
  listId: number;
}
export function RejectList({ listId }: RejectListProps) {
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className=" bg-[#D93E39] text-white justify-self-end  "
        >
          Reject List{" "}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Reject List</DialogTitle>
        </DialogHeader>
        <RejectListForm listId={listId} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
