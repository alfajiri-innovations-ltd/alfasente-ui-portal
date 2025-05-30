import { ActionsPopover } from "@/components/Client/ActionsPopover";
import { getStatusBadge } from "@/components/Client/Tables/BeneficiariesTables";
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

import { HiMiniUsers } from "react-icons/hi2";

export interface ApplicationsTable {
  applications?: IClient[];
  application?: IClient;
}
const day = new Date();

export function ApplicationsTable({ applications }: ApplicationsTable) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">User</TableHead>
          <TableHead>Organisation</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="">Date Submitted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications?.map((application, index) => (
          <TableRow
            key={index}
            className="h-[50px] odd:bg-[#F7F9FD] even:bg-[#FBFDFF]"
          >
            <TableCell className="font-medium flex items-center gap-1">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center gap-1 items-center p-1.5">
                <HiMiniUsers />
              </span>

              {application.userId?.firstName}
              {application.userId?.lastName}
            </TableCell>
            <TableCell>{application.clientName}</TableCell>
            <TableCell>{application.clientEmail}</TableCell>

            <TableCell>
              <Badge
                variant={"outline"}
                className={`border ${getStatusBadge(application?.isApproved)} capitalize rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
              >
                {application.isApproved}
              </Badge>{" "}
            </TableCell>

            <TableCell>{formatDate(day.toISOString())}</TableCell>
            <TableCell>
              <ActionsPopover clientID={application.clientID} />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
