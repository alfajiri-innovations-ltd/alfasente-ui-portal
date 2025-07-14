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

import { HiMiniUsers } from "react-icons/hi2";
import { getRole } from "./UsersTable";
import { IAuditLogs } from "@/lib/interfaces/interfaces";
import { getRoleLabel } from "@/lib/utils";

export interface IAuditLogsTable {
  auditlogs?: IAuditLogs[];
  auditlog?: IAuditLogs;
  role_name?: string;
}

export function AuditlogsTable({ auditlogs, role_name }: IAuditLogsTable) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Staff</TableHead>
          {role_name === "admin" ? (
            <TableHead>Organisation</TableHead>
          ) : (
            <TableHead>Role</TableHead>
          )}
          <TableHead>Event</TableHead>

          <TableHead className="">Date and Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {auditlogs?.map((auditlog, index) => (
          <TableRow
            key={index}
            className="h-[50px] odd:bg-[#F7F9FD] even:bg-[#FBFDFF]"
          >
            <TableCell className="font-medium flex items-center gap-1">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <HiMiniUsers />
              </span>

              {auditlog.created_by}
            </TableCell>

            <TableCell>
              {role_name === "admin" ? (
                <span>{auditlog.organization.organization_name}</span>
              ) : (
                <>
                  <Badge
                    variant={"outline"}
                    className={`border rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
                  >
                    <div
                      className={`${getRole(auditlog.role)} h-2 w-2 rounded-full`}
                    ></div>
                    {getRoleLabel(auditlog.role)}
                  </Badge>
                </>
              )}{" "}
            </TableCell>
            <TableCell>{auditlog.event}</TableCell>

            <TableCell>{auditlog.created_at}</TableCell>
            <TableCell>
              <ActionsPopover />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
