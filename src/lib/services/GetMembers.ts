import { useEffect, useState } from "react";

import { IMembers } from "../interfaces/interfaces";

import { getUserToken } from "../cookies/UserMangementCookie";
import { GetMembersByListId } from "../api-routes";

export function useGetMembers(listId: number) {
  const [members, setmembers] = useState<IMembers[]>([]);
  const token = getUserToken();

  useEffect(() => {
    const fetchmembers = async () => {
      try {
        const response = await fetch(
          `${GetMembersByListId(listId)}`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setmembers(data);
          console.log(data);
        } else {
        }
      } catch (error) {}
    };

    fetchmembers();
  }, []);

  return members;
}
