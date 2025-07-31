import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, Loader } from "lucide-react";
import { PaginationDemo } from "@/components/Client/Pagination";
import { TransactionsTable } from "@/components/Client/Tables/TransactionsTable";
import Layout from "@/components/Commons/Layout";
import useTransactions from "@/hooks/useTransactions";
import { useClientBulkLists } from "@/lib/services/FectchBulkLists";

function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "all" | "deposit" | "success" | "sent" | "failed"
  >("all");
  const [activeState, setCurrentState] = useState<"all" | "bulk">("all");
  const tabRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  const {
    transactions,
    // totalPages,
    // currentTransactions,
    sent,
    deposit,
    success,
    failed,
    organizationLoading,
  } = useTransactions();

  const bulkTransactions = useClientBulkLists().data;



  const handlePageChange = (page: number) => {
    if (totalPages && page >= 1 && page <= totalPages) {
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

  const dataPool =
    activeState === "all"
      ? {
          all: transactions,
          deposit,
          sent,
          success,
          failed,
        }
      : {
          all: bulkTransactions,
          deposit: [],
          sent: [],
          success: [],
          failed: [],
        };

  const dataToRender = dataPool[activeTab];

  const transactionsPerPage = 8;

  const paginatedData = dataToRender?.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const totalPages = dataToRender
    ? Math.ceil(dataToRender.length / transactionsPerPage)
    : 0;

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
                    className={`cursor-pointer text-sm  py-2 relative z-10 ${
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
                    className={`cursor-pointer text-sm  py-2 relative z-10 ${
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
                <Button>
                  <Download /> <span>Export Records</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center p-1.5">
            <div className={`flex md:gap-2 text-[15px] font-medium  `}>
              {(activeState === "bulk"
                ? [{ key: "all", label: "All", data: dataPool.all }]
                : [
                    { key: "all", label: "All", data: dataPool.all },
                    {
                      key: "deposit",
                      label: "Deposited",
                      data: dataPool.deposit,
                    },
                    { key: "sent", label: "Sent", data: dataPool.sent },
                    // { key: "success", label: "Success", data: dataPool.success },
                    // { key: "failed", label: "Failed", data: dataPool.failed },
                  ]
              ).map(({ key, label, data }) => (
                <h4
                  key={key}
                  className={`cursor-pointer border text-sm text-[#5C6474] rounded-[6px] px-2 py-[2px] ${
                    activeTab === key
                      ? "text-[#1B2029] border-[#1B2029] font-semibold"
                      : "border-[#F7F9FD]"
                  }`}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                >
                  {label}{" "}
                  {data && <span className="mx-1">({data.length})</span>}
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
              transactions={paginatedData}
              activeState={activeState}
            />
          </div>
        )}

        <div className="flex justify-between items-center ">
          {dataToRender && transactions && (
            <span className="font-normal text-[15px]  w-full">
              Showing {paginatedData ? paginatedData.length : 0} of{" "}
              {dataToRender ? dataToRender.length : 0} results
            </span>
          )}
          {totalPages && (
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
