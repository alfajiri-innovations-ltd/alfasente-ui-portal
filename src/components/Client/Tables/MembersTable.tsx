import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HiMiniUsers } from "react-icons/hi2";

import { EditBeneficiary } from "../EditBeneficiary";
import { DeleteBeneficiary } from "../DeleteBeneficiary";
import { useLocation } from "react-router-dom";
import { formatMoney } from "@/lib/utils";

export interface IMembers {
  beneficiaryName: string;
  mobileMoneyNumber: string;
  amount: number;
  reason: string;
  beneficiaryId?: number;
}

export interface IMembersTable {
  members?: IMembers[];
  member?: IMembers;
}

export const getRandomColor = () => {
  const colors = ["#E59339", "#7F1F26", "#0088E8", "#3DA755"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function MembersTable({ members }: IMembersTable) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Mobile Number</TableHead>
          <TableHead>Amount (UGX)</TableHead>
          <TableHead className="">Reason</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members?.map((member, index) => (
          <TableRow
            key={index}
            className="h-[50px] odd:bg-[#F7F9FD] border-b-0  even:bg-[#FBFDFF]"
          >
            <TableCell className="font-medium flex items-center gap-1">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <HiMiniUsers
                  style={{
                    fill: getRandomColor(),
                  }}
                />
              </span>

              {member.beneficiaryName}
            </TableCell>
            <TableCell>{member.mobileMoneyNumber}</TableCell>

            <TableCell className="">{formatMoney(member.amount)}</TableCell>

            <TableCell>{member.reason}</TableCell>
            {pathname !== "/dashboard" && (
              <TableCell>
                <div className="flex items-center gap-3">
                  <EditBeneficiary member={member} />
                  {member.beneficiaryId !== undefined && (
                    <DeleteBeneficiary beneficiaryId={member.beneficiaryId} />
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
