

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Download, Filter, Loader } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { TransactionsTable } from "@/components/Client/Tables/TransactionsTable";
// import { GetOrganizationTransactions } from "@/lib/services/FectchTransactionsByOrganization";
import Layout from "@/components/Commons/Layout";
import useTransactions from "@/hooks/useTransactions";


function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState<
    "all" | "deposit" | "success" | "sent" | "failed"
  >("all");
  const { transactions, totalPages, currentTransactions, sent, deposit, success, failed, organizationLoading } = useTransactions();

  const handlePageChange = (page: number) => {
    if (totalPages) {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    }
  };


  return (
    <Layout title="Transactions">
      <div className="flex flex-col mx-5 my-5">
        <div className="flex justify-between items-center">
          <div className="flex  items-center p-1.5 justify-center">
            {transactions && (<div className="flex  md:gap-2  text-[15px] font-medium">
              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${activeTab === "all"
                  ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                  : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                onClick={() => setActiveTab("all")}
              >
                All <span className="mx-1">({transactions.length})</span>
              </h4>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${activeTab === "deposit"
                  ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                  : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                onClick={() => setActiveTab("deposit")}
              >
                Deposited
                {deposit && (<span className="mx-1">({deposit.length})</span>)}
              </h4>
              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${activeTab === "sent"
                  ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                  : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                onClick={() => setActiveTab("sent")}
              >
                Sent
                {sent && (<span className="mx-1">({sent.length})</span>)}
              </h4>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${activeTab === "success"
                  ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                  : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                onClick={() => setActiveTab("success")}
              >
                Success
                {success && (<span className="mx-1">({success.length})</span>)}
              </h4>

              <h4
                className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px]  ${activeTab === "failed"
                  ? "text-[#1B2029]  border-[#1B2029]   rounded-[6px] font-semibold"
                  : "  border-[#F7F9FD]"
                  }  px-2 py-[2px]`}
                onClick={() => setActiveTab("failed")}
              >
                Failed
                {failed && (<span className="mx-1">({failed.length})</span>)}
              </h4>
            </div>)}
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

        {organizationLoading ? (
          <>
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          </>
        ) : (<div className="my-5">
          {activeTab === "all" && (
            <TransactionsTable transactions={currentTransactions} />
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
        </div>)}

        <div className="flex justify-between  items-center ">
          <div className="">
            {currentTransactions && transactions && (<span className="font-normal text-[15px]  ">
              Showing {currentTransactions.length} of {transactions.length}{" "}
              results
            </span>)}
          </div>
          <div className="">
            {totalPages && (<PaginationDemo
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />)}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Transactions;
