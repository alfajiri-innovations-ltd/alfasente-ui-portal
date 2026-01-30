"use client";
import {
  ClipboardListIcon,
  SettingsIcon,
  LayoutDashboard,
  CircleUserRound,
  Wallet,
  Headset,
} from "lucide-react";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";

import { Link } from "react-router-dom";
import { useUser } from "@/hooks/UserContext";
import { GetClient } from "@/lib/services/GetClientById";
import { useIsMobile } from "@/hooks/useIsMobile";
import useStaff from "@/hooks/useStaff";
// import { GetUsers } from "@/lib/services/GetUsersByOrganization";

function SideBar() {
  const currentPath = window.location.pathname;
  const user = useUser();
  const { staffData } = useStaff();
  const users = staffData;
  const isMobile = useIsMobile();
  const client = GetClient();

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: (
        <LayoutDashboard
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/dashboard" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/dashboard",
      roles: ["client_employee", "client_admin"],
    },
    {
      title: "Fund Wallet",
      icon: (
        <Wallet
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/fundwallet" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/fundwallet",
      roles: ["client_employee", "client_admin"],
    },

    {
      title: "Send Funds",
      icon: (
        <GrSend
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/send-funds" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/send-funds",
      roles: ["client_employee", "client_admin"],
    },

    {
      title: "Beneficiaries",
      icon: (
        <CircleUserRound
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/beneficiaries" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/beneficiaries",
      roles: ["client_employee", "client_admin"],
    },
    {
      title: "Staff",
      icon: (
        <PiUsersThreeFill
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/staff" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/staff",
      roles: ["client_employee", "client_admin"],
    },

    {
      title: "Transactions",
      icon: (
        <FaMoneyBillTransfer
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/transactions" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/transactions",
      roles: ["client_employee", "client_admin"],
    },

    {
      title: "Audit Logs",
      icon: (
        <ClipboardListIcon
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/audit-logs" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/audit-logs",
      roles: ["admin", "client_employee", "client_admin"],
    },

    {
      title: "Customer Support",
      icon: (
        <Headset
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/customer-support" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/customer-support",
      roles: ["admin", "client_employee", "client_admin"],
    },
    {
      title: "Settings",
      icon: (
        <SettingsIcon
          className={` flex items-center p-2 rounded  w-8 h-8 ${
            currentPath === "/settings" ? "text-[#8D35AA]" : ""
          }`}
        />
      ),
      href: "/settings",
      roles: ["admin", "client_employee", "client_admin"],
    },
  ];

  return (
    <aside
      className={`${isMobile ? "sm:w-2/4" : "sm:w-1/4"} h-screen bg-[#F7F9FD] border border-[#DCE1EC] p-4`}
    >
      <Link to="/">
        <div>
          <img
            src="/images/logos/alfasente-logo.svg"
            alt="Alfasente"
            width={150}
          />
        </div>
      </Link>
      {user?.role_name === "client_admin" ? (
        <div className="flex border items-center px-2 py-1 rounded-[5px] gap-3">
          <img src="/images/icons/enterprise.svg" alt="Alfasente" width={25} />
          <div className="flex flex-col">
            <span className="font-bold text-base">{client?.clientName}</span>
            <span className="text-[12px] font-normal">
              {users.length} staff
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      <ul className="space-y-2 my-5">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.href}
              className={`flex items-center p-2 rounded ${
                currentPath === item.href
                  ? "bg-[#E4E8F1] text-black"
                  : "text-[#5C6474] "
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
