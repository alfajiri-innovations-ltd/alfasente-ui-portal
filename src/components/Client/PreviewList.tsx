import { useState } from "react";
import { PaginationDemo } from "./Pagination";

import { PreviewMembersTable } from "./Tables/PreviewMembersTable";

const members = [
  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },

  {
    name: "Nalweyiso Rashidah",
    reason: "Payment for services",
    amount: 1000000,
    mobileMoneyNumber: "+256788210793",
  },
];
function PreviewList() {
  const [currentPage, setCurrentPage] = useState(1);

  const MembersPerPage = 5;

  const totalPages = Math.ceil(members.length / MembersPerPage);
  const currentMembers = members.slice(
    (currentPage - 1) * MembersPerPage,
    currentPage * MembersPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className=" my-3">
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-2 m">
          <span className="font-semibold text-xl">
            {" "}
            Preview sheet2024 list{" "}
          </span>
        </div>
      </div>

      <PreviewMembersTable members={currentMembers} />

      <div className="flex justify-between  items-center my-1 ">
        <div className="">
          <span className="font-normal text-[15px]  ">
            Showing {currentMembers.length} of {members.length} results
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
  );
}

export default PreviewList;
