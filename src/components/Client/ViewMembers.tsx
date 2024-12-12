import { ArrowLeft } from "lucide-react";
import { getStatusBadge, ILists } from "./Tables/BeneficiariesTables";
import { Badge } from "../ui/badge";
import { MembersTable } from "./Tables/MembersTable";
import { useState } from "react";
import { PaginationDemo } from "./Pagination";
import { ApproveList } from "./ApproveList";
import { RejectList } from "./RejectList";

interface IViewProps {
  CloseView: () => void;
  list?: ILists;
}

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
function ViewMembers({ CloseView }: IViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const MembersPerPage = 8;

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
    <div className="mx-5 my-3">
      <div
        className="text-primary cursor-pointer flex items-center gap-2"
        onClick={CloseView}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-semibold text-base">Back to all lists</span>
      </div>

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-2 m">
          <span className="font-semibold text-xl">
            {" "}
            Kizza Enterprises Staff 2024 (100)
          </span>
          <Badge
            variant={"outline"}
            className={`p-1.5 rounded-full ${getStatusBadge("Pending")}`}
          >
            Pending
          </Badge>
        </div>
        <div className="flex items-center justify-self-end gap-3">
          <RejectList />
          <ApproveList />
        </div>{" "}
      </div>

      <MembersTable members={currentMembers} />

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

export default ViewMembers;
