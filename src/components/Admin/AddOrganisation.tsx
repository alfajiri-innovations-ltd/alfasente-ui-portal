import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useState } from "react";
import { OrganizationForm } from "./Forms/AddOrganizationForm";

export function AddOrganisation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleClose = () => {
  //   setIsDialogOpen(false);
  // };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Add Organisation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <span>Add Organisation</span>

        <OrganizationForm />
      </DialogContent>
    </Dialog>
  );
}
