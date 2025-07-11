
import useSWR from "swr";
import { auditService } from "./FetchAllAuditLogs";
import { useState } from "react";


export function useGetOrganizationLogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: organizationAuditLogs, error: organizationAuditLogsError, isLoading: auditLogsLoading } = useSWR("organization-audit-logs", () => auditService.fetchOrganizationAuditLogs(), {
    // Optional: Add SWR configuration
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
  const AuditLogsPerPage = 8;
  const clientLogs = organizationAuditLogs ? organizationAuditLogs : [];
  const totalPages = Math.ceil(clientLogs.length / AuditLogsPerPage);
  const currentAuditLogs = clientLogs?.slice(
    (currentPage - 1) * AuditLogsPerPage,
    currentPage * AuditLogsPerPage
  );


  const admin = clientLogs?.filter(
    (auditlog) => auditlog.role === "client_admin"
  );
  const employee = clientLogs?.filter(
    (auditlog) => auditlog.role === "client_employee"
  );
  const system = clientLogs?.filter((auditlog) => auditlog.role === "System");
  return {
    clientLogs,
    organizationAuditLogsError,
    auditLogsLoading,
    totalPages,
    currentAuditLogs,
    currentPage,
    setCurrentPage,
    admin,
    employee,
    system
  }
}

