import { useEffect, useState } from "react";

import { IClient } from "../interfaces/interfaces";
import { getAuthUser } from "../cookies/UserMangementCookie";
import { FetchClient } from "../api-routes";

export function GetClient() {
  const [Client, setClient] = useState<IClient>();

  const clientId = getAuthUser().clientID;

  useEffect(() => {
    const fetchclient = async () => {
      try {
        const response = await fetch(FetchClient(clientId), {});

        if (response.ok) {
          const data = await response.json();
          setClient(data);
        } else {
        }
      } catch (error) {}
    };

    fetchclient();
  }, []);

  return Client;
}
