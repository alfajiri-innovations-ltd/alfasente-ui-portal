import {  useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import {  EyeIcon } from "lucide-react";
import { useFetchAuditLog } from "@/lib/services/FetchAuditLog";




interface ViewApplicationDetails {
  auditLogId?: number;
  onClose?: () => void;
}

export function ViewAuditLog({ auditLogId, onClose }: ViewApplicationDetails) {
  
  const [DialogOpen, setIsDialogOpen] = useState(false);

const { AuditLog,loading,error } = useFetchAuditLog(auditLogId ?? 0);



  return (
    <>
      <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => {
              setIsDialogOpen(true);
              onClose?.();
            }}
          >
            <span className="">
              <EyeIcon className="h-4 w-4" />
            </span>
            <span className="text-[12px] font-normal text-[#33333]">
              View details
            </span>
          </div>
        </DialogTrigger>

        <DialogContent className="md:w-[500px] w-[90vw] lg:left-[84%] rounded-[10px] h-[500px] overflow-y-auto scrollbar-hide">
          {loading ? (
            <p className="text-[13px] font-normal text-[#66666]">Loading...</p>
          ) : error ? (
            <p className="text-[13px] font-normal text-red-500">
              Error: {error}
            </p>
          ) : (
            <div>
                <span>Audit Logs Details</span>
                <div className="border rounded-md flex items-center p-2 my-3">
                    <span></span>
                    <span className="text-sm">
                        {AuditLog?.event}
                    </span>
                </div>

                <div className="flex flex-col gap-2 my-2">
                    <div className="flex justify-between items-center">
                        <span>Organisation</span>
                                                <span>{AuditLog?.organization.organization_name}</span>

                    </div>
                    <div className="flex justify-between items-center">
                        <span>Role</span>
                                                <span>{AuditLog?.role}</span>

                    </div>
                    <div className="flex justify-between items-center">
                        <span>Date and Time</span>
                                                <span>{AuditLog?.created_at}</span>

                    </div>
                    {/* <div className="flex justify-between items-center">
                        <span>Email sent</span>
                                                <span>Organisation</span>

                    </div> */}

                </div>
            </div>
          )}
{/* 
            <Button variant={"outline"} className="text-black ">
              Cancel
            </Button> */}

        </DialogContent>
      </Dialog>

    </>
  );
}
