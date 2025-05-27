import DashboardHeader from "@/components/Client/Dashboard-Header";
import SideBar from "@/components/Client/SideBar";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Download, Filter } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { TransactionsTable } from "@/components/Client/Tables/TransactionsTable";
import { GetOrganizationTransactions } from "@/lib/services/FectchTransactionsByOrganization";
import Layout from "@/components/Commons/Layout";

// const transactions = [
//   {
//     transactionType: "Sent",
//     receipient: "Kalule Michael",
//     status: "Success",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
//   {
//     transactionType: "Sent",
//     receipient: "Kalule Michael",
//     status: "Success",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
//   {
//     transactionType: "Sent",
//     receipient: "Kalule Michael",
//     status: "Success",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
//   {
//     transactionType: "Sent",
//     receipient: "Kalule Michael",
//     status: "Success",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
//   {
//     transactionType: "Deposit",
//     receipient: "Kalule Michael",
//     status: "Success",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },

//   {
//     transactionType: "Deposit",
//     receipient: "Kalule Michael",
//     status: "Success",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
//   {
//     transactionType: "Deposit",
//     receipient: "Kalule Michael",
//     status: "Success",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
//   {
//     transactionType: "Deposit",
//     receipient: "Kalule Michael",
//     status: "Failed",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
//   {
//     transactionType: "Deposit",
//     receipient: "Kalule Michael",
//     status: "Failed",
//     createdAt: "30 Nov, 2024 11:25 AM",
//     amount: 1000000,
//   },
// ];
function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<
    "all" | "deposit" | "success" | "sent" | "failed"
  >("all");

  const transactions = GetOrganizationTransactions();

  console.log(transactions);

  const transactionsPerPage = 8;

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const currenttransactions = transactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const sent = transactions.filter(
    (transaction) => transaction.transactionType === "Disbursement Transaction"
  );
  const deposit = transactions.filter(
    (transaction) => transaction.transactionType === "Collection Transaction"
  );
  const success = transactions.filter(
    (transaction) => transaction.status === "SUCCESSFUL"
  );
  const failed = transactions.filter(
    (transaction) => transaction.status !== "SUCCESSFUL"
  );

  return (
    <Layout title="Transactions">
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
                All <span className="mx-1">({transactions.length})</span>
              </h4>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "deposit"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("deposit")}
              >
                Deposited
                <span className="mx-1">({deposit.length})</span>
              </h4>
              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "sent"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("sent")}
              >
                Sent
                <span className="mx-1">({sent.length})</span>
              </h4>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "success"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("success")}
              >
                Success
                <span className="mx-1">({success.length})</span>
              </h4>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${
                  activeTab === "failed"
                    ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                    : "  border-[#F7F9FD]"
                }  px-2 py-[2px]`}
                onClick={() => setActiveTab("failed")}
              >
                Failed
                <span className="mx-1">({failed.length})</span>
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
            <TransactionsTable transactions={deposit} />
          )}
          {activeTab === "sent" && <TransactionsTable transactions={sent} />}
          {activeTab === "success" && (
            <TransactionsTable transactions={success} />
          )}

          {activeTab === "failed" && (
            <TransactionsTable transactions={failed} />
          )}
        </div>

        <div className="flex justify-between  items-center ">
          <div className="">
            <span className="font-normal text-[15px]  ">
              Showing {currenttransactions.length} of {transactions.length}{" "}
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

export default Transactions;
