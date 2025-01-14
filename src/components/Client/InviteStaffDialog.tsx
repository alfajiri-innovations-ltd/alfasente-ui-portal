import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { InviteStaffForm } from "../AuthForms/InviteStaffForm";
import { Plus } from "lucide-react";
import { useState } from "react";

export function InviteStaff() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Invite Staff</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <InviteStaffForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
