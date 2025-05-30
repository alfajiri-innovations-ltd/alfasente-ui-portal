import { ActionsPopover } from "@/components/Client/ActionsPopover";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IClient } from "@/lib/interfaces/interfaces";
import { formatDate } from "@/lib/Utilities/FormatDate";

import { FaRegUser } from "react-icons/fa";

export interface IUsersTableProps {
  organizations?: IClient[];
  organization?: IClient;
}
export function getStatusBadge(status: IClient["isApproved"]): string {
  switch (status) {
    case "Approved":
      return "bg-[#FFEAE9] text-[#A9302D] border-[#FFD9D7]";

    case "Rejected":
      return "bg-[#ECF8EF] text-[#308242] border-[#C5E9CD]";

    default:
      return "bg-[#FFEAE9] text-[#A9302D] border-[#FFD9D7]";
  }
}

const day = new Date();

export function OrganizationsTable({ organizations }: IUsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Organisation</TableHead>
          <TableHead>Contact Info</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="">Date Approved</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations?.map((org, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <FaRegUser />
              </span>

              {org.clientName}
            </TableCell>
            <TableCell>
              <span className="my-4"> {org.userId?.user_email}</span>
              <br />
              <span> {org.clientPhoneNumber}</span>
            </TableCell>
            <TableCell>{org.physicalAddress}</TableCell>
            <TableCell>
              <Badge
                className={`border rounded-full py-1 px-1.5 text-[14px] ${getStatusBadge(org.isApproved)}`}
              >
                {org.isApproved === "Approved" ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(day.toISOString())}</TableCell>
            <TableCell>
              <ActionsPopover />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
