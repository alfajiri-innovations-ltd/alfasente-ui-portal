import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Download, Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { AuditlogsTable } from "@/components/Client/Tables/AuditLogsTable";

const auditlogs = [
  {
    user_name: "George Kizza",
    event: "georgekizza@gmail.com",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },

  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_employee",
  },
  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },

  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    status: "Inactive",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_employee",
  },
  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    status: "Inactive",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    event: "Invited Sarah to the platform",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_employee",
  },
];
function AuditLogs() {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<"all" | "admin" | "employee">(
    "all",
  );

  const AuditLogsPerPage = 8;

  const totalPages = Math.ceil(auditlogs.length / AuditLogsPerPage);
  const currentauditlogs = auditlogs.slice(
    (currentPage - 1) * AuditLogsPerPage,
    currentPage * AuditLogsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const admin = auditlogs.filter(
    (auditlog) => auditlog.role === "client_admin",
  );
  const employee = auditlogs.filter(
    (auditlog) => auditlog.role === "client_employee",
  );

  return (
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4 bg-white">
        <DashboardHeader PageTitle="Audit Logs" />

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
                  All <span className="mx-1">({auditlogs.length})</span>
                </h4>

                <h4
                  className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                    activeTab === "admin"
                      ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                      : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                  onClick={() => setActiveTab("admin")}
                >
                  Admin
                  <span className="mx-1">({admin.length})</span>
                </h4>

                <h4
                  className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                    activeTab === "employee"
                      ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                      : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                  onClick={() => setActiveTab("employee")}
                >
                  Employees
                  <span className="mx-1">({employee.length})</span>
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
                <span>Export Logs</span>
              </Button>{" "}
            </div>
          </div>

          <div className="my-5">
            {activeTab === "all" && (
              <AuditlogsTable auditlogs={currentauditlogs} />
            )}

            {activeTab === "admin" && <AuditlogsTable auditlogs={admin} />}

            {activeTab === "employee" && (
              <AuditlogsTable auditlogs={employee} />
            )}
          </div>

          <div className="flex justify-between  items-center ">
            <div className="">
              <span className="font-normal text-[15px]  ">
                Showing {currentauditlogs.length} of {auditlogs.length} results
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

export default AuditLogs;
