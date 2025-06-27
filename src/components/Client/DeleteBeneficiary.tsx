"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { DeleteBeneficiaryRoute } from "@/lib/api-routes";
import { toast } from "@/hooks/use-toast";

interface DeleteBeneficiaryProps {
  beneficiaryId: number;
  onDeleted?: () => void;
}

export function DeleteBeneficiary({
  beneficiaryId,
  onDeleted,
}: DeleteBeneficiaryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(DeleteBeneficiaryRoute(beneficiaryId), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Successful",
          description: "Beneficiary deleted successfully",
        });
        if (onDeleted) onDeleted();
        setOpen(false);
      } else {
        const data = await response.json();
        toast({
          variant: "destructive",
          title: "Failure",
          description: `An error occurred: ${data.message}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failure",
        description: `An error occurred: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <div className="flex items-center justify-end gap-3">
          <Button
            variant={"outline"}
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            variant={"outline"}
            className="bg-[#D93E39] text-white"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
