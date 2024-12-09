import {
  Table,
  TableBody,

  TableCell,
  
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

const lists = [
  {
    name: "Staff",
    members: 46,
    createdBy: "Grace Kizza",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Interns",
    members: 150,
    createdBy: "Mutebire Arnold",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Security",
    members: 45,
    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Contractors",
    members: 10,
    createdBy: "Luswaata Vicent",
    createdAt: "Sat 30 January 2006",
  },
  {
    name: "Drivers",
    members: 20,
    createdBy: "Alex Mutebi",
    createdAt: "Sat 30 January 2006",
  },
];

export function BeneficiariesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead className="">Date Ceated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lists.map((list, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{list.name}</TableCell>
            <TableCell>{list.members}</TableCell>
            <TableCell className="">{list.createdBy}</TableCell>

            <TableCell>{list.createdAt}</TableCell>
            <TableCell>
              <MoreHorizontal />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
