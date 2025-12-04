import { ArrowLeft } from "lucide-react";
import { getStatusBadge } from "./Tables/BeneficiariesTables";
import { Badge } from "../ui/badge";
import { MembersTable } from "./Tables/MembersTable";
import { useEffect, useState } from "react";
import { PaginationDemo } from "./Pagination";
import { ApproveList } from "./ApproveList";
import { RejectList } from "./RejectList";
import { GetList } from "@/lib/services/GetListById";
import { useGetMembers } from "@/lib/services/GetMembers";
import { useParams } from "react-router-dom";
import { getAuthUser } from "@/lib/cookies/UserMangementCookie";

function ViewMembers() {
  const { listId } = useParams();
  const parsedListId = parseInt(listId || "", 10);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchedList = GetList(parsedListId);

  const [list, setList] = useState<any>(null);

  useEffect(() => {
    if (fetchedList?.list) {
      setList(fetchedList.list);
    }
  }, [fetchedList]);

  const members = useGetMembers(parsedListId);

  const user = getAuthUser();
  const loggedInUserId = user?.userId;

  console.log(loggedInUserId);

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

  // const handleApproved = (listId: number) => {
  //   if (list?.id === listId) {
  //     const updated = { ...list, status: "Approved" };
  //     setList(updated);
  //     console.log("newList", updated);
  //   }
  // };
  const updateStatus = (listId: number, status: "Approved" | "Rejected") => {
    if (list?.id === listId) {
      setList({ ...list, status });
    }
  };

  // const handleApproved = async (listId: number) => {
  //   if (list?.id === listId) {
  //     setList({ ...list, status: "Approved" });
  //     await refetchList();
  //   }
  // };

  // const handleRejected = (listId: number) => {
  //   if (list?.id === listId) {
  //     setList({ ...list, status: "Rejected" });
  //   }
  // };
  // console.log(list);
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
            {list?.name} ({members?.length})
          </span>
          <Badge
            variant={"outline"}
            className={`p-1.5 rounded-full capitalize ${getStatusBadge(list?.status)}`}
          >
            {list?.status}
          </Badge>
        </div>
        {list?.status !== "Approved" && (
          <>
            {loggedInUserId === list?.assignedTo ? (
              <div className="flex items-center justify-self-end gap-3">
                <RejectList
                  listId={parsedListId}
                  onRejected={() => updateStatus(parsedListId, "Rejected")}
                />{" "}
                <ApproveList
                  listId={parsedListId}
                  onApproved={() => updateStatus(parsedListId, "Approved")}
                />
              </div>
            ) : (
              <div className="text-red-600 font-medium text-sm">
                You are not authorized to take action on this list.
              </div>
            )}
          </>
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
