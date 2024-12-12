import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";
import { ActionsPopover } from "../ActionsPopover";

export interface ILists {
  name: string;
  members: number;
  createdBy: string;
  createdAt: string;
  status?: string;
}

import { HiMiniUsers } from "react-icons/hi2";
import { getRandomColor } from "./MembersTable";

export interface IBeneficiariesTableProps {
  lists?: ILists[];
  list?: ILists;
  HandleClick?: () => void;
}
export function getStatusBadge(status: ILists["status"]) {
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
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-1">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <HiMiniUsers
                  style={{
                    fill: getRandomColor(),
                  }}
                />
              </span>

              {list.name}
            </TableCell>{" "}
            <TableCell>{list.members}</TableCell>
            {pathname === "/beneficiaries" && (
              <TableCell>
                <Badge
                  className={`border rounded-full py-1 px-1.5 text-[14px] ${getStatusBadge(list.status)}`}
                >
                  {list.status}{" "}
                </Badge>
              </TableCell>
            )}
            <TableCell className="">{list.createdBy}</TableCell>
            <TableCell>{list.createdAt}</TableCell>
            <TableCell>
              <ActionsPopover list={list} HandleClick={HandleClick} />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
