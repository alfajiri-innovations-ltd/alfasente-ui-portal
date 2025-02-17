import {
  ClipboardListIcon,
  SettingsIcon,
  LayoutDashboard,
  CircleUserRound,
} from "lucide-react";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { SlEnvolope } from "react-icons/sl";
import { PiBuildingOfficeLight } from "react-icons/pi";

import { Link } from "react-router-dom";
import { useUser } from "@/hooks/UserContext";
import { GetClient } from "@/lib/services/GetClientById";

function SideBar() {
  const currentPath = window.location.pathname;
  const user = useUser();

  const client = GetClient();
  console.log(client);

  const userRole = user?.role_name || "admin";
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard />,
      href: "/dashboard",
      roles: ["admin", "client_employee", "client_admin"],
    },

    {
      title: "Applications",
      icon: <SlEnvolope className="w-6 h-6" />,
      href: "/applications",
      roles: ["admin"],
    },
    {
      title: "Organisations",
      icon: <PiBuildingOfficeLight className="w-6 h-6" />,
      href: "/organisations",
      roles: ["admin"],
    },
    {
      title: "Beneficiaries",
      icon: <CircleUserRound />,
      href: "/beneficiaries",
      roles: ["admin", "client_employee", "client_admin"],
    },
    {
      title: "Staff",
      icon: <PiUsersThreeFill className="w-6 h-6" />,
      href: "/staff",
      roles: ["client_employee", "client_admin"],
    },
    {
      title: "Transactions",
      icon: <FaMoneyBillTransfer className="w-6 h-6" />,
      href: "/transactions",
      roles: ["admin", "client_employee", "client_admin"],
    },
    {
      title: "Teams",
      icon: <PiUsersThreeFill className="w-6 h-6" />,
      href: "/teams",
      roles: ["admin"],
    },
    {
      title: "Audit Logs",
      icon: <ClipboardListIcon />,
      href: "/audit-logs",
      roles: ["admin", "client_employee", "client_admin"],
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      href: "/settings",
      roles: ["admin", "client_employee", "client_admin"],
    },
  ];
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <aside className=" h-full bg-gray-100 p-4">
      <Link to="/">
        <div>
          <img
            src="/images/logos/alfasente-logo.svg"
            alt="Alfasente"
            width={150}
          />
        </div>
      </Link>
      {user?.role_name !== "admin" && (
        <div className="flex border items-center px-2 py-1 rounded-[5px] gap-3">
          <img src="/images/icons/enterprise.svg" alt="Alfasente" width={25} />
          <div className="flex flex-col">
            <span className="font-bold text-base">{client?.clientName}</span>
            <span className="text-[12px] font-normal">10 staff</span>
          </div>
        </div>
      )}
      <ul className="space-y-2 my-5">
        {filteredItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className={`flex items-center p-2 rounded ${
                currentPath === item.href
                  ? "bg-gray-300 text-black"
                  : "text-[#5C6474] "
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
