import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { EditBeneficiaryForm } from "./Forms/EditBeneficiaryForm";
import { IMembersTable } from "./Tables/MembersTable";

export function EditBeneficiary({ member }: IMembersTable) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="w-[30vw]">
        <DialogHeader>
          <DialogTitle>Edit Beneficiary</DialogTitle>
        </DialogHeader>
        <EditBeneficiaryForm member={member} />
      </DialogContent>
    </Dialog>
  );
}
