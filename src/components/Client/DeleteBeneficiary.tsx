import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export function DeleteBeneficiary() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Delete Beneficiary</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this beneficiary? This action cannot
          be undone.
        </p>
        <div className="flex items-center justify-self-end gap-3">
          <Button variant={"outline"} className=" justify-self-end  ">
            Cancel
          </Button>

          <Button
            variant={"outline"}
            className="bg-[#D93E39] justify-self-end  text-white"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
