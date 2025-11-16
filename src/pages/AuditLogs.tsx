import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import {  Filter, Loader2 } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { AuditlogsTable } from "@/components/Client/Tables/AuditLogsTable";

import { useGetOrganizationLogs } from "@/lib/services/FetchOrganizationAuditLogs";

import { getAuthUser } from "@/lib/cookies/UserMangementCookie";
import Layout from "@/components/Commons/Layout";
import LogsDatePicker from "@/components/LogsPicker";

function AuditLogs() {
  // const [currentPage, setCurrentPage] = useState(1);

  const {
    totalPages,
    admin,
    employee,
    setCurrentPage,
    currentPage,
    system,
    auditLogsLoading,
    currentAuditLogs,
    clientLogs,
  } = useGetOrganizationLogs();

  const [startDate] = useState<string>("");
  const [endDate] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "all" | "admin" | "employee" | "system"
  >("all");
  const role_name = getAuthUser()?.role_name;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const dateFilteredLogs = useMemo(() => {
    if (!startDate || !endDate) return currentAuditLogs;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return currentAuditLogs.filter((tx) => {
      const txDate = new Date(tx.created_at);
      return txDate >= start && txDate <= end;
    });
  }, [currentAuditLogs, startDate, endDate, activeTab]);
  return (
    <Layout title="Audit Logs">
      <div className="flex flex-col mx-5 my-5">
        <div className="flex justify-between items-center">
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
                  All <span className="mx-1">({clientLogs.length})</span>
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

          <div className="flex items-center gap-2">
            {" "}
            <Button variant={"outline"}>
              <span>
                <Filter />
              </span>
              Filter
            </Button>
            <LogsDatePicker dateFilteredLogs={dateFilteredLogs} />
          </div>
        </div>

        {auditLogsLoading ? (
          <div className="flex justify-center items-center h-[50vh] w-full">
            <Loader2 />
          </div>
        ) : (
          <div className="my-5">
            {activeTab === "all" && (
              <AuditlogsTable
                auditlogs={currentAuditLogs}
                role_name={role_name}
              />
            )}

            {activeTab === "admin" && <AuditlogsTable auditlogs={admin} />}

            {activeTab === "employee" && (
              <AuditlogsTable auditlogs={employee} />
            )}

            {activeTab === "system" && <AuditlogsTable auditlogs={system} />}
          </div>
        )}

        <div className="flex justify-between  items-center ">
          <div className="">
            <span className="font-normal text-[15px]  ">
              Showing {currentAuditLogs.length} of {clientLogs.length} results
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

export default AuditLogs;
