import { useEffect, useState } from "react";

import { IClient } from "../interfaces/interfaces";
import { FetchClient } from "../api-routes";

export function useGetClient(clientID:number) {
  const [Client, setClient] = useState<IClient>();



  useEffect(() => {
    const fetchclient = async () => {
      try {
        const response = await fetch(FetchClient(clientID));

        if (response.ok) {
          const data = await response.json();

          setClient(data);
        } else {
        }
      } catch (error) {}
    };

    fetchclient();
  }, [clientID]);

  return Client;
}
