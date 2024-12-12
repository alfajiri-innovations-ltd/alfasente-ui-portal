import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RenameListForm } from "./Forms/RenameListForm";
import { Edit } from "lucide-react";
import { IBeneficiariesTableProps } from "./Tables/BeneficiariesTables";

export function RenameList({ list }: IBeneficiariesTableProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer gap-1 text-[#000000CC]">
          <Edit className="h-4 w-4" />

          <span>Rename list</span>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[25vw]">
        <DialogHeader>
          <DialogTitle>Rename List</DialogTitle>
        </DialogHeader>
        <RenameListForm list={list} />
      </DialogContent>
    </Dialog>
  );
}
