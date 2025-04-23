import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";

import { OrganizationsTable } from "@/components/Admin/Tables/OrganisationsTable";
import { GetClients } from "@/lib/services/FetchAllOrganizations";
import { AddOrganisation } from "@/components/Admin/AddOrganisation";

// const organizations = [
//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     phoneNumber: "+256707444764",
//     address: "Kawempe TTula",

//     status: "Active",
//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },

//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     address: "Kawempe TTula",

//     status: "Active",
//     phoneNumber: "+256707444764",

//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },
//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     address: "Kawempe TTula",

//     phoneNumber: "+256707444764",

//     status: "Active",
//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },
//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     phoneNumber: "+256707444764",
//     address: "Kawempe TTula",

//     status: "Active",
//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },
//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     status: "Active",
//     phoneNumber: "+256707444764",
//     address: "Kawempe TTula",

//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },

//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     status: "Inactive",
//     phoneNumber: "+256707444764",
//     address: "Kawempe TTula",

//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },
//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     status: "Active",
//     phoneNumber: "+256707444764",
//     address: "Kawempe TTula",

//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },
//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     status: "Inactive",
//     phoneNumber: "+256707444764",
//     address: "Kawempe TTula",

//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },
//   {
//     name: "George Kizza",
//     email: "georgekizza@gmail.com",
//     status: "Active",
//     phoneNumber: "+256707444764",
//     address: "Kawempe TTula",

//     dateApproved: "30 Nov, 2024 11:25 AM",
//   },
// ];
function Organisations() {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "admin" | "inactive" | "employee"
  >("all");
  const organizations = GetClients();
  const approvedOrganizations = organizations.filter(org => org?.isApproved === "Approved");

  console.log(organizations);
  const organizationsPerPage = 8;

  const totalPages = Math.ceil(approvedOrganizations.length / organizationsPerPage);
  const currentorganizations = approvedOrganizations.slice(
    (currentPage - 1) * organizationsPerPage,
    currentPage * organizationsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const active = approvedOrganizations.filter((org) => org.isApproved);
  const inactive = approvedOrganizations.filter((org) => !org.isApproved);

  return (
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4 bg-white">
        <DashboardHeader PageTitle="Organisations" />

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
                  All <span className="mx-1">({approvedOrganizations.length})</span>
                </h4>

                <h4
                  className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                    activeTab === "active"
                      ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                      : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                  onClick={() => setActiveTab("active")}
                >
                  Active
                  <span className="mx-1">({active.length})</span>
                </h4>
                <h4
                  className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                    activeTab === "inactive"
                      ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                      : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                  onClick={() => setActiveTab("inactive")}
                >
                  Inactive
                  <span className="mx-1">({inactive.length})</span>
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
              <AddOrganisation />
            </div>
          </div>

          <div className="my-5">
            {activeTab === "all" && (
              <OrganizationsTable organizations={approvedOrganizations} />
            )}
            {activeTab === "active" && (
              <OrganizationsTable organizations={active} />
            )}
            {activeTab === "inactive" && (
              <OrganizationsTable organizations={inactive} />
            )}
          </div>

          <div className="flex justify-between  items-center ">
            <div className="">
              <span className="font-normal text-[15px]  ">
                Showing {currentorganizations.length} of {organizations.length}{" "}
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
      </main>
    </div>
  );
}

export default Organisations;
