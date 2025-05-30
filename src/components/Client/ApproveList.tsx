import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ErrorToast, SuccessToast } from "../ui/Toasts";
import { useState } from "react";
import { getUserToken } from "@/lib/cookies/UserMangementCookie";
import { ApproveListEndPoint } from "@/lib/api-routes";
import { RejectListProps } from "./RejectList";

export function ApproveList({ listId }: RejectListProps) {
  const [submitting, setSubmitting] = useState(false);
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const token = getUserToken();

  const submit = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(ApproveListEndPoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listId,
        }),
      });

      console.log(response);
   

      const responsedata = await response.json();

      if (response.ok) {
        SuccessToast("List approved successfully!");

        handleClose();
      } else {
        throw new Error(responsedata || "Failed to approve the list.");
      }
    } catch (error: any) {
      ErrorToast(error.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
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
          <Button variant={"outline"} className=" justify-self-end  " onClick={handleClose}>
            Cancel
          </Button>

          <Button
            className="bg-[#8D35AA] justify-self-end  text-white"
            onClick={submit}
            disabled={submitting}
          >
            {submitting ? "Approving" : "Approve"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
