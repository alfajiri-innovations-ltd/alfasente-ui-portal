import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Filter, Plus } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { UsersTable } from "@/components/Client/Tables/UsersTable";
import { InviteStaff } from "@/components/Client/InviteStaffDialog";

const users = [
  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Active",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },

  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Active",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Active",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Active",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_employee",
  },
  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Active",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },

  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Inactive",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_employee",
  },
  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Active",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Inactive",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_admin",
  },
  {
    user_name: "George Kizza",
    email: "georgekizza@gmail.com",
    status: "Active",
    createdAt: "30 Nov, 2024 11:25 AM",
    role: "client_employee",
  },
];
function Staff() {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<
    "all" | "active" | "admin" | "inactive" | "employee"
  >("all");

  const UsersPerPage = 8;

  const totalPages = Math.ceil(users.length / UsersPerPage);
  const currentusers = users.slice(
    (currentPage - 1) * UsersPerPage,
    currentPage * UsersPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const active = users.filter((user) => user.status === "Active");
  const inactive = users.filter((user) => user.status === "Inactive");
  const admin = users.filter((user) => user.role === "client_admin");
  const employee = users.filter((user) => user.role === "client_employee");

  return (
    <div className="grid grid-cols-5 h-screen">
      <SideBar />
      <main className="col-span-4 bg-white">
        <DashboardHeader PageTitle="Staff" />

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
                  All <span className="mx-1">({users.length})</span>
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
              <InviteStaff/>
            </div>
          </div>

          <div className="my-5">
            {activeTab === "all" && <UsersTable users={currentusers} />}
            {activeTab === "active" && <UsersTable users={active} />}
            {activeTab === "inactive" && <UsersTable users={inactive} />}
            {activeTab === "admin" && <UsersTable users={admin} />}

            {activeTab === "employee" && <UsersTable users={employee} />}
          </div>

          <div className="flex justify-between  items-center ">
            <div className="">
              <span className="font-normal text-[15px]  ">
                Showing {currentusers.length} of {users.length} results
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

export default Staff;
