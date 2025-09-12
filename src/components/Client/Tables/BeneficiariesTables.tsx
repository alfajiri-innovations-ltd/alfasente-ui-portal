import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation, useNavigate } from "react-router-dom";
import { ActionsPopover } from "../ActionsPopover";

import { HiMiniUsers } from "react-icons/hi2";
import { getRandomColor } from "./MembersTable";
import { IList, listsWithMembers } from "@/lib/interfaces/interfaces";
import { formatDate } from "@/lib/Utilities/FormatDate";

export interface IBeneficiariesTableProps {
  lists?: listsWithMembers[];
  list?: listsWithMembers;
  HandleClick?: (list: listsWithMembers) => void;
}
export function getStatusBadge(status: IList["status"] | undefined) {
  switch (status) {
    case "Rejected":
      return "bg-[#FFEAE9] text-[#A9302D] border-[#FFD9D7]";

    case "Approved":
      return "bg-[#ECF8EF] text-[#308242] border-[#C5E9CD]";

    case "Pending":
      return "bg-[#FFECD1] text-[#B46600] border-[#FFDDB1]";

    default:
      return "bg-red-100 text-red-500";
  }
}
export function BeneficiariesTable({
  lists,
  HandleClick,
}: IBeneficiariesTableProps) {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Members</TableHead>
          {pathname === "/beneficiaries" && <TableHead>Status</TableHead>}
          <TableHead>Created By</TableHead>
          <TableHead className="">Date Ceated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lists?.map((list, index) => (
          <TableRow
            className="cursor-pointer hover:bg-[#F5F6F9] transition-all duration-200"
            key={index}
          >
            <TableCell
              className="font-medium flex items-center gap-1.5 "
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/view-members/${list.id}`);
              }}
            >
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <HiMiniUsers
                  style={{
                    fill: getRandomColor(),
                  }}
                />
              </span>

              <span className="capitalize"> {list.name}</span>
            </TableCell>{" "}
            <TableCell>{list.members.length}</TableCell>
            {pathname === "/beneficiaries" && (
              <TableCell>
                <Badge
                  className={`border rounded-full capitalize py-1 px-1.5 text-[14px] ${getStatusBadge(list.status)}`}
                >
                  {list.status}{" "}
                </Badge>
              </TableCell>
            )}
            <TableCell className="">{list.createdBy}</TableCell>
            <TableCell>{formatDate(list.createdAt)}</TableCell>
            <TableCell>
              <ActionsPopover
                list={list}
                HandleClick={() => HandleClick?.(list)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
