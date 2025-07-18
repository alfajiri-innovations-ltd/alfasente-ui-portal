import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMembers } from "@/lib/interfaces/interfaces";
import { HiMiniUsers } from "react-icons/hi2";

export interface IMembersTable {
  members?: IMembers[];
  member?: IMembers;
}

export const getRandomColor = () => {
  const colors = ["#E59339", "#7F1F26", "#0088E8", "#3DA755"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function PreviewMembersTable({ members }: IMembersTable) {
  return (
    <div className="rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Amount (UGX)</TableHead>
            <TableHead className="">Reason</TableHead>
            <TableHead className="">Service Provider</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member, index) => (
            <TableRow
              key={index}
              className="h-[50px]  odd:bg-[#F7F9FD] border-b-0  even:bg-[#FBFDFF]"
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

              <TableCell className="">{member.amount}</TableCell>

              <TableCell>{member.reason}</TableCell>

              <TableCell>{member.serviceProvider}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
