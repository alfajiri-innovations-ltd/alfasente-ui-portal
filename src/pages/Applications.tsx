import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Download, Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { ApplicationsTable } from "@/components/Admin/Tables/ApplicationsTable";
import { GetClients } from "@/lib/services/FetchAllOrganizations";
import Layout from "@/components/Commons/Layout";

// const applications = [
//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Pending",
//     organization:'KCB Bank'
//   },

//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Approved",
//     organization:'KCB Bank'
//   },
//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Rejected",
//     organization:'KCB Bank'
//   },
//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Pending",
//     organization:'KCB Bank'
//   },
//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Pending",
//     organization:'KCB Bank'
//   },

//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Approved",
//     organization:'KCB Bank'
//   },
//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Pending",
//     organization:'KCB Bank'
//   },
//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Pending",
//     organization:'KCB Bank'
//   },
//   {
//     user_name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     status : "Pending",
//     organization:'KCB Bank'
//   },
// ];
function ApplicationsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const applications = GetClients();

  console.log(applications);
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "rejected" | "approved"
  >("all");

  const ApplicationsPerPage = 8;

  const totalPages = Math.ceil(applications.length / ApplicationsPerPage);
  const currentapplications = applications.slice(
    (currentPage - 1) * ApplicationsPerPage,
    currentPage * ApplicationsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const rejectedappplications = applications?.filter(
    (application) => application.isApproved === "Rejected",
  );
  const pendingapplications = applications.filter(
    (application) => application.isApproved === "Pending",
  );
  const approvedapplications = applications.filter(
    (application) => application.isApproved === "Approved",
  );
  return (
    <Layout title="Applications">
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
                All <span className="mx-1">({applications.length})</span>
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
                <span className="mx-1">({pendingapplications.length})</span>
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
                <span className="mx-1">({approvedapplications.length})</span>
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
                <span className="mx-1">({rejectedappplications.length})</span>
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
            <Button>
              <Download />
              <span>Export </span>
            </Button>{" "}
          </div>
        </div>

        <div className="my-5">
          {activeTab === "all" && (
            <ApplicationsTable applications={currentapplications} />
          )}

          {activeTab === "pending" && (
            <ApplicationsTable applications={pendingapplications} />
          )}

          {activeTab === "rejected" && (
            <ApplicationsTable applications={rejectedappplications} />
          )}
          {activeTab === "approved" && (
            <ApplicationsTable applications={approvedapplications} />
          )}
        </div>

        <div className="flex justify-between  items-center ">
          <div className="">
            <span className="font-normal text-[15px]  ">
              Showing {currentapplications.length} of {applications.length}{" "}
              results
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
    </Layout>
  );
}

export default ApplicationsPage;
