import { BeneficiariesTable } from "@/components/Client/Tables/BeneficiariesTables";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { useClientListsWithMembers } from "@/lib/services/FetchClientLists";
import { listsWithMembers } from "@/lib/interfaces/interfaces";
import Layout from "@/components/Commons/Layout";
import { useNavigate } from "react-router-dom";

function BeneficiariesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSelectedListId] = useState<number | null>(null);

  const navigate = useNavigate();

  // const Lists: listsWithMembers[] = GetLists();

  const { data: Lists, isLoading, error } = useClientListsWithMembers();

  const [ViewBeneficiarylist, setViewBeneficiarylist] = useState(false);

  const HandleClick = (List?: listsWithMembers) => {
    if (List?.id) {
      setSelectedListId(List.id);
    }
    setViewBeneficiarylist(!ViewBeneficiarylist);
  };

  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "rejected" | "approved"
  >("all");

  const ListsPerPage = 8;

  const totalPages = Math.ceil((Lists?.length ?? 0) / ListsPerPage);
  const currentLists = Lists?.slice(
    (currentPage - 1) * ListsPerPage,
    currentPage * ListsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const rejectedLists = Lists?.filter((list) => list.status === "Rejected");
  const pendingLists = Lists?.filter((list) => list.status === "pending");
  const approvedLists = Lists?.filter((list) => list.status === "Approved");

  if (isLoading)
    return (
      <Layout title="Beneficiaries">
        <div className="flex justify-center items-center">Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout title="Beneficiaries">
        <div className="flex justify-center items-center">
          Error fetching lists
        </div>
      </Layout>
    );

  return (
    <Layout title="Beneficiaries">
      <>
        {Lists?.length === 0 ? (
          <div className="flex flex-col m-2 ">
            <div className="flex justify-end mx-4">
              <Button
                onClick={() => {
                  navigate("/uploadlist");
                }}
              >
                Upload List
              </Button>
            </div>
            <h3 className="font-bold text-center text-xl">
              No Lists Found Upload
            </h3>
          </div>
        ) : (
          <div className="flex flex-col mx-5 my-5 ">
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
                    All <span className="mx-1">({Lists?.length})</span>
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
                    <span className="mx-1">({pendingLists?.length})</span>
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
                    <span className="mx-1">({approvedLists?.length})</span>
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
                    <span className="mx-1">({rejectedLists?.length})</span>
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    navigate("/uploadlist");
                  }}
                >
                  Upload List
                </Button>
                <Button variant={"outline"}>
                  <span>
                    <Filter />
                  </span>
                  Filter
                </Button>
              </div>
            </div>

            <div className="my-5">
              {activeTab === "all" && (
                <BeneficiariesTable
                  lists={currentLists}
                  HandleClick={(list: listsWithMembers) => HandleClick(list)}
                />
              )}
              {activeTab === "pending" && (
                <BeneficiariesTable
                  lists={pendingLists}
                  HandleClick={(list: listsWithMembers) => HandleClick(list)}
                />
              )}
              {activeTab === "approved" && (
                <BeneficiariesTable
                  lists={approvedLists}
                  HandleClick={(list: listsWithMembers) => HandleClick(list)}
                />
              )}
              {activeTab === "rejected" && (
                <BeneficiariesTable
                  lists={rejectedLists}
                  HandleClick={(list: listsWithMembers) => HandleClick(list)}
                />
              )}
            </div>

            <div className="flex justify-between  items-center ">
              <div className="">
                <span className="font-normal text-[15px]  ">
                  Showing {currentLists?.length} of {Lists?.length} results
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
        )}
      </>
    </Layout>
  );
}

export default BeneficiariesPage;
