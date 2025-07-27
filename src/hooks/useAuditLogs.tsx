import { auditService } from "@/lib/services/FetchAllAuditLogs";
import useSWR from "swr";
export default function useAuditLogs() {
  const {
    data: auditLogs,
    error: auditLogsError,
    isLoading: auditLogsLoading,
  } = useSWR("audio-logs", auditService.fetchAuditLogs);

  return {
    auditLogs,
    auditLogsError,
    auditLogsLoading,
  };
}
