import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RejectListForm } from "./Forms/RejectListForm";
import { Button } from "../ui/button";

export function RejectList() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className=" justify-self-end  ">
          Reject List{" "}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Reject List</DialogTitle>
        </DialogHeader>
        <RejectListForm />
      </DialogContent>
    </Dialog>
  );
}
