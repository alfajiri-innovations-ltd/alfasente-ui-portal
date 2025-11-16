import { useEffect, useState } from "react";

import { IAuditLogs } from "../interfaces/interfaces";

import { getUserToken } from "../cookies/UserMangementCookie";

import { GetAuditLogById } from "../api-routes";

export function useFetchAuditLog(id: number) {
  const [AuditLog, setAuditLog] = useState<IAuditLogs>();
  const token = getUserToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchtransaction = async () => {
      try {
        setLoading(true);
        const response = await fetch(GetAuditLogById(id),{
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });

        if (response.ok) {
          const data = await response.json();

          setAuditLog(data.auditlog);
        } else {
        }
      } catch (error) {
        setError("An error occurred");
      }

      finally{
        setLoading(false);
      }
    };

    fetchtransaction();
  }, []);

  return { AuditLog, loading, error };
}
