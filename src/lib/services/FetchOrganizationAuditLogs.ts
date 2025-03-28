import { useEffect, useState } from "react";

import { IAuditLogs } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import {  GetAuditLogsByOrganization } from "../api-routes";

export function GetOrganizationLogs() {
  const [AuditLogs, setAuditLogs] = useState<IAuditLogs[]>([]);
  const token = getUserToken();
  const clientID = getAuthUser().clientID;

  useEffect(() => {
    const fetchlogs = async () => {
      try {
        const response = await fetch(GetAuditLogsByOrganization(clientID), {
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
