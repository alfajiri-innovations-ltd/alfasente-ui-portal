import { useEffect, useState } from "react";

import { IAuditLogs } from "../interfaces/interfaces";
import { getUserToken } from "../cookies/UserMangementCookie";
import {  GetAllAuditLogs } from "../api-routes";

export function useGetAllLogs() {
  const [AuditLogs, setAuditLogs] = useState<IAuditLogs[]>([]);
  const token = getUserToken();

  useEffect(() => {
    const fetchlogs = async () => {
      try {
        const response = await fetch(GetAllAuditLogs(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);

          setAuditLogs(data.AuditLogs);
        } else {
        }
      } catch (error) {}
    };

    fetchlogs();
  }, []);

  return AuditLogs;
}
