import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Filter, Loader2 } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { UsersTable } from "@/components/Client/Tables/UsersTable";
import { InviteStaff } from "@/components/Client/InviteStaffDialog";
import Layout from "@/components/Commons/Layout";
import useStaff from "@/hooks/useStaff";

function Staff() {
  const {
    staffData,
    totalPages,
    setCurrentPage,
    staffLoading,
    currentPage,
    currentUsers,
    active,
    inactive,
    admin,
    employee,
  } = useStaff();

  const [activeTab, setActiveTab] = useState<
    "all" | "makers" | "admin" | "checkers" | "employee"
  >("all");

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Layout title="Staff">
      <div className="flex flex-col mx-5 my-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center p-1.5 justify-center">
            <div className="flex sm:flex-row flex-col md:gap-2  text-[15px] font-medium">
              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "all"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("all")}
              >
                All <span className="mx-1">({staffData.length})</span>
              </h4>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "makers"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("makers")}
              >
                Makers
                <span className="mx-1">({active.length})</span>
              </h4>
              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "checkers"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("checkers")}
              >
                Checkers
                <span className="mx-1">({inactive.length})</span>
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

          <div className="flex sm:flex-row flex-col items-center gap-2">
            {" "}
            <Button variant={"outline"}>
              <span>
                <Filter />
              </span>
              Filter
            </Button>
            <InviteStaff />
          </div>
        </div>

        {staffLoading ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <Loader2 />
            </div>
          </>
        ) : (
          <div className="my-5">
            {activeTab === "all" && <UsersTable users={currentUsers} />}
            {activeTab === "makers" && <UsersTable users={active} />}
            {activeTab === "checkers" && <UsersTable users={inactive} />}
            {activeTab === "admin" && <UsersTable users={admin} />}

            {activeTab === "employee" && <UsersTable users={employee} />}
          </div>
        )}
        <div className="flex justify-between  items-center ">
          <div className="">
            <span className="font-normal text-[15px]  ">
              Showing {currentUsers.length} of {staffData.length} results
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

export default Staff;
