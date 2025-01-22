import { useEffect, useState } from "react";

import { IList } from "../interfaces/interfaces";
import { getAuthUser, getUserToken } from "../cookies/UserMangementCookie";
import { FetchClientLists } from "../api-routes";

export function GetLists() {
  const [Lists, setLists] = useState<IList[]>([]);
  const token = getUserToken();
  const clientId = getAuthUser().clientID;

  useEffect(() => {
    const fetchlists = async () => {
      try {
        const response = await fetch(FetchClientLists(clientId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
        }
      } catch (error) {}
    };

    fetchlists();
  }, []);

  return Lists;
}
