import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Download, Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import Layout from "@/components/Commons/Layout";
import { GetTransactions } from "@/lib/services/FetchAllTranscations";
import { TransactionsTable } from "@/components/Admin/Tables/TransationsTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ManualTransactions() {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<
    "all" | "deposit" | "success" | "sent" | "failed"
  >("all");

  const [activeState, setActiveState] = useState("Requests");

  const transactions = GetTransactions();

  const FilteredTransactons = transactions.filter(
    (transaction) => transaction.transactionType === "Manual Transaction"
  );

  console.log(FilteredTransactons);

  const transactionsPerPage = 8;

  const totalPages = Math.ceil(
    FilteredTransactons.length / transactionsPerPage
  );
  const currenttransactions = FilteredTransactons.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

//   const all = FilteredTransactons.filter(
//     (transaction) => transaction.transactionType === "Disbursement Transaction"
//   );
  const pending = FilteredTransactons.filter(
    (transaction) => transaction.status === "pending"
  );
  const success = FilteredTransactons.filter(
    (transaction) => transaction.status === "SUCCESSFUL"
  );

  return (
    <Layout title="Manual Top-up">
      <div className="flex flex-col mx-5 my-5">
        <div className="relative">
          <div className="flex gap-10 text-[15px] py-2">
            {["Requests", "Approvals"].map((tab) => (
              <div key={tab} className="relative">
                <h4
                  className={`cursor-pointer ${
                    activeTab === tab ? " font-semibold" : ""
                  }`}
                  onClick={() => setActiveState(tab)}
                >
                  {tab}
                </h4>

                {activeState === tab && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-full h-[3px] bg-[#B66FCF] rounded-full"></div>
                )}
              </div>
            ))}
          </div>
          <hr className="border-gray-300 " />
        </div>
        <div className="flex justify-between items-center my-5">
          <div className="flex  items-center p-1.5 justify-center">
            <div className="flex  md:gap-2  text-[15px] font-medium">
              <div onClick={() => setActiveTab("all")}>
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
              </div>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "deposit"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("deposit")}
              >
                Pending
                <span className="mx-1">({pending.length})</span>
              </h4>
              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "sent"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("sent")}
              >
                Initiated
                <span className="mx-1">({success.length})</span>
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
              <span>Export Records</span>
            </Button>{" "}
          </div>
        </div>

        <div className="my-5">
          {activeTab === "all" && (
            <TransactionsTable transactions={currenttransactions} />
          )}
          {activeTab === "deposit" && (
            <TransactionsTable transactions={pending} />
          )}
          {activeTab === "success" && (
            <TransactionsTable transactions={success} />
          )}
        </div>

        <div className="flex justify-between  items-center ">
          <div className="">
            <span className="font-normal text-[15px]  ">
              Showing {currenttransactions.length} of{" "}
              {FilteredTransactons.length} results
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

export default ManualTransactions;
