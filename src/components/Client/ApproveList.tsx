import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export function ApproveList() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="  text-white">Approve List</Button>
      </DialogTrigger>

      <DialogContent className="w-[33vw]">
        <DialogHeader>
          <DialogTitle>Approve List</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to approve this list? Approved lists will be
          visible to all users in your organization
        </p>
        <div className="flex items-center justify-self-end gap-3">
          <Button variant={"outline"} className=" justify-self-end  ">
            Cancel
          </Button>

          <Button className="bg-[#8D35AA] justify-self-end  text-white">
            Approve{" "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
