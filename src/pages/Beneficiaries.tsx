import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";

import { BeneficiariesTable } from "@/components/Client/Tables/BeneficiariesTables";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import ViewMembers from "@/components/Client/ViewMembers";
import { UploadBeneficiaries } from "@/components/Client/UploadBeneficiaries";

const lists = [
  {
    name: "Staff",
    members: 46,
    status: "Pending",
    createdBy: "Grace Kizza",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Interns",
    members: 150,
    status: "Approved",

    createdBy: "Mutebire Arnold",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "pending",
    members: 45,
    status: "Rejected",

    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Contractors",
    members: 10,
    status: "Approved",

    createdBy: "Luswaata Vicent",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Drivers",
    members: 20,
    status: "Rejected",

    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },

  {
    name: "Interns",
    members: 150,
    status: "Approved",

    createdBy: "Mutebire Arnold",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "pending",
    members: 45,
    status: "Rejected",

    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Contractors",
    members: 10,
    status: "Approved",

    createdBy: "Luswaata Vicent",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Drivers",
    members: 20,
    status: "Rejected",

    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },
];
function Beneficiaries() {
  const [currentPage, setCurrentPage] = useState(1);

  const [ViewBeneficiarylist, setViewBeneficiarylist] = useState(false);

  const HandleClick = () => {
    setViewBeneficiarylist(!ViewBeneficiarylist);
  };

  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "rejected" | "approved"
  >("all");

  const ListsPerPage = 8;

  const totalPages = Math.ceil(lists.length / ListsPerPage);
  const currentLists = lists.slice(
    (currentPage - 1) * ListsPerPage,
    currentPage * ListsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const rejectedLists = lists.filter((list) => list.status === "Rejected");
  const pendingLists = lists.filter((list) => list.status === "Pending");
  const approvedLists = lists.filter((list) => list.status === "Approved");

  return (
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4 bg-white">
        <DashboardHeader PageTitle="Beneficiaries" />

        {!ViewBeneficiarylist ? (
          <>
            <div className="flex flex-col mx-5 my-5">
              <div className="flex justify-between items-center">
                <div className="flex  items-center p-1.5 justify-center">
                  <div className="flex  md:gap-2  text-[15px] font-medium">
                    <h4
                      className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                        activeTab === "all"
                          ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                          : "  border-[#F7F9FD]"
                      }  px-2 py-[2px]`}
                      onClick={() => setActiveTab("all")}
                    >
                      All <span className="mx-1">({lists.length})</span>
                    </h4>

                    <h4
                      className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                        activeTab === "pending"
                          ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                          : "  border-[#F7F9FD]"
                      }  px-2 py-[2px]`}
                      onClick={() => setActiveTab("pending")}
                    >
                      Pending
                      <span className="mx-1">({pendingLists.length})</span>
                    </h4>
                    <h4
                      className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                        activeTab === "approved"
                          ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                          : "  border-[#F7F9FD]"
                      }  px-2 py-[2px]`}
                      onClick={() => setActiveTab("approved")}
                    >
                      Approved
                      <span className="mx-1">({approvedLists.length})</span>
                    </h4>

                    <h4
                      className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                        activeTab === "rejected"
                          ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                          : "  border-[#F7F9FD]"
                      }  px-2 py-[2px]`}
                      onClick={() => setActiveTab("rejected")}
                    >
                      Rejected
                      <span className="mx-1">({rejectedLists.length})</span>
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {" "}
                  <Button variant={"outline"}>
                    <span>
                      <Filter />
                    </span>
                    Filter
                  </Button>
                  <UploadBeneficiaries />
                </div>
              </div>

              <div className="my-5">
                {activeTab === "all" && (
                  <BeneficiariesTable
                    lists={currentLists}
                    HandleClick={HandleClick}
                  />
                )}
                {activeTab === "pending" && (
                  <BeneficiariesTable
                    lists={pendingLists}
                    HandleClick={HandleClick}
                  />
                )}
                {activeTab === "approved" && (
                  <BeneficiariesTable
                    lists={approvedLists}
                    HandleClick={HandleClick}
                  />
                )}
                {activeTab === "rejected" && (
                  <BeneficiariesTable
                    lists={rejectedLists}
                    HandleClick={HandleClick}
                  />
                )}
              </div>

              <div className="flex justify-between  items-center ">
                <div className="">
                  <span className="font-normal text-[15px]  ">
                    Showing {currentLists.length} of {lists.length} results
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
          </>
        ) : (
          <ViewMembers CloseView={HandleClick} />
        )}
      </main>
    </div>
  );
}

export default Beneficiaries;
