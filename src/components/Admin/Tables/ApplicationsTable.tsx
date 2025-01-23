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

export interface IApplications {
  user_name: string;
  status: string;
  createdAt: string;

  organization: string;
  email: string;
}

import { HiMiniUsers } from "react-icons/hi2";

export interface ApplicationsTable {
  applications?: IApplications[];
  application?: IApplications;
}

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
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <HiMiniUsers />
              </span>

              {application.user_name}
            </TableCell>
            <TableCell>{application.organization}</TableCell>
            <TableCell>{application.email}</TableCell>

            <TableCell>
              <Badge
                variant={"outline"}
                className={`border ${getStatusBadge(application.status)} capitalize rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
              >
                
                {application.status}
              </Badge>{" "}
            </TableCell>

            <TableCell>{application.createdAt}</TableCell>
            <TableCell>
              <ActionsPopover />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
