import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { EditBeneficiaryForm } from "./Forms/EditBeneficiaryForm";
import { IMembers } from "./Tables/MembersTable";
import { useState } from "react";
interface EditBeneficiaryProps {
  member: IMembers;
}

export function EditBeneficiary({ member }: EditBeneficiaryProps) {
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Edit className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Edit Beneficiary</DialogTitle>
        </DialogHeader>
        <EditBeneficiaryForm member={member} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
