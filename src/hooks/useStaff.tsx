"use client";
import { userService } from "@/lib/services/GetUsersByOrganization";
import React from "react";
import useSWR from "swr";

export default function useStaff() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: staffLists, isLoading: staffLoading } = useSWR(
    "staff-data",
    () => userService.fetchUsers(),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );
  const staffData = staffLists ? staffLists : [];

  const UsersPerPage = 8;

  const totalPages = Math.ceil(staffData.length / UsersPerPage);
  const currentUsers = staffData.slice(
    (currentPage - 1) * UsersPerPage,
    currentPage * UsersPerPage,
  );

  const active = staffData.filter((user) => user.status === "maker");
  const inactive = staffData.filter((user) => user.status === "checker");
  const admin = staffData.filter(
    (user) => user.role_name.roleName === "client_admin",
  );
  const employee = staffData.filter(
    (user) => user.role_name.roleName === "client_employee",
  );

  return {
    staffData,
    active,
    inactive,
    admin,
    employee,
    setCurrentPage,
    currentPage,
    UsersPerPage,
    totalPages,
    currentUsers,
    staffLoading,
  };
}
