import { useEffect, useState } from "react";

import {  getUserToken } from "../cookies/UserMangementCookie";
import { CheckListName } from "../api-routes";

interface ListName {
  listName: string;
  clientId: number;
}

interface Data {
  isTaken: boolean;
}
export function useFetchListName(input: ListName | null) {
  const token = getUserToken();
const [data, setData] = useState<Data>({ isTaken: true });

  useEffect(() => {
    if (!input) return;

    const { listName, clientId } = input;
    const fetchListName = async () => {
      try {
        const response = await fetch(CheckListName(listName, clientId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          console.log("----->",data);

          setData(data);
        } else {
        }
      } catch (error) {}
    };

    fetchListName();
  }, [input?.listName]);

  return data;
}
