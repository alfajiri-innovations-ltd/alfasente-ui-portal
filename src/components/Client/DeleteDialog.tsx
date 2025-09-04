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
import { toast } from "@/hooks/use-toast";
import { DeleteListRoute } from "@/lib/api-routes";

interface DeleteListProps {
  listId: number;
  onDeleted?: () => void;
}
export function DeleteList({ listId, onDeleted }: DeleteListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(DeleteListRoute(listId), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Successful",
          description: "List deleted successfully",
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
        <div className="flex items-center cursor-pointer text-[#EE443F] gap-1">
          <Trash2 className="h-4 w-4" />
          <span>Delete list</span>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Delete List</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this list? This action cannot be
          undone.
        </p>
        <div className="flex items-center justify-self-end gap-3">
          <Button variant={"outline"} className=" justify-self-end  ">
            Cancel
          </Button>

          <Button
            variant={"outline"}
            className="bg-[#D93E39] justify-self-end  text-white"
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
