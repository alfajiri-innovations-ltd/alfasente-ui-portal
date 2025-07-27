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
import { IUsers } from "@/lib/interfaces/interfaces";
import { formatDate } from "@/lib/Utilities/FormatDate";

export interface IUsersTableProps {
  users?: IUsers[];
  user?: IUsers;
}
export function getStatusBadge(status: IUsers["status"]) {
  switch (status) {
    case "maker":
      return "bg-[#FFEAE9] text-[#A9302D] border-[#FFD9D7]";

    case "checker":
      return "bg-[#308E9] text-[#308242] border-[#C5E9CD]";

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

              {`${user.firstName} ${user.lastName}`}
            </TableCell>{" "}
            <TableCell>{user.user_email}</TableCell>
            <TableCell>
              <Badge
                className={`border capitalize rounded-full py-1 px-1.5 text-[14px] ${getStatusBadge(user.status || "checker")}`}
              >
                {user.status || "checker"}
              </Badge>
            </TableCell>
            <TableCell>
              {" "}
              <Badge
                variant={"outline"}
                className={`border rounded-full py-1 px-2 gap-1 text-[14px] flex items-center w-min`}
              >
                <div
                  className={`${getRole(user.role_name.roleName)} h-2 w-2 rounded-full`}
                ></div>
                {user.role_name.roleName === "client_admin"
                  ? "Admin"
                  : "Employee"}
              </Badge>
            </TableCell>
            <TableCell>
              {user.createdAt ? formatDate(user.createdAt) : user.date_of_birth}
            </TableCell>
            <TableCell>
              <ActionsPopover />{" "}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
