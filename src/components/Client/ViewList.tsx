import { useEffect, useState } from "react";
import {  EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

import {  formatDateTime } from "@/lib/utils";
import { getStatusBadge } from "./Tables/TransactionsTable";
import { GetList } from "@/lib/services/GetListById";
// import { useGetMembers } from "@/lib/services/GetMembers";
import { getRandomColor } from "./Tables/MembersTable";
import { HiMiniUsers } from "react-icons/hi2";

interface ViewTransactionDialogProp {
  listId: number;
  activeState?: string;
  id?: number;
}

export function ViewListDialog({ listId }: ViewTransactionDialogProp) {
  const [DialogOpen, setIsDialogOpen] = useState(false);

  const fetchedList = GetList(listId);

  const [list, setList] = useState<any>(null);

  useEffect(() => {
    if (fetchedList?.list) {
      setList(fetchedList.list);
    }
  }, [fetchedList]);

  // const members = useGetMembers(listId);

  const handleClose = () => setIsDialogOpen(false);

  // function getBadgeStatus(proofOfCredit: string | undefined) {
  //   return proofOfCredit
  //     ? "bg-[#FFECD1] text-[#B46600] border-[#F5DFFD]"
  //     : "bg-[#F9EBFE] text-[#7E249A] border-[#F5DFFD]";
  // }

  return (
    <Dialog open={DialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <EyeIcon className="h-4 w-4" />
          <span className="text-[15px] font-normal text-[#33333]">
            View list
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="md:w-[450px] w-[90vw] lg:left-[80%] rounded-[10px] ">
        <DialogHeader>
          <DialogTitle>Beneficiary List Details</DialogTitle>
        </DialogHeader>

        <div className="">
          <>
            <div className="flex flex-col">
              <div className="flex items-center justify-between border border-[#C8CFDE] p-2 mb-2 rounded-[10px]">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                    <HiMiniUsers
                      style={{
                        fill: getRandomColor(),
                      }}
                    />
                  </span>
                  <span>{list?.name}</span>
                </div>
                <span className="font-bold">{list?.members.length ?? 0}</span>
              </div>

              {/* Transaction Details */}
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Beneficiary ID
                  </span>
                  <span className="font-medium text-base text-black/80">
                    #{list?.id || ""}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    No. of members
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {list?.members.length ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Status
                  </span>
                  <Badge
                    className={`border rounded-full capitalize py-1 px-1.5 text-[14px] ${getStatusBadge(
                      list?.status ?? ""
                    )}`}
                  >
                    {list?.status}
                  </Badge>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Rejection Reason
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {list?.recordDate
                      ? `${formatDateTime(new Date(list.recordDate)).date} ${
                          formatDateTime(new Date(list.recordDate)).time
                        }`
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Created By
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {list?.createdBy || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Date Created
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {list?.createdAt
                      ? `${formatDateTime(new Date(list.createdAt)).date} ${
                          formatDateTime(new Date(list.createdAt)).time
                        }`
                      : "N/A"}{" "}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#7A8397] font-medium text-base">
                    Reviewed By
                  </span>
                  <span className="font-medium text-base text-black/80">
                    {list?.userName || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <DialogFooter className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
}
