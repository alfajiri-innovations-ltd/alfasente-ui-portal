// import { useEffect, useState } from "react";

// import { IAuditLogs } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { GetAllAuditLogs, GetAuditLogsByOrganization } from "../api-routes";
import { IAuditLogs } from "../interfaces/interfaces";

export const auditService = {
  token: getUserToken(),
  clientID: getAuthUser()?.clientID,
  fetchAuditLogs: async function () {
    const response = await fetch(GetAllAuditLogs(), {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.AuditLogs;
    }
  },
  fetchOrganizationAuditLogs: async function (): Promise<IAuditLogs[]> {
    const response = await fetch(
      GetAuditLogsByOrganization(this.clientID ?? 0),
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (response.ok === false) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data.AuditLogs;
  },
};
