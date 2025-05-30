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
import { useState } from "react";

export function RenameList({ list }: IBeneficiariesTableProps) {

   const [DialogOpen, setIsDialogOpen] = useState(false);
     
  
     const handleClose=()=>{
      setIsDialogOpen(false);
     }
  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
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
        {list && <RenameListForm list={list} handleClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
}
