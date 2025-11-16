import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {  Filter, Loader } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { TransactionsTable } from "@/components/Client/Tables/TransactionsTable";
import Layout from "@/components/Commons/Layout";
import useTransactions from "@/hooks/useTransactions";
import { useClientBulkLists } from "@/lib/services/FectchBulkLists";
import DatePicker from "@/components/DatePicker";
import { BulkList, ITransaction } from "@/lib/interfaces/interfaces";

function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "all" | "deposit" | "success" | "sent" | "failed"
  >("all");
  const [activeState, setCurrentState] = useState<"all" | "bulk">("all");

  const tabRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  // FIXED: allow date setting
  const [startDate] = useState<string>("");
  const [endDate] = useState<string>("");

  const { transactions, sent, deposit, success, failed, organizationLoading } =
    useTransactions();

  const bulkTransactions = useClientBulkLists().data;

  // FIXED: Base filter - applies tab filters first
  const filteredTransactions = useMemo(() => {
    const dataPool =
      activeState === "all"
        ? { all: transactions, deposit, sent, success, failed }
        : {
            all: bulkTransactions,
            deposit: [],
            sent: [],
            success: [],
            failed: [],
          };

    return dataPool[activeTab] ?? [];
  }, [transactions, bulkTransactions, activeTab, activeState]);

  const getTransactionDate = (tx: ITransaction | BulkList) => {
    if (activeState === "all") {
      return new Date((tx as ITransaction).recordDate);
    }

    // bulk transactions
    return new Date((tx as BulkList).createdAt);
  };

  const dateFilteredTransactions = useMemo(() => {
    if (!startDate || !endDate) return filteredTransactions;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return filteredTransactions.filter((tx) => {
      const txDate = getTransactionDate(tx);
      return txDate >= start && txDate <= end;
    });
  }, [filteredTransactions, startDate, endDate, activeState]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const el = tabRefs.current[activeState];
      if (el) {
        const { offsetLeft, offsetWidth } = el;
        setHighlightStyle({ left: offsetLeft, width: offsetWidth });
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [activeState, transactions]);

  const transactionsPerPage = 8;

  const paginatedData = dateFilteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const totalPages = Math.ceil(
    dateFilteredTransactions.length / transactionsPerPage
  );

  const typedPaginatedData =
    activeState === "all"
      ? (paginatedData as ITransaction[])
      : (paginatedData as BulkList[]);

  return (
    <Layout title="Transactions">
      <div className="flex flex-col mx-5 my-5">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="flex items-center py-1.5 justify-between md:gap-80 w-full">
              {transactions && (
                <div className="relative flex md:gap-20 text-[15px] font-medium border-b grow border-gray-300">
                  <div
                    className="absolute bottom-0 h-[2px] bg-[#B66FCF] transition-all duration-300"
                    style={{
                      left: highlightStyle.left,
                      width: highlightStyle.width,
                    }}
                  />
                  <h4
                    ref={(el) => (tabRefs.current["all"] = el)}
                    className={`cursor-pointer text-sm py-2 ${
                      activeState === "all"
                        ? "text-[#1B2029] font-semibold"
                        : "text-[#5C6474]"
                    }`}
                    onClick={() => setCurrentState("all")}
                  >
                    All transactions
                  </h4>
                  <h4
                    ref={(el) => (tabRefs.current["bulk"] = el)}
                    className={`cursor-pointer text-sm py-2 ${
                      activeState === "bulk"
                        ? "text-[#1B2029] font-semibold"
                        : "text-[#5C6474]"
                    }`}
                    onClick={() => setCurrentState("bulk")}
                  >
                    Bulk Payments
                  </h4>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button variant={"outline"}>
                  <Filter /> Filter
                </Button>

                <DatePicker
                 dateFilteredTransactions={dateFilteredTransactions}
                />
              </div>
            </div>
          </div>

          {/* TAB FILTERING */}
          <div className="flex items-center p-1.5">
            <div className={`flex md:gap-2 text-[15px] font-medium`}>
              {(activeState === "bulk"
                ? [{ key: "all", label: "All", data: filteredTransactions }]
                : [
                    { key: "all", label: "All", data: filteredTransactions },
                    { key: "deposit", label: "Deposited", data: deposit },
                    { key: "sent", label: "Sent", data: sent },
                  ]
              ).map(({ key, label, data }) => (
                <h4
                  key={key}
                  className={`cursor-pointer border text-sm rounded-[6px] px-2 py-[2px] ${
                    activeTab === key
                      ? "text-[#1B2029] border-[#1B2029] font-semibold"
                      : "text-[#5C6474] border-[#F7F9FD]"
                  }`}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                >
                  {label} {data && <span>({data.length})</span>}
                </h4>
              ))}
            </div>
          </div>
        </div>

        {organizationLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="my-5">
            <TransactionsTable
              transactions={typedPaginatedData}
              activeState={activeState}
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="font-normal text-[15px] w-full">
            Showing {paginatedData.length} of {dateFilteredTransactions.length}{" "}
            results
          </span>

          {totalPages > 1 && (
            <PaginationDemo
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Transactions;
