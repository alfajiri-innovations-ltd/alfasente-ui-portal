import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionsPopover } from "../ActionsPopover";

export interface IAuditLogs {
  user_name: string;
  role: string;
  createdAt: string;
  event: string;
}

import { HiMiniUsers } from "react-icons/hi2";
import { getRole } from "./UsersTable";

export interface IAuditLogsTable {
  auditlogs?: IAuditLogs[];
  auditlog?: IAuditLogs;
}

export function AuditlogsTable({ auditlogs }: IAuditLogsTable) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Staff</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Event</TableHead>

          <TableHead className="">Date Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {auditlogs?.map((auditlog, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-1">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <HiMiniUsers />
              </span>

              {auditlog.user_name}
            </TableCell>

            <TableCell>
              {" "}
              <Badge
                variant={"outline"}
                className={`border rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
              >
                <div
                  className={`${getRole(auditlog.role)} h-2 w-2 rounded-full`}
                ></div>
                {auditlog.role === "client_admin" ? "Admin" : "Employee"}
              </Badge>
            </TableCell>
            <TableCell>{auditlog.event}</TableCell>

            <TableCell>{auditlog.createdAt}</TableCell>
            <TableCell>
              <ActionsPopover />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
