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
import { ApproveClient } from "@/lib/api-routes";

interface ApproveApplicationProps {
  clientID: number;
  onClose: () => void;
}

export function ApproveApplication({
  clientID,
  onClose,
}: ApproveApplicationProps) {
  const [submitting, setSubmitting] = useState(false);
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const token = getUserToken();

  const submit = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(ApproveClient(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clientID,
        }),
      });

      const responsedata = await response.json();

      if (response.ok) {
        SuccessToast("Application approved successfully!");

        handleClose();
      } else {
        throw new Error(responsedata || "Failed to approve the Application.");
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
        <Button
          onClick={() => {
            setIsDialogOpen(true);
            onClose();
          }}
          className="  text-white"
        >
          Approve
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[33vw]">
        <DialogHeader>
          <DialogTitle>Approve Application</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to approve this application? This will give the
          user access to the Alfasente organisation dashboard.
        </p>
        <div className="flex items-center justify-self-end gap-3">
          <Button
            variant={"outline"}
            className=" justify-self-end  "
            onClick={handleClose}
          >
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
