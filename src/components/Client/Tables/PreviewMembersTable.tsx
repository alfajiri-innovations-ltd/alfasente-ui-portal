import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMembers } from "@/lib/interfaces/interfaces";
import { FetchUserDetails } from "@/lib/services/FetchUserName";
import { HiMiniUsers } from "react-icons/hi2";
import { useEffect, useState } from "react";

export interface IMembersTable {
  members?: IMembers[];
}

export const getRandomColor = () => {
  const colors = ["#E59339", "#7F1F26", "#0088E8", "#3DA755"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function PreviewMembersTable({ members }: IMembersTable) {
  const [registeredNames, setRegisteredNames] = useState<
    Record<string, string>
  >({});

  console.log(members);

  useEffect(() => {
    if (!members) return;

    const fetchNames = async () => {
      const results: Record<string, string> = {};

      for (const member of members) {
        try {
          const res: any = await FetchUserDetails(
            `0${member.mobileMoneyNumber}`
          );

          console.log(res);
          results[member.mobileMoneyNumber] = res?.first_name
            ? `${res.first_name} ${res.last_name}`
            : "N/A";
        } catch (error) {
          console.error(
            `Failed to fetch details for ${member.mobileMoneyNumber}`,
            error
          );
          results[member.mobileMoneyNumber] = "N/A";
        }
      }

      setRegisteredNames(results);
    };

    fetchNames();
  }, [members]);
  console.log(registeredNames);

  return (
    <div className="rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Amount (UGX)</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Registered Beneficiary Name</TableHead>
            <TableHead>Service Provider</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members?.map((member, index) => (
            <TableRow
              key={index}
              className="h-[50px] odd:bg-[#F7F9FD] even:bg-[#FBFDFF]"
            >
              <TableCell className="font-medium flex items-center gap-1">
                <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                  <HiMiniUsers style={{ fill: getRandomColor() }} />
                </span>
                {member.beneficiaryName}
              </TableCell>

              <TableCell>{member.mobileMoneyNumber}</TableCell>
              <TableCell>{member.amount}</TableCell>
              <TableCell>{member.reason}</TableCell>

              <TableCell>
                {registeredNames[member.mobileMoneyNumber] || "Loading..."}
              </TableCell>

              <TableCell>{member.serviceProvider}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
