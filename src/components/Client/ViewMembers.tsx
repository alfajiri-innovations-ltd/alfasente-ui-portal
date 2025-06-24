import { ArrowLeft } from "lucide-react";
import { getStatusBadge } from "./Tables/BeneficiariesTables";
import { Badge } from "../ui/badge";
import { MembersTable } from "./Tables/MembersTable";
import { useState } from "react";
import { PaginationDemo } from "./Pagination";
import { ApproveList } from "./ApproveList";
import { RejectList } from "./RejectList";
import { GetList } from "@/lib/services/GetListById";
import { useGetMembers } from "@/lib/services/GetMembers";
import { useParams } from "react-router-dom";

// interface IViewProps {
//   CloseView: () => void;
//   listId: number;
// }

function ViewMembers() {
   const { listId } = useParams(); 
  const parsedListId = parseInt(listId || "", 10); 
  const [currentPage, setCurrentPage] = useState(1);

  const list = GetList(parsedListId);
  const members = useGetMembers(parsedListId);

  

 

  const MembersPerPage = 8;

  const totalPages = Math.ceil(members?.length / MembersPerPage);
  const currentMembers = members?.slice(
    (currentPage - 1) * MembersPerPage,
    currentPage * MembersPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  return (
    <div className="mx-5 my-3">
      <div
        className="text-primary cursor-pointer flex items-center gap-2"
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-semibold text-base">Back to all lists</span>
      </div>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-2 m">
          <span className="font-semibold text-xl capitalize">
            {" "}
            {list?.list?.name} ({members?.length})
          </span>
          <Badge
            variant={"outline"}
            className={`p-1.5 rounded-full capitalize ${getStatusBadge(list?.list?.status)}`}
          >
            {list?.list?.status}
          </Badge>
        </div>
        {list?.list?.status !== "Approved" && (
          <div className="flex items-center justify-self-end gap-3">
            <RejectList listId={parsedListId}/>
            <ApproveList listId={parsedListId} />
          </div>
        )}
      </div>

      <MembersTable members={currentMembers} />

      <div className="flex justify-between  items-center my-1 ">
        <div className="">
          <span className="font-normal text-[15px]  ">
            Showing {currentMembers?.length} of {members?.length} results
          </span>
        </div>
        <div className="">
          <PaginationDemo
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewMembers;
