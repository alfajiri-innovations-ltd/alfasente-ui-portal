import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Download, Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { AuditlogsTable } from "@/components/Client/Tables/AuditLogsTable";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetOrganizationLogs } from "@/lib/services/FetchOrganizationAuditLogs";
import { getAuthUser } from "@/lib/cookies/UserMangementCookie";

function AuditLogs() {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<
    "all" | "admin" | "employee" | "system"
  >("all");
  const auditlogs = GetOrganizationLogs();

  const AuditLogsPerPage = 8;

  const role_name = getAuthUser().role_name;

  const totalPages = Math.ceil(auditlogs.length / AuditLogsPerPage);
  const currentauditlogs = auditlogs.slice(
    (currentPage - 1) * AuditLogsPerPage,
    currentPage * AuditLogsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const admin = auditlogs.filter(
    (auditlog) => auditlog.role === "client_admin"
  );
  const employee = auditlogs.filter(
    (auditlog) => auditlog.role === "client_employee"
  );
  const system = auditlogs.filter((auditlog) => auditlog.role === "System");

  return (
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4 bg-white">
        <DashboardHeader PageTitle="Audit Logs" />

        <div className="flex flex-col mx-5 my-5">
          <div className="flex justify-between items-center">
            {role_name === "admin" ? (
              <>
                <Select>
                  <SelectTrigger className="min-w-[180px] w-[200px]">
                    <SelectValue placeholder="All Organisations (20)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Organizations</SelectLabel>
                      <SelectItem value="kcb">KCB Bank</SelectItem>
                      <SelectItem value="equity">Equity Bank</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
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

                    <h4
                      className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                        activeTab === "system"
                          ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                          : "  border-[#F7F9FD]"
                      }  px-2 py-[2px]`}
                      onClick={() => setActiveTab("system")}
                    >
                      System
                      <span className="mx-1">({system.length})</span>
                    </h4>
                  </div>
                </div>
              </>
            )}

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
              <AuditlogsTable
                auditlogs={currentauditlogs}
                role_name={role_name}
              />
            )}

            {activeTab === "admin" && <AuditlogsTable auditlogs={admin} />}

            {activeTab === "employee" && (
              <AuditlogsTable auditlogs={employee} />
            )}

            {activeTab === "system" && <AuditlogsTable auditlogs={system} />}
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
