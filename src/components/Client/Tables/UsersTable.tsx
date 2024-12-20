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
import { FaRegUser } from "react-icons/fa";

export interface IUsers {
  user_name: string;
  email: string;
  role: string;
  createdAt: string;
  status?: string;
}

export interface IUsersTableProps {
  users?: IUsers[];
  user?: IUsers;
}
export function getStatusBadge(status: IUsers["status"]) {
  switch (status) {
    case "Active":
      return "bg-[#FFEAE9] text-[#A9302D] border-[#FFD9D7]";

    case "Inactive":
      return "bg-[#ECF8EF] text-[#308242] border-[#C5E9CD]";

    default:
      return "bg-red-100 text-red-500";
  }
}

export function getRole(status: string) {
  switch (status) {
    case "client_admin":
      return "bg-[#308242] ";

    case "client_employee":
      return "bg-[#D9882B]  ";

    default:
      return "bg-[#FFEAE9]";
  }
}
export function UsersTable({ users }: IUsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="">Date Added</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              <span className="rounded-full bg-[#E4E8F1] flex justify-center items-center p-1.5">
                <FaRegUser />
              </span>

              {user.user_name}
            </TableCell>{" "}
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                className={`border rounded-full py-1 px-1.5 text-[14px] ${getStatusBadge(user.status)}`}
              >
                {user.status}{" "}
              </Badge>
            </TableCell>
            <TableCell>
              {" "}
              <Badge
                variant={"outline"}
                className={`border rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
              >
                <div
                  className={`${getRole(user.role)} h-2 w-2 rounded-full`}
                ></div>
                {user.role === "client_admin" ? "Admin" : "Employee"}
              </Badge>
            </TableCell>
            <TableCell>{user.createdAt}</TableCell>
            <TableCell>
              <ActionsPopover />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
