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
import { Edit } from "lucide-react";

interface ApproveApplicationProps {
  transactionID?: string;
  onClose?: () => void;
  open?: boolean;
  triggerMode?: boolean;
}

export function InitiateTopUp({
  transactionID,
  onClose,
  open,
  triggerMode = false,
}: ApproveApplicationProps) {
  const [submitting, setSubmitting] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = triggerMode ? internalOpen : (open ?? false);

  const handleClose = () => {
    if (triggerMode) {
      setInternalOpen(false);
    }
    onClose?.();
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
          transactionID,
        }),
      });

      const responsedata = await response.json();

      if (response.ok) {
        SuccessToast("Manual Transaction approved successfully!");

        handleClose();
      } else {
        throw new Error(responsedata || "Failed to approve the Transaction.");
      }
    } catch (error: any) {
      ErrorToast(error.message || "An error occurred.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(o) => {
        if (triggerMode) setInternalOpen(o);
        else if (!o) onClose?.();
      }}
    >
      {triggerMode && (
        <DialogTrigger asChild>
          <div
            className="flex items-center gap-2 cursor-pointer text-[#000000CC]"
            onClick={() => setInternalOpen(true)}
          >
            <Edit className="h-4 w-4" />
            <span>Initiate top-up</span>
          </div>
        </DialogTrigger>
      )}

      <DialogContent className="w-[33vw]">
        <DialogHeader>
          <DialogTitle>Initiate Top-up</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to initiate this top-up request? This will send
          the request for approval to fund the wallet.
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
            {submitting ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
