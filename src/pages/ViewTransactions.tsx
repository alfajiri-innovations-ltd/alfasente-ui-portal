import { PaginationDemo } from "@/components/Client/Pagination";
import { TransactionsTable } from "@/components/Client/Tables/TransactionsTable";

import Layout from "@/components/Commons/Layout";
import {  useBulkTransactions } from "@/lib/services/GetBulkListById";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ViewTransactionsPage() {
  const { id } = useParams();

  console.log(id);
  const parsedListId = parseInt(id || "", 10);

  const [currentPage, setCurrentPage] = useState(1);

  const {transactions} = useBulkTransactions(parsedListId);

  

  const MembersPerPage = 8;


  const totalPages = Math.ceil((transactions?.length ?? 0) / MembersPerPage);
  const currentMembers = transactions.slice(
    (currentPage - 1) * MembersPerPage,
    currentPage * MembersPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Layout title="Transactions">
      <div className="mx-5 my-3">
        <div
          className="text-primary cursor-pointer flex items-center gap-2"
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-semibold text-base">Back to all payments</span>
        </div>

        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-2 m">
            <span className="font-semibold text-xl capitalize">
              {" "}
              {/* {list?.list?.name} ({transactions?.length}) */}
            </span>
            {/* <Badge
              variant={"outline"}
              className={`p-1.5 rounded-full capitalize ${getStatusBadge(list?.list?.status)}`}
            >
              {list?.list?.status}
            </Badge> */}
          </div>
        </div>

        <TransactionsTable transactions={transactions ?? undefined} />

        {/* <MembersTable members={currentMembers} /> */}

        <div className="flex justify-between  items-center my-1 ">
          <div className="">
            <span className="font-normal text-[15px]  ">
              Showing {currentMembers?.length} of {transactions?.length} results
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

export default ViewTransactionsPage;
