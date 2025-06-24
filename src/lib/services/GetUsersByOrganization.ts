import { useEffect, useState } from "react";

import { IUsers } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import {  GetUsersByClientId } from "../api-routes";

export function GetUsers() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const clientId = getAuthUser().clientID;
  const token = getUserToken();

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await fetch(
          GetUsersByClientId(clientId),

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
         
        } else {
        }
      } catch (error) {}
    };

    fetchusers();
  }, []);

  return users;
}
