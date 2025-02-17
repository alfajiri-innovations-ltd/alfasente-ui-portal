import { useEffect, useState } from "react";

import { IClient } from "../interfaces/interfaces";
import {  getUserToken } from "../cookies/UserMangementCookie";
import { FetchAllOrganizations } from "../api-routes";


export function GetClients() {
  const [Clients, setClients] = useState<IClient[]>([]);
  const token = getUserToken();


  useEffect(() => {
    const fetchclients = async () => {
      try {
        const response = await fetch(FetchAllOrganizations(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

       
          setClients(data.clients);
        } else {
        }
      } catch (error) {}
    };

    fetchclients();
  }, []);

  return Clients;
}
